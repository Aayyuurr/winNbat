// routes/api/oauth/+server.ts
import { auth, googleProvider,facebookProvider } from "$lib/server/lucia.js";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const provider = url.searchParams.get('provider');
  if (provider === 'facebook') {
    const [url, state] = await facebookProvider.getAuthorizationUrl();
    cookies.set('oauth_state', state, {
      path: '/',
      maxAge: 60 * 60
    });
    return new Response(null, {
      status: 302,
      headers: {
        location: url.toString()
      }
    });
  }else if (provider === 'google') {
    const [url, state] = await googleProvider.getAuthorizationUrl();
    cookies.set('oauth_state', state, {
      path: '/',
      maxAge: 60 * 60
    });
    return new Response(null, {
      status: 302,
      headers: {
        location: url.toString()
      }
    });
  }
  return new Response(null, {
    status: 400
  });
};
