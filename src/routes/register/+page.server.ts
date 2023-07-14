import type { PageServerLoad, Actions } from './$types';

import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';

import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/PrismaClient';
import { Prisma } from '@prisma/client';
import { emailVerificationToken } from '$lib/server/lucia';
import { sendVerificationEmail } from '$lib/email';
import { get } from 'svelte/store';
import { LL } from '$lib/i18n/i18n-svelte';

import { z } from 'zod';
export const load = (async (event) => {
	const { user } = await event.locals.auth.validateUser();
	if (user) {
		if (!user.verified_email) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	const ll = get(LL);
	const RegisterSchema = z
		.object({
			email: z.string().email(ll.IsNotValidEmail()),
			password: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
			username: z
				.string()
				.min(3, ll.registerSchema.usernameIshort())
				.max(100, ll.registerSchema.usernameTooLong()),
			confirm_password: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
			birthdate: z
				.string()
				.min(8, ll.registerSchema.birthdateRequired())
				.max(100, ll.registerSchema.birthdateRequired()),
		})
		.refine((data) => data.password === data.confirm_password, {
			message: ll.registerSchema.PasswordsDoNotMatch(),
			path: ['confirm_password'],
		});

	// Server API:
	const form = await superValidate(RegisterSchema);
	// Always return { form } in load and form actions.

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const ll = get(LL);
		const RegisterSchema = z
			.object({
				email: z.string().email(ll.IsNotValidEmail()),
				password: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
				username: z
					.string()
					.min(3, ll.registerSchema.usernameIshort())
					.max(100, ll.registerSchema.usernameTooLong()),
				confirm_password: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
				birthdate: z
					.string()
					.min(8, ll.registerSchema.birthdateRequired())
					.max(100, ll.registerSchema.birthdateRequired()),
			})
			.refine((data) => data.password === data.confirm_password, {
				message: ll.registerSchema.PasswordsDoNotMatch(),
				path: ['confirm_password'],
			});

		const form = await superValidate(request, RegisterSchema);
		const email = form.data.email;
		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}
		// check if username or email already exists
		try {
			const isUser = await prisma.authUser.findFirst({
				where: {
					username: form.data.username,
				},
			});
			if (isUser) {
				setError(form, 'username', ll.registerSchema.usernameIsTaken());
				return { form };
			}
		} catch (error) {
			return fail(500, { form });
		}
		const date = new Date(form.data.birthdate);

		//
		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: form.data.email,
					password: form.data.password,
				},
				attributes: {
					username: form.data.username,
					birthdate: date,
					email: form.data.email,
					logo: '/ProfilePicture/default.png',
					verified_email: false,
				},
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
			const token = await emailVerificationToken.issue(user.userId);
			await sendVerificationEmail(user.email, token.toString());
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, {
					message: 'Email is already taken',
				});
			}
			// duplication error
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
				return message(form, {
					message: 'Email is already taken',
				});
			}
			return message(form, {
				message: 'An unknown error occurred',
			});
		}
	},
} satisfies Actions;
