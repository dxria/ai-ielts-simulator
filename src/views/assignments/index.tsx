'use client';
import { useTranslations } from 'next-intl';

import { useUser } from '@clerk/nextjs';
import { Grid2 as Grid, Stack } from '@mui/material';

import { useAssignments } from '@/api/hooks';
import { PageHeader } from '@/components/page-header';

import AssignmentCard from './components/assignment-card';
import CreateAssignment from './components/create-assignment';

export default function Page() {
    const { user } = useUser();

    if (!user) return null;

    return <View userId={user.id} />;
}

function View({ userId }: { userId: string }) {
    const { data } = useAssignments({ userId });
    const t = useTranslations('assignments');

    if (!data) return null;

    return (
        <Stack p={3}>
            <PageHeader title={t('title')} right={<CreateAssignment />} />
            <Grid container spacing={2} alignItems='stretch' justifyContent='flex-start'>
                {data.map((i, idx) => (
                    <Grid key={`assignment-${idx}`} size={{ sm: 6, md: 4, xs: 13 }}>
                        <AssignmentCard data={i} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
