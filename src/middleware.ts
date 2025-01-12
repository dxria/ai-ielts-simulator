import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse, userAgent } from 'next/server';

import { LOCALES, routing } from './config/i18n';

const intlMiddleware = createMiddleware(routing);

const getViewport = (req: NextRequest) => {
    const { device } = userAgent(req);
    return (device.type || 'desktop') as Viewport;
};

const getLocaleFromAcceptLanguage = (req: NextRequest) => {
    const acceptLanguage = req.headers.get('accept-language');
    if (acceptLanguage) {
        const languages = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0].trim());
        if (languages.includes('uk') || languages.includes('uk-UA')) {
            return 'ua';
        }
    }
    return 'en';
};

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.includes('/api-next/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return;
    }
    const viewport = getViewport(req);

    const currentLocale = req.nextUrl.pathname.split('/')[1] as string;

    if (LOCALES.includes(currentLocale as (typeof LOCALES)[number])) {
        const res = intlMiddleware(req);
        res.headers.set('x-viewport', viewport);
        return res;
    }

    const locale = getLocaleFromAcceptLanguage(req);

    const url = req.nextUrl.clone();
    if (!url.pathname.startsWith(`/${locale}`)) {
        url.pathname = `/${locale}${url.pathname}`;
        return NextResponse.redirect(url);
    }

    const res = intlMiddleware(req);

    // Set a new response header `x-viewport`
    res.headers.set('x-viewport', viewport);

    return res;
}
