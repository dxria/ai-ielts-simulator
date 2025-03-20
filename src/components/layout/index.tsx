'use client';
import { useUser } from '@clerk/nextjs';
import { Box } from '@mui/material';

import { Header } from './header';
import Sidebar from './sidebar';

function Layout({ children }: React.PropsWithChildren) {
    return (
        <Box width='100%' sx={{ minHeight: '100vh' }} mb={{ md: 0, xs: 0, lg: 0 }}>
            {children}
        </Box>
    );
}
export default function BaseLayout({ children }: React.PropsWithChildren) {
    const { isSignedIn } = useUser();

    return (
        <Box bgcolor={(theme) => theme.palette.primary.a10}>
            {isSignedIn ? (
                <Sidebar>
                    <Layout>{children}</Layout>
                </Sidebar>
            ) : (
                <>
                    <Header />
                    <Layout>{children}</Layout>
                </>
            )}
        </Box>
    );
}
