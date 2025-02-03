import { useTranslations } from 'next-intl';

import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { header } from '@/constant';

import { UniversalLink } from '../universal-link';
import Logo from './logo';

export function Footer() {
    const t = useTranslations();
    return (
        <Box
            pb={15}
            sx={{
                backgroundSize: '100%',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url('images/footer-blur.png')`,
            }}>
            <Box
                px={9}
                py={10}
                margin='auto'
                maxWidth={1156}
                borderRadius={10}
                bgcolor='white.a60'>
                <Logo />
                <Box mt={3} display='grid' gridTemplateColumns='repeat(2, 1fr)'>
                    <Typography variant='body2' sx={{ fontSize: '16px !important' }}>
                        {t('footer.text')}
                    </Typography>
                    <Stack gap={2} alignItems='flex-end'>
                        {header.map((i) => (
                            <UniversalLink
                                key={i.id}
                                href={i.href}
                                variant='body2'
                                sx={{ fontSize: '16px !important' }}>
                                {t(i.title)}
                            </UniversalLink>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
