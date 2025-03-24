import { PaletteColor, PaletteOptions, SimplePaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface SimplePaletteColorOptions extends SimplePaletteColorOptions {
        a10?: string;
        a20?: string;
        a30?: string;
        a40?: string;
        a60?: string;
    }

    interface PaletteColor extends PaletteColor {
        a10?: string;
        a20?: string;
        a30?: string;
        a40?: string;
        a60?: string;
    }

    interface PaletteOptions extends PaletteOptions {
        white: PaletteColorOptions;
    }
}
