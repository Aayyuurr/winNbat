import { auth, facebookProvider } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from "./$types";

/*
* todo:
*  fix if statement line 18
* try to get email if cant than change database
* */
export const GET: RequestHandler = async ({ cookies, url, locals }) => {

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies.get('oauth_state');
  console.log(code);
  console.log(state);
  console.log(storedState);
  if (!storedState || storedState !== state || !code || !state){
    return new Response(null, { status: 401 });
  }
  try {
    const { existingUser, providerUser, createUser, createPersistentKey } = await facebookProvider.validateCallback(code);
    console.log('exesting user',existingUser);
    console.log("provider user",providerUser);
    const getUser = async () => {
      if (existingUser) return existingUser;

      return await createUser({
        username: providerUser.name,
        email: providerUser.email,
        verified_email: providerUser.email_verified,
        logo: providerUser.picture,
      });
    }
    const user = await getUser();
    const session = await auth.createSession(user.userId);
    locals.auth.setSession(session);
  } catch (e) {
    console.error(e);
    return new Response(null, {
      status: 500
    });
  }
  throw redirect(302, '/');
};
