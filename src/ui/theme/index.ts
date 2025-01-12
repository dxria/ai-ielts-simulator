import { createTheme, type Breakpoint } from "@mui/material";

import components from "./components";
import palette from "./palette";
import typography from "./typography";

const breakpoints: { [key in Breakpoint]: number } = {
    xs: 0,
    sm: 600,
    md: 1024,
    lg: 1280,
    xl: 1520,
};

const mediaMatch: Record<Viewport, string> = {
    desktop: `(min-width:${breakpoints.lg}px)`,
    mobile: `(max-width:${breakpoints.sm - 0.05}px)`,
    tablet: `(min-width:${breakpoints.sm}}px) and (max-width:${
        breakpoints.lg - 0.05
    }px)`,
};

const theme = ({ viewport }: { viewport: Viewport }) => {
    return createTheme({
        breakpoints: {
            values: breakpoints,
        },
        components: {
            MuiUseMediaQuery: {
                defaultProps: {
                    ssrMatchMedia: (query) => {
                        return {
                            matches: viewport
                                ? query === mediaMatch[viewport]
                                : false,
                        };
                    },
                },
            },
            ...components,
        },
        typography,
        palette,
    });
};

export default theme;
