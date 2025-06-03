import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Box, Stack, Typography } from '@mui/material';
import Spiral from '@public/images/spiral.png';

import Collapse from './collapse';

const faq: { answer: any; id: number; question: any }[] = [
    {
        id: 1,
        answer: 'questions.answer-1',
        question: 'questions.question-1',
    },
    {
        id: 2,
        answer: 'questions.answer-2',
        question: 'questions.question-2',
    },
    {
        id: 3,
        answer: 'questions.answer-3',
        question: 'questions.question-3',
    },
    {
        id: 4,
        answer: 'questions.answer-4',
        question: 'questions.question-4',
    },
    {
        id: 5,
        answer: 'questions.answer-5',
        question: 'questions.question-5',
    },
];

export default function Faq() {
    const t = useTranslations('main.faq');

    return (
        <Box mt={20} id='faq' sx={{ scrollMarginTop: 100 }}>
            <Box display='grid' gridTemplateColumns='repeat(2, 1fr)'>
                <Box height='100%' display='flex' alignItems='center'>
                    <Box left={-80} position='absolute'>
                        <Image
                            alt={''}
                            src={Spiral}
                            style={{ mixBlendMode: 'color-burn' }}
                        />
                    </Box>

                    <Typography variant='h2' textAlign='left'>
                        {t('title')}
                    </Typography>
                </Box>

                <Stack gap={4}>
                    {faq.map((q) => (
                        <Collapse key={q.question} title={t(q.question)}>
                            <Typography variant='body2'>{t(q.answer)}</Typography>
                        </Collapse>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
