// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import("lucia").AuthRequest;
			locale: import('$lib/i18n/i18n-types.js').Locales;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type UserAttributes = {
			username: string;
			
		};
	}
}

export {};
