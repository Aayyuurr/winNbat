import type { PageServerLoad, Actions } from './$types';
import LoginSchema from '$lib/ZodSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { LL } from '$lib/i18n/i18n-svelte';

export const load = (async () => {
	// Server API:
	const form = await superValidate(LoginSchema);

	// Always return { form } in load and form actions.
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request }) => {
		const form = await superValidate(LoginSchema, request);
		console.log('Post', form);
	}
} satisfies Actions;
