import { Box, Typography } from '@mui/material';

import { Icon } from '../icon';
import { UniversalLink } from '../universal-link';

export default function Logo() {
    return (
        <UniversalLink href='/'>
            <Box gap={1.5} display='flex' alignItems='center' color='text.primary'>
                <Icon size={25} name='audio-lines' />
                <Typography variant='h2' sx={{ fontSize: '25px !important' }}>
                    SpeakPro
                </Typography>
            </Box>
        </UniversalLink>
    );
}
