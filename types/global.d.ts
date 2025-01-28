import { LOCALES } from '@/intl/config';

declare global {
    type Locale = (typeof LOCALES)[number];
    type Viewport = 'mobile' | 'tablet' | 'desktop';

    type ValueOf<T> = T[keyof T];
    type ArrayElement<T> = T extends (infer U)[] ? U : never;

    // eslint-disable-next-line no-var
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
    interface PageProps {
        params: Promise<{ locale: Locale }>;
        searchParams: { [key: string]: string | string[] | undefined };
    }
}
