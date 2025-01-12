'use client';
import { Box } from '@mui/material';
import { Container } from './container';
import { Footer } from './footer';
import { Header } from './header';

export default function BaseLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <Box mb={{ lg: 40, md: 0, xs: 0 }}>
                <Header />
                <Container>{children}</Container>
            </Box>
            <Footer />
        </>
    );
}
