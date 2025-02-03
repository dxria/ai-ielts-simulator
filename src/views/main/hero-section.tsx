import { useTranslations } from 'next-intl';

import { Button, Stack, Typography } from '@mui/material';

import { UniversalLink } from '@/components/universal-link';

export default function Hero() {
    const t = useTranslations('main.hero-section');
    return (
        <Stack
            pt={5}
            gap={4}
            id='home'
            display='flex'
            height='100vh'
            alignItems='center'
            justifyContent='center'
            sx={{ scrollMarginTop: 100 }}>
            <Typography variant='h1' textAlign='center'>
                {t('title')}
            </Typography>
            <Button
                variant='contained'
                href='#get-in-touch'
                component={UniversalLink}
                sx={{ background: '#000', width: 'fit-content' }}>
                {t('button')}
            </Button>
        </Stack>
    );
}
