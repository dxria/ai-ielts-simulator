import PerformanceView from '@/views/stats/performance';

export default async function Page({
    params,
}: Readonly<PageProps<{ performanceId: string }>>) {
    const performanceId = (await params).performanceId;

    return <PerformanceView performanceId={+performanceId} />;
}
