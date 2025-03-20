import { Box, Container } from '@mui/material';

import { Footer } from '@/components/layout/footer';

import FAQ from './faq';
import GetInTouch from './get-in-touch';
import HeroSection from './hero-section';
import WhatWeOffer from './what-we-offer';

export default function Main() {
    return (
        <Box
            sx={{
                backgroundSize: '100%',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url('images/footer-blur.png')`,
            }}>
            <Container>
                <Box
                    mt={-10}
                    sx={{
                        backgroundSize: '120%',
                        backgroundPosition: 'top',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url('images/gradient-blur.png')`,
                    }}>
                    <HeroSection />
                    <WhatWeOffer />
                </Box>
                <FAQ />
                <GetInTouch />
                <Footer />
            </Container>
        </Box>
    );
}
