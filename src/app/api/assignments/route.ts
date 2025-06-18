import { NextRequest, NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { transformPrismaQuestionsToResponse } from '@/api/helpers';
import ConnectToDB from '@/utils/db-connection';
import prisma from '@/utils/prisma-client';

type AssignmentWithQuestions = Prisma.AssignmentGetPayload<{
    include: { performances: { include: { evaluation: true } }; questions: true };
}>;

export async function GET(req: NextRequest) {
    try {
        await ConnectToDB();

        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('userId') ?? '';

        const assignments = await prisma.assignment.findMany({
            where: { user: userId },
            orderBy: { createdAt: 'desc' },
            include: { questions: true, performances: { include: { evaluation: true } } },
        });

        const transformed = assignments.map((a: AssignmentWithQuestions) => ({
            ...a,
            performances: a.performances.filter((i) => i.evaluation),
            questions: transformPrismaQuestionsToResponse(a.questions),
        }));

        return NextResponse.json(transformed, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
