import { redirect } from 'next/navigation';

export default async function NotFound({ params }: PageProps) {
    const locale = (await params).locale;

    redirect('/' + locale);
}
