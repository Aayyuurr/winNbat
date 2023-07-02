import type { PageServerLoad, Actions } from './$types';

import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { RegisterSchema } from '$lib/ZodSchema';
import { LuciaError } from 'lucia-auth';

import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/PrismaClient';
import { Prisma } from '@prisma/client';
export const load = (async (event) => {
	const { user } = await event.locals.auth.validateUser();
	if (user) {
		// if (!user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	// Server API:
	const form = await superValidate(RegisterSchema);
	// Always return { form } in load and form actions.

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, RegisterSchema);
		console.log(form.data);
		const email = form.data.email;
		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}
		// check if username or email already exists
		try {
			const user = await prisma.authUser.findFirst({
				where: {
					OR: [
						{
							username: form.data.username
						},
						{
							email: form.data.email
						}
					]
				}
			});
			if (user) {
				setError(form, 'username', 'email already exists');
				setError(form, 'email', 'email already exists');
				return { form };
			}
		} catch (error) {
			console.log(error);
			return fail(500, { form });
		}
		const date = new Date(form.data.birthdate);

		//
		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: form.data.email,
					password: form.data.password
				},
				attributes: {
					username: form.data.username,
					birthdate: date,
					email: form.data.email,
					logo: '/ProfilePicture/default.png',
					verified_email: false
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
			return redirect(302, '/');
		} catch (error) {
			console.log(error);
			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Email is already taken',
					form
				});
			}
			// duplication error
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
				return fail(400, {
					message: 'Email is already taken',
					email
				});
			}
			return fail(500, {
				message: 'An unknown error occurred',
				form
			});
		}
	}
} satisfies Actions;
