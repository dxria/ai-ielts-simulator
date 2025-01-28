import axios from 'axios';

import { API_URL } from '@/config';

const TIMEOUT = 360000;

const client = axios.create({
    timeout: TIMEOUT,
    baseURL: `${API_URL}/api`,
});

client.interceptors.request.use(
    async (req) => {
        if (!globalThis.window) {
            const ctx = await import('./context.server');
            const headers = await ctx.context();
            req.headers['cookie'] = headers.cookie;
        }

        return req;
    },
    (error) => Promise.reject(error),
);

export default client;
