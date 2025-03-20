import { NextRequest, NextResponse } from 'next/server';

import { CreateAssignmentInput } from '@/api/dto';
import {
    transformPrismaQuestionsToResponse,
    transformQuestionsResponseToPrisma,
} from '@/api/helpers';
import ConnectToDB from '@/utils/db-connection';
import { chatSession } from '@/utils/gemini-ai';

export async function POST(req: NextRequest) {
    try {
        await ConnectToDB();
        const { userId, difficulty }: CreateAssignmentInput = await req.json();

        const result =
            await chatSession.sendMessage(`Please, generate questions for three parts of ielts speaking exam in json forma. The difficulty of questions: ${difficulty}. Third part has to be connected with second one. Give your answer as JSON object with strictly these fields: 
        {"part1": [{"topic": "", "questions": ["", "", ""]},  ..., ...],
         "part2": [{"topic": "", "question":  "", "prompt": ""}],
         "part3": [{"topic": "", "questions": ["", "", ""]}]}`);

        const data = JSON.parse(
            result.response.text().replace('```json', '').replace('```', ''),
        );

        const entry = await prisma.assignment.create({
            data: { user: userId ?? '10', difficulty: difficulty },
        });

        const questions = transformQuestionsResponseToPrisma(data, entry.id);
        await prisma.question.createMany({ data: questions });

        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await ConnectToDB();

        const searchParams = req.nextUrl.searchParams;
        const assignmentId = searchParams.get('assignmentId') ?? '';
        const userId = searchParams.get('userId') ?? '';

        const assignment = await prisma.assignment.findUnique({
            include: { questions: true },
            where: { user: userId, id: +assignmentId },
        });
        const transformedResponse = transformPrismaQuestionsToResponse(
            assignment.questions,
        );

        return NextResponse.json(
            { ...assignment, questions: transformedResponse },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
