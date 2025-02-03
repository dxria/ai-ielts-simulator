import { useTranslations } from 'next-intl';

import { Box, Stack, Typography } from '@mui/material';

import { Icon, IconName } from '@/components/icon';

const content: {
    gridArea: string;
    icon: IconName;
    id: number;
    text: any;
    title: any;
}[] = [
    {
        id: 1,
        icon: 'sun',
        gridArea: '1 / 1 / 2 / 2',
        title: 'propositions.title-1',
        text: 'propositions.content-1',
    },
    {
        id: 2,
        icon: 'sun',
        gridArea: '1 / 2 / 2 / 3',
        title: 'propositions.title-2',
        text: 'propositions.content-2',
    },
    {
        id: 3,
        icon: 'sun',
        gridArea: '2 / 1 / 3 / 3',
        title: 'propositions.title-3',
        text: 'propositions.content-3',
    },
    {
        id: 4,
        icon: 'sun',
        gridArea: '1 / 3 / 2 / 4',
        title: 'propositions.title-4',
        text: 'propositions.content-4',
    },
    {
        id: 5,
        icon: 'sun',
        gridArea: '2 / 3 / 3 / 4',
        title: 'propositions.title-5',
        text: 'propositions.content-5',
    },
    {
        id: 6,
        icon: 'sun',
        gridArea: '1 / 4 / 3 / 5',
        title: 'propositions.title-6',
        text: 'propositions.content-6',
    },
];
export default function WhatWeOffer() {
    const t = useTranslations('main.what-we-offer');

    return (
        <Stack
            gap={4}
            id='what-we-offer'
            alignItems='flex-start'
            sx={{ scrollMarginTop: 100 }}>
            <Typography variant='h2' textAlign='center'>
                {t('title')}
            </Typography>
            <Box
                rowGap={4}
                width='100%'
                columnGap={4}
                display='grid'
                gridTemplateRows='repeat(2, 1fr)'
                gridTemplateColumns='repeat(4, 1fr)'>
                {content.map((i) => (
                    <Box
                        key={i.id}
                        p={3}
                        gap={2.5}
                        width='100%'
                        minWidth={280}
                        display='flex'
                        borderRadius={3}
                        gridArea={i.gridArea}
                        flexDirection='column'
                        border='1px solid white'
                        sx={{
                            background:
                                'linear-gradient(129.48deg, #fff 1.02%, #4fd1c51a 152.02%)',
                        }}>
                        <Box
                            p={2}
                            lineHeight={0}
                            borderRadius={2.5}
                            width='fit-content'
                            bgcolor='primary.a10'>
                            <Icon size={18} name={i.icon} />
                        </Box>
                        <Typography variant='h6'>{t(i.title)}</Typography>
                        <Typography variant='body2'>{t(i.text)}</Typography>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
}
