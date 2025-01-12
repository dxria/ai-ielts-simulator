import { defineRouting } from 'next-intl/routing';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const DEFAULT_LOCALE = 'ua' as const;
export const LOCALES = [DEFAULT_LOCALE, 'en'] as const;

export const routing = defineRouting({
    locales: LOCALES,
    localeDetection: false,
    defaultLocale: DEFAULT_LOCALE,
});

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    if (!LOCALES.includes(locale as Locale)) notFound();

    return {
        locale,
        messages: (await import(`../intl/locales/${locale}.json`)).default,
    };
});
