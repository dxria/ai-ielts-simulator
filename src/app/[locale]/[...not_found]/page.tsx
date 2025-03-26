import { metadata } from '@/intl/metadata';
import { NotFound } from '@/views/not-found';

export const generateMetadata = metadata('not-found');

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    return <NotFound locale={locale} />;
}
