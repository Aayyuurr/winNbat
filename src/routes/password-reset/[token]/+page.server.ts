import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, Actions } from './$types';
import {ResetPasswordTokenSchema} from "$lib/ZodSchema";
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { passwordResetToken } from "$lib/server/lucia";
export const load = (async (event) => {

  // Server API:
  const form = await superValidate(ResetPasswordTokenSchema);
  // Always return { form } in load and form actions.

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    const form = await superValidate(request, ResetPasswordTokenSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const token = await passwordResetToken.validate(params.token ?? '');
      let user = await auth.getUser(token.userId);
      if (!user.verified_email) {
        user = await auth.updateUserAttributes(user.userId, {
          verified_email: true
        });
      }
      await auth.invalidateAllUserSessions(user.userId);
      await auth.updateKeyPassword('email', user.email, form.data.password);
      const session = await auth.createSession(user.userId);
      locals.auth.setSession(session);
    } catch (e) {
      console.log(e);
      return fail(400, {
        message: 'An unknown error occurred',
        form
      });
    }
    throw redirect(302, '/');
	  }
}

