import { z } from 'zod';
import type { TranslationFunctions } from "./i18n/i18n-types";
import { LL } from '$lib/i18n/i18n-svelte';

export  const LoginSchema =  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100)
});

export const RegisterSchema =  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    username: z.string().min(3).max(100),
    confirm_password: z.string().min(8).max(100),
    birthdate: z.string().min(8).max(100),

}).refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
});

export const ResetPasswordSchema =  z.object({
    email: z.string().email(),
});

export const ResetPasswordTokenSchema =  z.object({
    password: z.string().min(8).max(100),
    confirm_password: z.string().min(8).max(100),
}).refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
});
