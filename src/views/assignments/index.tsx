'use client';
import { useUser } from '@clerk/nextjs';
import { Grid2 as Grid, Stack, Typography } from '@mui/material';

import { useAssignments } from '@/api/hooks';
import { UniversalLink } from '@/components/universal-link';

import CreateAssignment from './create-assignment';

export default function Page() {
    const { user } = useUser();

    if (!user) return null;

    return <View userId={user.id} />;
}

function View({ userId }: { userId: string }) {
    const { data } = useAssignments({ userId });

    if (!data) return null;

    return (
        <Stack gap={5}>
            <CreateAssignment />
            <Grid container spacing={2} alignItems='stretch' justifyContent='center'>
                {data.map((i, idx) => (
                    <Grid key={idx} size={{ sm: 6, md: 4, xs: 13 }}>
                        <Stack
                            py={5}
                            gap={3}
                            flex={1}
                            height='100%'
                            display='flex'
                            bgcolor='#fff'
                            borderRadius={4}
                            px={{ xs: 7, md: 8 }}
                            component={UniversalLink}
                            href={`/assignment/${i.id}`}
                            border='2px solid transparent'
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
                            <Typography variant='body2' textAlign='center'>
                                {i.difficulty}
                            </Typography>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
