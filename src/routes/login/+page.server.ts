import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { LL } from '$lib/i18n/i18n-svelte';
import { get } from "svelte/store";
import { z } from "zod";



export const load = (async (event) => {
	const { user } = await event.locals.auth.validateUser();
	const ll=get(LL);
	const LoginSchema =  z.object({
		email: z.string().email(ll.IsNotValidEmail()),
		password: z.string().min(8,ll.ShortPassword()).max(100,ll.PasswordTooLong())
	});
	if (user) {
		if (!user.verified_email) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	// Server API:
	const form = await superValidate(LoginSchema);
	// Always return { form } in load and form actions.

	return { form };
}) satisfies PageServerLoad;


export const actions = {
	login: async ({ request, locals }) => {
		const ll=get(LL);
		const LoginSchema =  z.object({
			email: z.string().email(ll.IsNotValidEmail()),
			password: z.string().min(8,ll.ShortPassword()).max(100,ll.PasswordTooLong())
		});
		const form = await superValidate(request, LoginSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const key = await auth.useKey('email', form.data.email, form.data.password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
				return message(form, {
					message: 'Incorrect email or password',
				});
			}
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_PASSWORD') {
				return message(form, {
					message: 'Incorrect email or password',
				});
			}
			return message(form, {
				message: 'An unknown error occurred',
			});
		}
		throw redirect(302, '/');
	}
} satisfies Actions;
