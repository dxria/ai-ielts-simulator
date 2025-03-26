import { metadata } from '@/intl/metadata';
import Home from '@/views/main';

export type RootLayoutProps = Pick<PageProps, 'params'>;

export const generateMetadata = metadata('main');

async function HomePage() {
    return <Home />;
}

export default HomePage;
