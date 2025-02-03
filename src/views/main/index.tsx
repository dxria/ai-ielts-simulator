import { Box } from '@mui/material';

import FAQ from './faq';
import GetInTouch from './get-in-touch';
import HeroSection from './hero-section';
import WhatWeOffer from './what-we-offer';

export default function Main() {
    return (
        <>
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
        </>
    );
}
