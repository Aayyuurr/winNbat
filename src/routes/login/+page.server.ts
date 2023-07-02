import type { PageServerLoad, Actions } from './$types';
import { LoginSchema } from '$lib/ZodSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';
import { auth } from '$lib/server/lucia';

import { fail, redirect } from '@sveltejs/kit';
import { LL } from '$lib/i18n/i18n-svelte';
export const load = (async (event) => {
	const { user } = await event.locals.auth.validateUser();
	if (user) {
		// if (!user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	// Server API:
	const form = await superValidate(LoginSchema);
	// Always return { form } in load and form actions.

	return { form };
}) satisfies PageServerLoad;


export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, LoginSchema);
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const key = await auth.useKey('email', form.data.email, form.data.password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
				return fail(400, {
					message: 'Incorrect email or password',
					form
				});
			}
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_PASSWORD') {
				return fail(400, {
					message: 'Incorrect email or password',
					form
				});
			}
			return fail(400, {
				message: 'An unknown error occurred',
				form
			});
		}
		throw redirect(302, '/');
	}
} satisfies Actions;
