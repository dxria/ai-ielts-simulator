import client from './client';
import { ContactInput, CreateAssignmentInput, GetAssignmentInput } from './dto';
import { Assignment } from './entities';

export async function createAssignment(input: CreateAssignmentInput) {
    const res = await client.post('/assignment', input);
    return res.data;
}

export async function getAssignment(input: GetAssignmentInput) {
    const res = await client.get<Assignment>('/assignment', {
        params: input,
    });
    return res.data;
}

export async function getAssignments(input: { userId: string }) {
    const res = await client.get<Assignment[]>('/assignments', {
        params: input,
    });
    return res.data;
}

export async function contact(input: ContactInput): Promise<{
    success: boolean;
}> {
    return client.post('/get-in-touch', { data: input });
}
