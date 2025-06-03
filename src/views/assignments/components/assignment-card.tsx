import { useTranslations } from 'next-intl';

import { Stack, Typography } from '@mui/material';

import { Assignment } from '@/api/entities';
import { UniversalLink } from '@/components/universal-link';
import dayjs from '@/config/date';

import DetailsPopper from './detalis-popper';

export default function AssignmentCard({ data }: Readonly<{ data: Assignment }>) {
    const t = useTranslations();

    return (
        <Stack
            p={2}
            flex={1}
            height='100%'
            display='flex'
            borderRadius={4}
            position='relative'
            bgcolor='primary.light'
            component={UniversalLink}
            border='2px solid transparent'
            href={`/assignment/${data.id}`}
            boxShadow='0px 50px 50px 0px #0000000D'
            sx={{
                transition: 'transform 0.5s ease, box-shadow 0.3s ease',
                background:
                    'linear-gradient(white, white) padding-box, linear-gradient(.04deg, #4FD1C5 .04%, rgba(237,135,4,0) 99.97%) border-box',
                ':hover': {
                    cursor: 'pointer',
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 60px 60px 0px #0000000D',
                },
            }}>
            <DetailsPopper />
            <Typography variant='body1' fontWeight={500}>
                {t('assignments.card.created-at')}:
            </Typography>
            <Typography variant='body2'>
                {dayjs(data.createdAt, 'DD.MM.YYYY').format('DD MMMM YYYY')}
            </Typography>
            <Typography variant='body1' fontWeight={500}>
                {t('assignments.card.level')}:
            </Typography>
            <Typography variant='body2'>{t(`level.${data.difficulty}`)}</Typography>

            <Typography variant='body1' fontWeight={500}>
                {t('assignments.card.main-topics')}:
            </Typography>
            <Typography variant='body2'>{`${data.questions.part1[0].topic}, ${data.questions.part1[1].topic}, ${data.questions.part1[2].topic}, ${data.questions.part2[0].topic}, ${data.questions.part3[0].topic}`}</Typography>
        </Stack>
    );
}
