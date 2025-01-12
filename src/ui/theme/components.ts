/* eslint-disable quotes */
import { FixelDisplay } from './typography';
import type { ThemeOptions } from '@mui/material';

const components: ThemeOptions['components'] = {
    MuiButton: {
        defaultProps: {
            disableRipple: true,
        },
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                textTransform: 'none',
                fontFamily: FixelDisplay.style.fontFamily,
                fontSize: 16,
                fontWeight: 400,
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: 'transparent',
                },

                ...(ownerState.variant === 'contained' && {
                    borderRadius: theme.shape.borderRadius * 10,
                    background:
                        'linear-gradient(149.48deg, #4DC3FF 17.02%, #5E94FF 92.02%)',
                    color: '#fff',
                    transition: theme.transitions.create('box-shadow', {
                        duration: 500,
                        easing: theme.transitions.easing.easeInOut,
                    }),
                    padding: '13px 40px',
                    '&:hover': {
                        boxShadow: '0px 4px 25px 0px #00ADEF40',
                    },
                }),
                ...(ownerState.variant === 'text' && {}),
                ...(ownerState.variant === 'outlined' && {}),
            }),
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
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    maxWidth: 1,
                    width: 1,
                    backgroundColor: '#FFFFFF',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    maxWidth: 1,
                    width: 1,
                    backgroundColor: '#E6E6E6',
                    borderRadius: 10,
                },
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#9A9A9A',
                },
            },
        },
    },
    MuiRadio: {
        defaultProps: {
            disableRipple: true,
        },
    },
    MuiTypography: {
        styleOverrides: {
            h1({ theme }) {
                return {
                    color: theme.palette.text.primary,
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 104,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 48,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 38,
                        fontWeight: 500,
                    },
                };
            },
            h2({ theme }) {
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
            h3({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 16,
                        fontWeight: 400,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 16,
                        fontWeight: 500,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 16,
                        fontWeight: 500,
                    },
                };
            },
            h4({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme.palette.text.disabled,
                        lineHeight: '23px',
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme.palette.text.disabled,
                        lineHeight: '23px',
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme.palette.text.disabled,
                        lineHeight: '23px',
                    },
                };
            },
            body1({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 20,
                        fontWeight: 200,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 16,
                        fontWeight: 200,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 16,
                        fontWeight: 200,
                    },
                };
            },
            body2({ theme }) {
                return {
                    [theme.breakpoints.up('lg')]: {
                        fontSize: 16,
                        fontWeight: 300,
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 14,
                        fontWeight: 300,
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        fontSize: 14,
                        fontWeight: 300,
                    },
                };
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                fontWeight: 300,
                '& input:-webkit-autofill': {
                    transition:
                        'background-color 0s 600000s, color 0s 600000s !important',
                },
                '& input:-webkit-autofill:focus': {
                    transition:
                        'background-color 0s 600000s, color 0s 600000s !important',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #E4E4E6',
                    borderRadius: '24px',
                },
                '.MuiInputBase-input': {
                    fontWeight: 300,
                    padding: '8px 20px 8px 20px',
                    '&.MuiInputBase-inputMultiline': {
                        padding: '0px 6px',
                    },
                    '&::placeholder': {
                        color: '#B5B5BD',
                        fontWeight: 300,
                    },
                },
                '.MuiFormHelperText-root': {
                    fontWeight: 300,
                },
            },
        },
    },
};

export default components;
