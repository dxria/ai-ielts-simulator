'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button, Container, Typography } from '@mui/material';

import { redirect } from '@/intl/navigation';

export function NotFound({ locale }: { locale: Locale }) {
    const t = useTranslations('not-found');

    return (
        <Container
            sx={{
                gap: 5,
                display: 'flex',
                minHeight: '80vh',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
            <Image
                width={450}
                height={250}
                alt='404 Error'
                src='/images/404.png'
                style={{
                    width: '40%',
                    height: 'auto',
                }}
            />

            <Typography variant='body1' textAlign='center'>
                {t('description')}
            </Typography>

            <Button
                variant='contained'
                onClick={() => redirect({ locale, href: '/assignment' })}>
                {t('button')}
            </Button>
        </Container>
    );
}
