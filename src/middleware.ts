import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse, userAgent } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

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

const PUBLIC_FILE = /\.([^.]+)$/;

const isProtectedRoute = createRouteMatcher([
    '/:locale/dashboard(.*)',
    '/:locale/assignment(.*)',
    '/api(.*)',
]);

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();

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

    res.headers.set('x-viewport', viewport);

    return res;
});
