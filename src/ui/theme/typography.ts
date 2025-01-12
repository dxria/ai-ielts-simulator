'use client';

import localFont from 'next/font/local';
import type { ThemeOptions } from '@mui/material';

export const FixelDisplay = localFont({
    display: 'swap',
    src: [
        {
            weight: '200',
            style: 'normal',
            path: '../../../public/fonts/FixelDisplay-ExtraLight.woff2',
        },
        {
            weight: '300',
            style: 'normal',
            path: '../../../public/fonts/FixelDisplay-Light.woff2',
        },
        {
            weight: '400',
            style: 'normal',
            path: '../../../public/fonts/FixelDisplay-Medium.woff2',
        },
        {
            weight: '500',
            style: 'normal',
            path: '../../../public/fonts/FixelDisplay-SemiBold.woff2',
        },
        {
            weight: '600',
            style: 'bold',
            path: '../../../public/fonts/FixelDisplay-Bold.woff2',
        },
    ],
});

const typography: ThemeOptions['typography'] = {
    fontFamily: [FixelDisplay.style.fontFamily].join(','),
};

export default typography;
