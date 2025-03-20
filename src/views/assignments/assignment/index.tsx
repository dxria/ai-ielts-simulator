'use client';

import { useState } from 'react';
import Webcam from 'react-webcam';

import { useTranslations } from 'next-intl';

import { useUser } from '@clerk/nextjs';
import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';

import { GetAssignmentInput } from '@/api/dto';
import { useAssignment } from '@/api/hooks';
import { Icon } from '@/components/icon';
import { PageHeader } from '@/components/page-header';
import dayjs from '@/config/date';

import QuestionsSection from './questions-section';

export default function Page({ assignmentId }: { assignmentId: number }) {
    const { user } = useUser();

    if (!user) return null;

    return <View userId={user.id} assignmentId={assignmentId} />;
}

function View({ userId, assignmentId }: GetAssignmentInput) {
    const { data } = useAssignment({ userId, assignmentId });
    const t = useTranslations();

    const [enabled, setEnabled] = useState(false);
    const [started, setStarted] = useState(false);

    if (!data) return null;

    if (!started) {
        return (
            <Stack p={3}>
                <PageHeader back backHref='/assignment' title={t('assignments.title')} />

                <Box display='flex' alignItems='center' justifyContent='center'>
                    <Grid
                        container
                        spacing={2}
                        width='100%'
                        height='100%'
                        alignItems='stretch'
                        justifyContent='center'>
                        <Grid
                            gap={2}
                            display='flex'
                            size={{ sm: 6 }}
                            minHeight='100%'
                            flexDirection='column'
                            justifyContent='space-between'>
                            {enabled ? (
                                <Webcam
                                    mirrored
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20,
                                    }}
                                    onUserMedia={() => setEnabled(true)}
                                    onUserMediaError={() => setEnabled(false)}
                                />
                            ) : (
                                <Stack
                                    px={6}
                                    py={12}
                                    flex={1}
                                    height='100%'
                                    display='flex'
                                    bgcolor='#fff'
                                    borderRadius={4}
                                    justifyContent='center'
                                    border='2px solid transparent'
                                    sx={{
                                        background:
                                            'linear-gradient(white, white) padding-box, linear-gradient(.04deg, #4FD1C5 .04%, rgba(237,135,4,0) 99.97%) border-box',
                                    }}>
                                    <Icon size={100} name='webcam' />
                                </Stack>
                            )}
                            <Button
                                variant='contained'
                                sx={{ width: '100%' }}
                                onClick={() => setEnabled(!enabled)}>
                                {enabled
                                    ? 'Disable WebCam and Microphone'
                                    : 'Enable WebCam and Microphone'}
                            </Button>
                        </Grid>
                        <Grid
                            gap={2}
                            display='flex'
                            minHeight='100%'
                            size={{ sm: 6 }}
                            flexDirection='column'
                            justifyContent='space-between'>
                            <Stack gap={0.5}>
                                <Typography variant='body1' fontWeight={500}>
                                    {t('assignments.card.created-at')}:
                                </Typography>
                                <Typography variant='body2'>
                                    {dayjs(data.createdAt, 'DD.MM.YYYY').format(
                                        'DD MMMM YYYY',
                                    )}
                                </Typography>
                                <Typography variant='body1' fontWeight={500}>
                                    {t('assignments.card.level')}:
                                </Typography>
                                <Typography variant='body2'>
                                    {t(`level.${data.difficulty}`)}
                                </Typography>

                                <Typography variant='body1' fontWeight={500}>
                                    {t('assignments.card.main-topics')}:
                                </Typography>
                                <Typography variant='body2'>{`${data.questions.part1[0].topic}, ${data.questions.part1[1].topic}, ${data.questions.part1[2].topic}, ${data.questions.part2[0].topic}, ${data.questions.part3[0].topic}`}</Typography>

                                <Stack
                                    p={2}
                                    mt={2}
                                    borderRadius={3}
                                    bgcolor={(theme) => theme.palette.secondary.a20}
                                    border={(theme) =>
                                        `2px solid ${theme.palette.secondary.main}`
                                    }>
                                    <Box gap={1} display='flex' alignItems='center'>
                                        <Icon name='lightbulb' />
                                        <Typography variant='body1'>
                                            Information
                                        </Typography>
                                    </Box>
                                    <Typography variant='body2'>
                                        Enable web cam and microphone to proceed. The
                                        session of assignment consists of 3 parts, each
                                        has from 1 to 3 questions. After answering each of
                                        them you will get your report and approximate
                                        grade, based on ai-analysis of your speech. NOTE:
                                        your video is not filmed and you can turn it of
                                        any minute you want.
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Button
                                variant='outlined'
                                onClick={() => setStarted(!started)}>
                                {'Start speaking test'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        );
    }

    return <QuestionsSection questions={data.questions} />;
}
