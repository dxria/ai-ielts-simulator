import { type Metadata } from 'next';
import { NamespaceKeys } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export { getTranslations };

export const metadata = (namespace: NamespaceKeys<IntlMessages, keyof IntlMessages>) => {
    return async ({ params }: PageProps): Promise<Metadata> => {
        const { locale } = await params;
        const t = await getTranslations({ locale, namespace });

        return {
            title: t('meta-title'),
            description: t('meta-description'),
            icons: [
                {
                    rel: 'icon',
                    url: '/logo.svg',
                    type: 'image/x-icon',
                },
            ],
        };
    };
};
