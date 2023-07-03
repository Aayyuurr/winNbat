import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';
import { auth } from '$lib/server/lucia';
import { ResetPasswordSchema } from '$lib/ZodSchema';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/PrismaClient';
import { passwordResetToken } from "$lib/server/lucia";
import { sendPasswordResetEmail } from "$lib/email";


export const load = (async (event) => {

  // Server API:
  const form = await superValidate(ResetPasswordSchema);
  // Always return { form } in load and form actions.

  return { form };
}) satisfies PageServerLoad;


export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, ResetPasswordSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const DataBaseUser = await prisma.authUser.findFirst({
        where: {
          email: form.data.email
        }
      });
      if (!DataBaseUser) {
        return fail(400, { message:"Email does not existe",form });
      }
      const user= await auth.transformDatabaseUser(DataBaseUser);
      const token = await passwordResetToken.issue(user.userId);
      await sendPasswordResetEmail(user.email,token.toString());
      return {
        success: true,
        form
      };
    }catch (e){
      return fail(500, {
        message: 'An unknown error occurred',
        form
      });
    }

} }satisfies Actions;

