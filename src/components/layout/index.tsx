'use client';
import { Box } from '@mui/material';

import { Container } from './container';
import { Footer } from './footer';
import { Header } from './header';

export default function BaseLayout({ children }: React.PropsWithChildren) {
    return (
        // <Box bgcolor='#52DBB21a'>
        <Box bgcolor={(theme) => theme.palette.primary.a10}>
            <Box mb={{ md: 0, xs: 0, lg: 0 }}>
                <Header />
                <Container>{children}</Container>
                <Footer />
            </Box>
        </Box>
    );
}
