import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useResponseStatus } from '@/hooks/use-response-status';

import * as actions from './actions';

const queryKey = ['session'];

export function useCreateSession() {
    const queryClient = useQueryClient();
    const status = useResponseStatus();

    const { isPending, mutateAsync: createSession } = useMutation({
        onError: status.error,
        mutationFn: actions.createSession,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: queryKey,
            });

            status.success('success-session-created');
        },
    });

    return {
        createSession,
        loading: isPending,
    };
}
