import createNextIntlPlugin from 'next-intl/plugin';

const withIntl = createNextIntlPlugin('./src/config/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,

    async headers() {
        return [
            {
                source: '/(.*)?',
                headers: [
                    {
                        value: '*',
                        key: 'Access-Control-Allow-Origin',
                    },
                    {
                        value: 'GET,HEAD',
                        key: 'Access-Control-Allow-Methods',
                    },
                ],
            },
        ];
    },
};

export default withIntl(nextConfig);
