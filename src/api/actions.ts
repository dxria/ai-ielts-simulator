import client from './client';
import {
    ContactInput,
    CreateAssignmentInput,
    GetAssignmentInput,
    GetEvaluatedInput,
    GetPerformanceInput,
    SaveAnswersInput,
    SavePerformanceInput,
} from './dto';
import { Assignment, Performance } from './entities';

export async function createAssignment(input: CreateAssignmentInput) {
    const res = await client.post('/api/assignment', input);
    return res.data;
}

export async function getAssignment(input: GetAssignmentInput) {
    const res = await client.get<Assignment>('/api/assignment', {
        params: input,
    });
    return res.data;
}

export async function getAssignments(input: { userId: string }) {
    const res = await client.get<Assignment[]>('/api/assignments', {
        params: input,
    });
    return res.data;
}

export async function contact(input: ContactInput): Promise<{
    success: boolean;
}> {
    const res = await client.post('/api/get-in-touch', { data: input });
    return res.data;
}

export async function savePerformance(input: SavePerformanceInput) {
    const res = await client.post('/api/performance', input);
    return res.data;
}

export async function saveAnswers(input: SaveAnswersInput) {
    const res = await client.post('/api/answers', input);
    return res.data;
}

export async function getEvaluated(input: GetEvaluatedInput) {
    const res = await client.post('/api/evaluation', input);
    return res.data;
}

export async function getPerformance(input: GetPerformanceInput) {
    const res = await client.get<Performance>('/api/performance', {
        params: input,
    });
    return res.data;
}
