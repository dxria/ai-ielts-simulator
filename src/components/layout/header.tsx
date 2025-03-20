'use client';
import { useTranslations } from 'next-intl';

import { SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { Box, Button } from '@mui/material';

import { header } from '@/constant';

import { UniversalLink } from '../universal-link';
import Logo from './logo';

export function Header() {
    const { isSignedIn } = useUser();
    const t = useTranslations();
    return (
        <Box
            top={0}
            width='100%'
            zIndex={1100}
            display='flex'
            position='sticky'
            justifyContent='center'>
            <Box
                px={3}
                py={1}
                minWidth={600}
                display='flex'
                bgcolor='white.a60'
                alignItems='center'
                mt={isSignedIn ? 0 : 2}
                justifyContent='space-between'
                width={isSignedIn ? '100%' : 1000}
                borderRadius={isSignedIn ? 0 : 10}
                maxWidth={isSignedIn ? '100%' : 1200}>
                <Logo />

                <Box gap={5} display='flex' alignItems='center'>
                    {header.map((i) => (
                        <UniversalLink
                            key={i.id}
                            href={i.href}
                            fontSize={14}
                            fontWeight={400}
                            color='text.primary'>
                            {t(i.title)}
                        </UniversalLink>
                    ))}
                    {/* <UniversalLink href='/dashboard'>dashboard</UniversalLink>
                    <UniversalLink href='/assignment'>assignment</UniversalLink> */}
                </Box>
                {isSignedIn ? (
                    <Box gap={1.5} display='flex' alignItems='center'>
                        <SignOutButton>
                            <Button variant='text'>{t('header.sign-out')}</Button>
                        </SignOutButton>

                        <UserButton />
                    </Box>
                ) : (
                    <Box gap={1.5} display='flex' alignItems='center'>
                        <UniversalLink href='/sign-in' sx={{ fontSize: 14 }}>
                            {t('header.sign-in')}
                        </UniversalLink>
                        <Button
                            href='/sign-up'
                            variant='contained'
                            component={UniversalLink}>
                            {t('header.sign-up')}
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
