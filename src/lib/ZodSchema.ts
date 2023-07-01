import { z } from 'zod';
import type { TranslationFunctions } from "./i18n/i18n-types";
import { LL } from '$lib/i18n/i18n-svelte';

const LoginSchema =  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100)
});

const LoginSchemaLL = LoginSchema;
export default LoginSchema;
