import type { PageServerLoad } from './$types';

export const load = (async () => {
	let form = {
		email: '',
		password: ''
	};
	return { form };
}) satisfies PageServerLoad;
