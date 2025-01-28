'use client';

import { useMemo } from 'react';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import createTheme from '@/ui/theme';

import { ToastProvider } from './toast.provider';

export interface UiProviderProps {
    viewport: Viewport;
}

export default function UiProvider({
    viewport,
    children,
}: React.PropsWithChildren<UiProviderProps>) {
    const theme = useMemo(
        () =>
            createTheme({
                viewport,
            }),
        [viewport],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastProvider />
            {children}
        </ThemeProvider>
    );
}
