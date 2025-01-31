'use client';
import { useUser } from '@clerk/nextjs';
import { Box } from '@mui/material';

import { useAssignments } from '@/api/hooks';

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
        <div>
            {data.map((i: any) => (
                <Box key={i.id}>{i.difficulty}</Box>
            ))}
            <CreateAssignment />
        </div>
    );
}
