import React from 'react';

import { Box, Button, IconButton, Popper } from '@mui/material';

import { Icon } from '@/components/icon';

export default function DetailsPopper() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
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
                <Box sx={{ p: 1, border: 1, bgcolor: 'background.paper' }}>
                    The content of the Popper.
                </Box>
            </Popper>{' '}
        </>
    );
}
