import { metadata } from '@/intl/metadata';
import { NotFound } from '@/views/not-found';

export const generateMetadata = metadata('not-found');

export default async function Page({ params }: Readonly<PageProps>) {
    const { locale } = await params;
    return <NotFound locale={locale} />;
}
