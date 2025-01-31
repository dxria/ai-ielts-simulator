'use client';

import { useUser } from '@clerk/nextjs';

import { GetAssignmentInput } from '@/api/dto';
import { useAssignment } from '@/api/hooks';

export default function Page({ assignmentId }: { assignmentId: number }) {
    const { user } = useUser();

    if (!user) return null;

    return <View userId={user.id} assignmentId={assignmentId} />;
}

function View({ userId, assignmentId }: GetAssignmentInput) {
    const { data } = useAssignment({ userId, assignmentId });

    if (!data) return null;

    return <div>{assignmentId}</div>;
}
