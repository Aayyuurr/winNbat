import { sendVerificationEmail } from '$lib/email';
import { emailVerificationToken } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  if (!user) {
    throw redirect(302, '/login');
  }
  if (user.verified_email) {
    throw redirect(302, '/');
  }
  return {
    user
  };
};

export const actions: Actions = {
  default: async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (!user || user.verified_email) {
      return fail(401, {
        message: 'Unauthorized'
      });
    }
    try {
      const token = await emailVerificationToken.issue(user.userId);
      await sendVerificationEmail(user.email, token.toString());
    } catch (e) {
      console.log(e);
      return fail(500, {
        message: 'An unknown error occurred'
      });
    }}};

