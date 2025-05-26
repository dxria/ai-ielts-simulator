'use client';
import { useLocale } from 'next-intl';

import { Box, Button, Typography } from '@mui/material';

import { LOCALES } from '@/config/i18n';
import { usePathname, useRouter } from '@/intl/navigation';
export default function LocaleSelector() {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();
    const handleChangeLocale = (locale: string) => {
        router.replace(pathname, { locale });
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {LOCALES.map((l) => (
                <Button
                    key={l}
                    sx={{
                        py: 0,
                        px: 1.25,
                        minWidth: 0,
                        borderRadius: 0,
                        textTransform: 'uppercase',
                        transition: 'color 0.5s ease',
                        '&:hover': { color: 'primary.main' },
                        color: l === locale ? 'primary.main' : '#000',
                        ':not(:last-child)': { borderRight: '2px solid #000' },
                    }}
                    onClick={() => handleChangeLocale(l)}>
                    <Typography
                        variant='body2'
                        component='span'
                        color='inherit!important'>
                        {l}
                    </Typography>
                </Button>
            ))}
        </Box>
    );
}
