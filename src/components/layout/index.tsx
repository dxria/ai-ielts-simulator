'use client';
import { Box } from '@mui/material';

import { Container } from './container';

export default function BaseLayout({ children }: React.PropsWithChildren) {
    return (
        <Box bgcolor={(theme) => theme.palette.primary.a10}>
            <Box
                mb={{ md: 0, xs: 0, lg: 0 }}
                sx={{
                    backgroundSize: '100%',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url('images/footer-blur.png')`,
                }}>
                <Container>{children}</Container>
            </Box>
        </Box>
    );
}
