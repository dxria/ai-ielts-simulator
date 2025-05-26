import * as React from 'react';

import { useTranslations } from 'next-intl';

import { SignOutButton, UserButton } from '@clerk/nextjs';
import {
    Button,
    ClickAwayListener,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { linking } from '@/constant';

import { Icon } from '../icon';
import { UniversalLink } from '../universal-link';
import LocaleSelector from './locale-selector';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedMixin = (theme: Theme): CSSObject => ({
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexShrink: 0,
        width: drawerWidth,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MiniDrawer({ children }: React.PropsWithChildren) {
    const [open, setOpen] = React.useState(false);
    const t = useTranslations();

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <>
                <Box
                    top={0}
                    width='100%'
                    display='flex'
                    position='sticky'
                    justifyContent='center'
                    zIndex={(theme) => theme.zIndex.drawer + 1}>
                    <Box
                        py={1}
                        mt={0}
                        px={2.5}
                        minWidth={600}
                        display='flex'
                        width={'100%'}
                        borderRadius={0}
                        maxWidth={'100%'}
                        alignItems='center'
                        bgcolor='primary.light'
                        justifyContent='space-between'
                        borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                        <Box
                            gap={1.5}
                            display='flex'
                            alignItems='center'
                            color='text.primary'>
                            <IconButton
                                sx={{
                                    p: 0,
                                    transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
                                    transition: (theme) =>
                                        theme.transitions.create('transform'),
                                }}
                                onClick={handleToggleDrawer}>
                                <Icon size={25} color='black' name='audio-lines' />
                            </IconButton>

                            <Typography variant='h2' sx={{ fontSize: '25px !important' }}>
                                SpeakPro
                            </Typography>
                        </Box>
                        <Box gap={1.5} display='flex' alignItems='center'>
                            <SignOutButton>
                                <Button variant='text'>{t('header.sign-out')}</Button>
                            </SignOutButton>

                            <UserButton />
                        </Box>
                    </Box>
                </Box>
                <Box width='100%' display='flex'>
                    <Drawer
                        open={open}
                        variant='permanent'
                        sx={{ bgcolor: 'primary.light' }}>
                        <Stack
                            pb={5}
                            gap={1}
                            height='100%'
                            justifyContent='space-between'>
                            <List sx={{ pt: 8 }}>
                                {linking.map(({ id, href, icon, title }) => (
                                    <ListItem
                                        key={id}
                                        disablePadding
                                        href={href}
                                        sx={{ display: 'block' }}
                                        component={UniversalLink}>
                                        <ListItemButton
                                            sx={{
                                                px: 2.5,
                                                minHeight: 48,
                                                justifyContent: open
                                                    ? 'initial'
                                                    : 'center',
                                            }}
                                            onClick={() => setOpen(false)}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    color: 'text.secondary',
                                                    justifyContent: 'center',
                                                }}>
                                                <Icon size={20} name={icon} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={t(title)}
                                                sx={{
                                                    opacity: open ? 1 : 0,

                                                    '& .MuiListItemText-primary': {
                                                        fontSize: 16,
                                                        lineHeight: 0,
                                                        fontWeight: 400,
                                                        // color: 'text.secondary',
                                                    },
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Stack gap={1}>
                                <Divider />
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <Box
                                        px={2.5}
                                        display='flex'
                                        minHeight={48}
                                        alignItems='center'
                                        justifyContent={open ? 'initial' : 'center'}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                color: 'text.secondary',
                                                justifyContent: 'center',
                                            }}>
                                            <Icon size={20} name='translate' />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<LocaleSelector />}
                                            sx={{
                                                opacity: open ? 1 : 0,

                                                '& .MuiListItemText-primary': {
                                                    fontSize: 16,
                                                    lineHeight: 0,
                                                    fontWeight: 400,
                                                    color: 'text.secondary',
                                                },
                                            }}
                                        />
                                    </Box>
                                </ListItem>
                            </Stack>
                        </Stack>
                    </Drawer>
                    <Box width='100%'>{children}</Box>
                </Box>
            </>
        </ClickAwayListener>
    );
}
