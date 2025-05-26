import axios from 'axios';

const TIMEOUT = 360000;

const client = axios.create({ timeout: TIMEOUT });

client.interceptors.request.use(
    async (req) => {
        if (!globalThis.window) {
            const ctx = await import('./context.server');
            const headers = await ctx.context();
            req.headers['cookie'] = headers.cookie;
        }

        return req;
    },
    (error) => Promise.reject(new Error(error)),
);

export default client;
