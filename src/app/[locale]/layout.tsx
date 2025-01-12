import { headers } from 'next/headers';

import Layout from '@/components/layout';
import Providers from '@/providers';

export type RootLayoutProps = Pick<PageProps, 'params'> & {
    children: React.ReactNode;
};

export default async function LocaleLayout({ params, children }: RootLayoutProps) {
    const locale = (await params).locale;
    const headersList = await headers();
    const viewport = headersList.get('x-viewport') as Viewport;

    return (
        <html lang={locale} style={{ scrollBehavior: 'smooth' }}>
            <body>
                <Providers viewport={viewport}>
                    <Layout>{children}</Layout>
                </Providers>
            </body>
        </html>
    );
}
