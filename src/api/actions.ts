import client from './client';
import { CreateAssignmentInput, GetAssignmentInput } from './dto';

export async function createAssignment(input: CreateAssignmentInput) {
    const res = await client.post('/assignment', input);
    return res.data;
}

export async function getAssignment(input: GetAssignmentInput) {
    const res = await client.get('/assignment', {
        params: input,
    });
    return res.data;
}

export async function getAssignments(input: { userId: string }) {
    const res = await client.get('/assignments', {
        params: input,
    });
    return res.data;
}
