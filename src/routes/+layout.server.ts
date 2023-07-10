import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();
  if (!user) {
    return {
      locale: locals.locale,
      user: null
    }
  }
  return {
    locale: locals.locale,
    user
  };
};// @ts-ignore
