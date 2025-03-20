import type { ThemeOptions } from '@mui/material';

import { FixelDisplay } from './typography';

const components: ThemeOptions['components'] = {
    MuiRadio: {
        defaultProps: {
            disableRipple: true,
        },
    },
    MuiCheckbox: {
        defaultProps: {
            disableRipple: true,
        },
    },
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#9A9A9A',
                },
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    width: 1,
                    maxWidth: 1,
                    backgroundColor: '#FFFFFF',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    width: 1,
                    maxWidth: 1,
                    borderRadius: 10,
                    backgroundColor: '#E6E6E6',
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                fontWeight: 300,
                '.MuiFormHelperText-root': {
                    fontWeight: 300,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderRadius: '24px',
                    border: '1px solid #D6DDED',
                },
                '& input:-webkit-autofill': {
                    transition:
                        'background-color 0s 600000s, color 0s 600000s !important',
                },
                '& input:-webkit-autofill:focus': {
                    transition:
                        'background-color 0s 600000s, color 0s 600000s !important',
                },
                '.MuiInputBase-input': {
                    fontWeight: 300,
                    padding: '8px 20px 8px 20px',
                    '&.MuiInputBase-inputMultiline': {
                        padding: '0px 6px',
                    },
                    '&::placeholder': {
                        fontWeight: 300,
                        color: '#8987A1',
                    },
                },
            },
        },
    },
    MuiButton: {
        defaultProps: {
            disableRipple: true,
        },
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                fontSize: 14,
                fontWeight: 500,
                boxShadow: 'none',
                textTransform: 'none',
                fontFamily: FixelDisplay.style.fontFamily,
                '&:hover': {
                    backgroundColor: 'transparent',
                },

                ...(ownerState.variant === 'contained' && {
                    color: '#fff',
                    padding: '13px 35px',
                    borderRadius: theme.shape.borderRadius * 10,
                    background:
                        'linear-gradient(149.48deg, #4FD1C5 27.02%, #00ADFE 112.02%)',
                    '&:hover': {
                        boxShadow: '0px 4px 25px 0px #00adfe33',
                    },
                    transition: theme.transitions.create('box-shadow', {
                        duration: 500,
                        easing: theme.transitions.easing.easeInOut,
                    }),
                }),
                ...(ownerState.variant === 'text' && {}),
                ...(ownerState.variant === 'outlined' && {
                    padding: '13px 35px',
                    backgroundColor: 'transparent',
                    border: '1px solid transparent',
                    borderRadius: theme.shape.borderRadius * 10,
                    '&:hover': {
                        boxShadow: '0px 4px 25px 0px #00adfe33',
                    },
                    background:
                        'linear-gradient(white, white) padding-box, linear-gradient(.04deg, #4FD1C5 .04%, rgba(237,135,4,0) 99.97%) border-box',
                    transition: theme.transitions.create('box-shadow', {
                        duration: 500,
                        easing: theme.transitions.easing.easeInOut,
                    }),
                }),
            }),
        },
    },
    MuiTypography: {
        styleOverrides: {
            body1({ theme }) {
                return {
                    [theme.breakpoints.up('sm')]: {
                        fontSize: 20,
                        color: theme.palette.text.primary,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 16,
                        color: theme.palette.text.primary,
                    },
                };
            },

            body2({ theme }) {
                return {
                    [theme.breakpoints.up('sm')]: {
                        fontSize: 14,
                        color: theme.palette.text.secondary,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 14,
                        color: theme.palette.text.secondary,
                    },
                };
            },
            h2({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 60,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 24,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 42,
                        fontWeight: 500,
                    },
                };
            },
            h3({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 40,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 24,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 24,
                        fontWeight: 500,
                    },
                };
            },
            h6({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 24,
                        fontWeight: 500,
                        lineHeight: '23px',
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 20,
                        fontWeight: 500,
                        lineHeight: '23px',
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: '23px',
                    },
                };
            },

            h1({ theme }) {
                return {
                    color: theme.palette.text.primary,
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 95,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 38,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.between('md', 'lg')]: {
                        fontSize: 72,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.between('sm', 'md')]: {
                        fontSize: 48,
                        fontWeight: 500,
                    },
                };
            },
            h4({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '23px',
                        color: theme.palette.text.disabled,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '23px',
                        color: theme.palette.text.disabled,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '23px',
                        color: theme.palette.text.disabled,
                    },
                };
            },
        },
    },
};

export default components;
