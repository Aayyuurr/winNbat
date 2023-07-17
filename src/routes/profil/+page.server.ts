import type { PageServerLoad, Actions } from './$types';

import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';

import { auth, emailVerificationToken } from '$lib/server/lucia';
import { prisma } from '$lib/server/PrismaClient';
import { get } from 'svelte/store';
import { LL } from '$lib/i18n/i18n-svelte';
import { z } from 'zod';
import { sendVerificationEmail } from '$lib/email';
import { Prisma } from '@prisma/client';

export const load = (async (event) => {
	const ll = get(LL);
	const { user } = await event.locals.auth.validateUser();
	let moreInfoUser = await prisma.moreInfo.findUnique({
		where: {
			id: user.userId,
		},
	});
	if (!moreInfoUser) {
		moreInfoUser = await prisma.moreInfo.create({
			data: {
				id: user.userId,
			},
		});
	}

	const ChangeEmailSchema = z.object({
		email: z.string().email(ll.IsNotValidEmail()),
	});
	const ChangeEmailForm = await superValidate(ChangeEmailSchema);
	const ChangeMdpSchema = z
		.object({
			oldPassword: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
			password: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
			confirmPassword: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: ll.registerSchema.PasswordsDoNotMatch(),
			path: ['confirmPassword'],
		});
	const ChangeMdpForm = await superValidate(ChangeMdpSchema);

	const SetPhoneSchema = z.object({
		phone: z
			.string()
			.trim()
			.regex(new RegExp(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/), ll.IsNotValidPhone()),
	});
	const SetPhoneForm = await superValidate(SetPhoneSchema);

	const SetLocationSchema = z.object({
		wilaya: z.string().trim().min(2).max(100),
		commune: z.string().trim().min(2).max(100),
	});
	const SetLocationForm = await superValidate(SetLocationSchema);

	const ChangeLangueSchema = z.object({
		langue: z.enum(['ar', 'en', 'fr', 'computer']),
	});
	const ChangeLangueForm = await superValidate(ChangeLangueSchema);

	const ChangeUsernameSchema = z.object({
		username: z
			.string()
			.min(3, ll.registerSchema.usernameIshort())
			.max(100, ll.registerSchema.usernameTooLong())
			.default(user.username),
	});
	const ChangeUsernameForm = await superValidate(ChangeUsernameSchema);

	const ChangeBirthdateSchema = z.object({
		birthdate: z
			.string()
			.min(8, ll.registerSchema.birthdateRequired())
			.max(100, ll.registerSchema.birthdateRequired()),
	});
	const ChangeBirthdateForm = await superValidate(ChangeBirthdateSchema);
	let algeria_cities;
	const locale = event.locals;

	if (locale.toString() === 'ar') {
		algeria_cities = await import('$lib/algeria_cities_ar.json');
	} else {
		algeria_cities = await import('$lib/algeria_cities.json');
	}
	const algeria = algeria_cities.default.map(({ wilaya_name, commune_name }) => ({
		wilaya_name,
		commune_name,
	}));
	// delete duplicate objects
	algeria.forEach((item) => {
		algeria.forEach((item2) => {
			if (item.wilaya_name === item2.wilaya_name && item.commune_name === item2.commune_name) {
				algeria.splice(algeria.indexOf(item2), 1);
			}
		});
	});

	return {
		algeria,
		user,
		moreInfoUser,
		ChangeEmailForm,
		ChangeUsernameForm,
		ChangeMdpForm,
		SetPhoneForm,
		SetLocationForm,
		ChangeLangueForm,
		ChangeBirthdateForm,
	};
}) satisfies PageServerLoad;

export const actions = {
	// todo: test later
	ChangeEmail: async ({ request, locals }) => {
		const ll = get(LL);
		const ChangeEmailSchema = z.object({
			email: z.string().email(ll.IsNotValidEmail()),
		});
		const ChangeEmailForm = await superValidate(request, ChangeEmailSchema);
		if (!ChangeEmailForm.valid) {
			return fail(400, { ChangeEmailForm });
		}
		const { user } = await locals.auth.validateUser();
		try {
			const change = await auth.updateUserAttributes(user.userId, {
				verified_email: false,
				email: ChangeEmailForm.data.email,
			});
			await auth.invalidateAllUserSessions(user.userId);
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
			const token = await emailVerificationToken.issue(user.userId);
			await sendVerificationEmail(user.email, token.toString());
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(ChangeEmailForm, {
					message: 'Email is already taken',
				});
			}
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
				return message(ChangeEmailForm, {
					message: 'Email is already taken',
				});
			}
			return message(ChangeEmailForm, {
				message: 'An unknown error occurred',
			});
		}
	},
	ChangeMdp: async ({ request, locals }) => {
		const ll = get(LL);
		const ChangeMdpSchema = z
			.object({
				oldPassword: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
				password: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
				confirmPassword: z.string().min(8, ll.ShortPassword()).max(100, ll.PasswordTooLong()),
			})
			.refine((data) => data.password === data.confirmPassword, {
				message: ll.registerSchema.PasswordsDoNotMatch(),
				path: ['confirmPassword'],
			});
		const ChangeMdpForm = await superValidate(request, ChangeMdpSchema);
		if (!ChangeMdpForm.valid) {
			return fail(400, { ChangeMdpForm });
		}
		try {
			const { user } = await locals.auth.validateUser();
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword('email', user.email, ChangeMdpForm.data.password);
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch (e) {
			console.log(e);
			return fail(400, {
				message: 'An unknown error occurred',
				ChangeMdpForm,
			});
		}
	},

	SetPhone: async ({ request, locals }) => {
		const ll = get(LL);
		const phoneRegx = new RegExp(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/);
		const SetPhoneSchema = z.object({
			phone: z.string().trim().regex(phoneRegx, ll.IsNotValidPhone()),
		});
		const SetPhoneForm = await superValidate(request, SetPhoneSchema);
		if (!SetPhoneForm.valid) {
			return fail(400, { SetPhoneForm });
		}
		const { user } = await locals.auth.validateUser();
		try {
			await prisma.moreInfo.update({
				where: {
					id: user.userId,
				},
				data: {
					phone_number: SetPhoneForm.data.phone,
				},
			});
			return message(SetPhoneForm, 'Phone number changed successfully');
		} catch (e) {
			console.log(e);
			return message(SetPhoneForm, 'An unknown error occurred', { status: 500 });
		}
	},
	SetLocation: async ({ request, locals }) => {
		const SetLocationSchema = z.object({
			wilaya: z.string().trim().min(2).max(100),
			commune: z.string().trim().min(2).max(100),
		});
		const SetLocationForm = await superValidate(request, SetLocationSchema);
		if (!SetLocationForm.valid) {
			return fail(400, { SetLocationForm });
		}
		const { user } = await locals.auth.validateUser();
		try {
			await prisma.moreInfo.update({
				where: {
					id: user.userId,
				},
				data: {
					wilaya: SetLocationForm.data.wilaya,
					commune: SetLocationForm.data.commune,
				},
			});
			return message(SetLocationForm, 'Location changed successfully');
		} catch (e) {
			console.log(e);
			return message(SetLocationForm, 'An unknown error occurred', { status: 500 });
		}
	},

	ChangeLangue: async ({ request, locals }) => {
		const ll = get(LL);

		const ChangeLangueSchema = z.object({
			langue: z.enum(['ar', 'en', 'fr', 'computer']),
		});

		const ChangeLangueForm = await superValidate(request, ChangeLangueSchema);
		if (!ChangeLangueForm.valid) {
			return fail(400, ChangeLangueForm);
		}
		const { user } = await locals.auth.validateUser();
		// todo: change locale language
		try {
			await prisma.moreInfo.update({
				where: {
					id: user.userId,
				},
				data: {
					langue: ChangeLangueForm.data.langue,
				},
			});
		} catch (e) {
			return fail(400, {
				message: 'An unknown error occurred',
				ChangeLangueForm,
			});
		}
	},
	ChangeUsername: async ({ request, locals }) => {
		const ll = get(LL);
		const { user } = await locals.auth.validateUser();
		const ChangeUsernameSchema = z.object({
			username: z
				.string()
				.min(3, ll.registerSchema.usernameIshort())
				.max(100, ll.registerSchema.usernameTooLong())
				.default(user.username),
		});
		const ChangeUsernameForm = await superValidate(request, ChangeUsernameSchema);
		if (!ChangeUsernameForm.valid) {
			return fail(400, { ChangeUsernameForm });
		}
		// check if username is taken
		const usernameTaken = await prisma.authUser.findUnique({
			where: {
				username: ChangeUsernameForm.data.username,
			},
		});

		if (usernameTaken) {
			return message(ChangeUsernameForm, 'username taken', {
				status: 409,
			});
		}

		try {
			await auth.updateUserAttributes(user.userId, {
				username: ChangeUsernameForm.data.username,
			});
			return message(ChangeUsernameForm, 'username changed successfully');
		} catch (e) {
			console.log(e);
			return message(ChangeUsernameForm, 'An unknown error occurred', { status: 500 });
		}
	},
	ChangeBirthdate: async ({ request, locals }) => {
		const ll = get(LL);
		const ChangeBirthdateSchema = z.object({
			birthdate: z
				.string()
				.min(8, ll.registerSchema.birthdateRequired())
				.max(100, ll.registerSchema.birthdateRequired()),
		});
		const ChangeBirthdateForm = await superValidate(request, ChangeBirthdateSchema);
		if (!ChangeBirthdateForm.valid) {
			return fail(400, ChangeBirthdateForm);
		}
		const { user } = await locals.auth.validateUser();
		try {
			await locals.auth.updateUserAttributes(user.userId, {
				birthdate: ChangeBirthdateForm.data.birthdate,
			});
		} catch (e) {
			return message(ChangeBirthdateForm, {
				message: 'An unknown error occurred',
			});
		}
	},
} satisfies Actions;
