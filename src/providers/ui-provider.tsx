"use client";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useMemo } from "react";
import createTheme from "@/ui/theme";

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
            {children}
        </ThemeProvider>
    );
}
