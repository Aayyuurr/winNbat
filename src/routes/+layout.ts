import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';

// @ts-ignore
export const load = async (event) => {
  const { locale } = event.data;
  await loadLocaleAsync(locale);

  return event.data;
};
