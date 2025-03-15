import { Box } from '@mui/material';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

import FAQ from './faq';
import GetInTouch from './get-in-touch';
import HeroSection from './hero-section';
import WhatWeOffer from './what-we-offer';

export default function Main() {
    return (
        <>
            <Header />
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
        </>
    );
}
