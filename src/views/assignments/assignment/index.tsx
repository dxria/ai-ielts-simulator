'use client';

import { useState } from 'react';
import Webcam from 'react-webcam';

import { useUser } from '@clerk/nextjs';
import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';

import { GetAssignmentInput } from '@/api/dto';
import { useAssignment } from '@/api/hooks';
import { Icon } from '@/components/icon';

import QuestionsSection from './questions-section';

export default function Page({ assignmentId }: { assignmentId: number }) {
    const { user } = useUser();

    if (!user) return null;

    return <View userId={user.id} assignmentId={assignmentId} />;
}

function View({ userId, assignmentId }: GetAssignmentInput) {
    const { data } = useAssignment({ userId, assignmentId });

    const [enabled, setEnabled] = useState(false);
    const [started, setStarted] = useState(false);

    if (!data) return null;
    console.log(data);

    if (!started) {
        return (
            <Box
                height='100vh'
                display='flex'
                alignItems='center'
                justifyContent='center'>
                <Grid
                    container
                    spacing={2}
                    width='100%'
                    alignItems='stretch'
                    justifyContent='center'>
                    <Grid size={{ sm: 6 }}>
                        <Stack gap={3}>
                            {enabled ? (
                                <Webcam
                                    mirrored
                                    style={{ width: '100%', height: '100%' }}
                                    onUserMedia={() => setEnabled(true)}
                                    onUserMediaError={() => setEnabled(false)}
                                />
                            ) : (
                                <Stack
                                    px={6}
                                    py={12}
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
                        </Stack>
                    </Grid>
                    <Grid
                        display='flex'
                        size={{ sm: 6 }}
                        flexDirection='column'
                        justifyContent='space-between'>
                        <Stack gap={3}>
                            <Typography variant='h6'>
                                Assignment {assignmentId}
                            </Typography>
                            <Typography variant='body2'>
                                Difficulty: {data.difficulty}
                            </Typography>
                        </Stack>

                        <Button
                            sx={{ mt: 3 }}
                            variant='outlined'
                            onClick={() => setStarted(!started)}>
                            {'Start speaking test'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    return <QuestionsSection questions={data.questions} />;
}
