import type { PageServerLoad, Actions } from './$types';
import LoginSchema from '$lib/ZodSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { LL } from '$lib/i18n/i18n-svelte';

export const load = async (event) => {
	const form = await superValidate(event, LoginSchema)
	return {
		form
	}
};

export const actions = {
	login: async (event) => {
		const form = await superValidate(event, LoginSchema );
		return { form }

	}
} satisfies Actions;
