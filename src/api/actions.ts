import client from './client';
import { CreateSessionInput } from './dto';

export async function createSession(input: CreateSessionInput) {
    const books = await client.post('/create-session', input);
    return books.data;
}
