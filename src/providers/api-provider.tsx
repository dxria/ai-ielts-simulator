'use client';

import { useState } from 'react';

import {
    QueryClient,
    type QueryClientConfig,
    QueryClientProvider,
} from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

const handleError = (error: any) => {
    console.log('Error in global mutation ', error);

    const message = error?.response?.data?.message as string | { message: string[] };

    if (typeof message === 'string') {
        enqueueSnackbar({
            variant: 'error',
            message: message,
        });
    } else if (typeof message !== 'string' && Array.isArray(message?.message)) {
        for (let i = 0; i < message?.message.length; i++) {
            enqueueSnackbar({
                variant: 'error',
                message: message?.message[i],
            });
        }
    }
};

const handleSuccess = (data: any) => {
    const message = data?.data?.message ?? data?.message;

    if (message) {
        enqueueSnackbar({
            message: message,
            variant: 'success',
        });
    }
};

const config: QueryClientConfig = {
    defaultOptions: {
        mutations: {
            onError: handleError,
            onSuccess: handleSuccess,
        },
        queries: {
            retry: 1,
            staleTime: 5 * 1000,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    },
};

export default function ApiProvider({ children }: React.PropsWithChildren) {
    const [client] = useState(new QueryClient(config));

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
