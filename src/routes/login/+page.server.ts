import type { PageServerLoad, Actions } from './$types';
import LoginSchema from '$lib/ZodSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { LL } from '$lib/i18n/i18n-svelte';

// @ts-ignore
export const load = async (event) => {
	const form = await superValidate(event, newContactSchema)
	return {
		form
	}
};

export const actions = {
	login: async ({ request }) => {
		const form = await superValidate(request, LoginSchema );

		return { form }

	}
} satisfies Actions;
