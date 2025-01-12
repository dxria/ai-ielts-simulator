import type { Metadata } from 'next';
import type { NamespaceKeys } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export { getTranslations };

export const metadata = (namespace: NamespaceKeys<IntlMessages, keyof IntlMessages>) => {
    return async (): Promise<Metadata> => {
        const t = await getTranslations(namespace);

        return {
            title: t('meta-title'),
            description: t('meta-description'),
        };
    };
};
