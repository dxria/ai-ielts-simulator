import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useResponseStatus } from '@/hooks/use-response-status';

import * as actions from './actions';
import { GetAssignmentInput } from './dto';

const queryKey = ['assignment'];

export function useCreateAssignment() {
    const queryClient = useQueryClient();
    const status = useResponseStatus();

    const { isPending, mutateAsync: createAssignment } = useMutation({
        onError: status.error,
        mutationFn: actions.createAssignment,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: queryKey,
            });

            status.success('success-assignment-created');
        },
    });

    return {
        createAssignment,
        loading: isPending,
    };
}

export function useAssignment(input: GetAssignmentInput) {
    const { data, isPending: loading } = useQuery({
        queryKey: [...queryKey, input.assignmentId],
        queryFn: () => actions.getAssignment({ ...input }),
    });

    return { data, loading };
}

export function useAssignments(input: { userId: string }) {
    const { data, isPending: loading } = useQuery({
        queryKey: [...queryKey],
        queryFn: () => actions.getAssignments({ ...input }),
    });

    return { data, loading };
}
