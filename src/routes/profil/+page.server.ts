import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

import { auth, emailVerificationToken } from '$lib/server/lucia';
import { prisma } from '$lib/server/PrismaClient';
import { get } from 'svelte/store';
import { LL } from '$lib/i18n/i18n-svelte';
import { z } from 'zod';
import { sendVerificationEmail } from '$lib/email';

export const load = (async (event) => {
	const ll = get(LL);
	const { user } = await event.locals.auth.validateUser();
	const moreInfoUser = await prisma.moreInfo.findUnique({
		where: {
			id: user.userId,
		},
	});
	return { moreInfoUser: moreInfoUser };
}) satisfies PageServerLoad;

export const actions = {
	ChangeEmail: async ({ request, locals }) => {
		let ll = get(LL);
		const ChangeEmailSchema = z.object({
			email: z.string.email(),
		});
		const ChangeEmailForm = await superValidate(request, ChangeEmailSchema);
		if (!ChangeEmailForm.valid) {
			return fail(400, ChangeEmailForm);
		}
		const { user } = await locals.auth.validateUser();

		// todo add handler
		const change = await auth.updateUserAttributes(user.userId,{
			verified_email:false,
			email: ChangeEmailForm.data.email;
		});
		await auth.invalidateAllUserSessions(user.userId);
		const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);
		const token = await emailVerificationToken.issue(user.userId);
		await sendVerificationEmail(user.email, token.toString());
		// todo add catch error
	},
	ChangeMdp: async (event) => {
		let ll = get(LL);
		const ChangeMdpSchema = z
			.object({
				oldPassword: z.string.min(8).max(100),
				password: z.string.min(8).max(100),
				confirmPassword: z.string.min(8).max(100),
			})
			.refine((data) => data.password === data.confirm_password, {
				// todo: replace with ll
				message: 'Passwords do not match',
			});
		// todo add handler
	},
	SetPhone: async (event) => {
		let ll = get(LL);
		const SetPhoneSchema = z.object({
			//todo: add regex
			phone: z.string().regex(),
		});
	},
	SetLocation: async (event) {
		let ll = get(LL);
		const SetLocationSchema = z.object({
			//todo: add regex
			phone: z.string().regex(),
		});
		
	}
} satisfies Actions;
