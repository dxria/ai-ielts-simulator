'use client';

import { useState } from 'react';

import { Box, Collapse as MuiCollapse, Stack, Typography } from '@mui/material';

import { Icon } from '@/components/icon';

type CollapseProps = {
    title: string;
};

export default function Collapse({
    title,
    children,
}: React.PropsWithChildren<CollapseProps>) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Stack
            p={3}
            gap={3}
            borderRadius={3}
            borderBottom='none'
            border='1px solid white'
            sx={{
                background: 'linear-gradient(129.48deg, #fff 1.02%, #4fd1c51a 152.02%)',
            }}>
            <Box
                gap={1}
                display='flex'
                alignItems='center'
                sx={{ cursor: 'pointer' }}
                justifyContent='space-between'
                onClick={() => setOpen((prev) => !prev)}>
                <Typography variant='h6'>{title}</Typography>
                <Box>
                    <Icon size={24} name={open ? 'minus' : 'plus'} />
                </Box>
            </Box>

            <MuiCollapse mountOnEnter unmountOnExit in={open}>
                <div>{children}</div>
            </MuiCollapse>
        </Stack>
    );
}
