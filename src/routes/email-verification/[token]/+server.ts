import { auth, emailVerificationToken } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
  const tokenParams = params.token;
  console.log(tokenParams);
  try {
    const token = await emailVerificationToken.validate(tokenParams);
    await auth.invalidateAllUserSessions(token.userId);
    await auth.updateUserAttributes(token.userId, {
      verified_email: true
    });
    const session = await auth.createSession(token.userId);
    locals.auth.setSession(session);
  } catch (e) {
    console.log(e);
    return new Response(null, {
      status: 401
    });
  }
  throw redirect(302, '/');
};
