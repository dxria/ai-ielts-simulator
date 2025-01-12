import Home from '@/views/main';

export type RootLayoutProps = Pick<PageProps, 'params'>;

export const generateMetadata = async ({ params }: Pick<PageProps, 'params'>) => {
    const locale = (await params).locale;
};

async function HomePage() {
    return <Home />;
}

export default HomePage;
