import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '$lib/i18n/i18n-util.js';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';


// locale lang detector
const handleDetectLocale = (async ({ event, resolve }) => {
  const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
  const locale = detectLocale(acceptLanguageHeaderDetector);
  event.locals.locale = locale;

  return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;




// auth handler
import { auth } from "$lib/server/lucia";
const handleAuth: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  const re=await resolve(event);
  return re;
};

//export the handler
export const handle = sequence(handleDetectLocale, handleAuth);
