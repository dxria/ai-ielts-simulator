import React from 'react';

import { useTranslations } from 'next-intl';

import {
    alpha,
    Box,
    ClickAwayListener,
    IconButton,
    Popper,
    Stack,
    Typography,
} from '@mui/material';

import { Performance } from '@/api/entities';
import { Icon } from '@/components/icon';
import { UniversalLink } from '@/components/universal-link';
import dayjs from '@/config/date';

export default function DetailsPopper({ performances }: { performances: Performance[] }) {
    const t = useTranslations('assignments');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                sx={{ p: 1, top: 10, right: 10, position: 'absolute' }}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleClick(event);
                }}>
                <Icon color='black' name='ellipsis-vertical' />
            </IconButton>
            <Popper open={open} anchorEl={anchorEl}>
                <Stack
                    px={1}
                    py={1}
                    flex={1}
                    height='100%'
                    display='flex'
                    bgcolor='#FFF'
                    borderRadius={2}
                    position='relative'
                    border='1px solid #000'
                    boxShadow='0px 50px 50px 0px #0000000D'>
                    {performances?.length > 0 ? (
                        performances.map((i) => (
                            <Box
                                key={i.id}
                                py={1}
                                px={1}
                                color='#000'
                                fontSize={13}
                                href={`/stats/${i.id}`}
                                component={UniversalLink}
                                sx={(theme) => ({
                                    transition: 'all 0.3s ease',
                                    '&:last-of-type': { borderBottom: 'none' },
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    ':hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                })}>
                                {dayjs(i.startTime, 'DD.MM.YYYY').format(
                                    'DD MMMM YYYY, H:mm',
                                )}{' '}
                                -{' '}
                                {dayjs(i.endTime, 'DD.MM.YYYY').format(
                                    'DD MMMM YYYY, H:mm',
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography variant='caption'>
                            {t('no-performances')}...
                        </Typography>
                    )}
                </Stack>
            </Popper>
        </>
    );
}
