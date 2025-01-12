import createNextIntlPlugin from 'next-intl/plugin';

const withIntl = createNextIntlPlugin('./src/config/i18n.ts');

// const CMS_API_URL = process.env.CMS_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,

    // rewrites() {
    //     return [
    //         // {
    //         //     source: '/api/:path*',
    //         //     destination: `${CMS_API_URL}/api/:path*`,
    //         // },
    //         // {
    //         //     source: '/uploads/:path*',
    //         //     destination: `${CMS_API_URL}/uploads/:path*`,
    //         // },
    //     ];
    // },
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
