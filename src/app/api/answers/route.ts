import { NextRequest, NextResponse } from 'next/server';

import { SaveAnswersInput } from '@/api/dto';
import ConnectToDB from '@/utils/db-connection';

export async function POST(req: NextRequest) {
    try {
        await ConnectToDB();
        const { userId, answers, assignmentId, performanceId }: SaveAnswersInput =
            await req.json();

        const transformed = Object.entries(answers)
            .filter(([_, speech]) => speech.trim() !== '')
            .map(([questionId, speech]) => ({
                speech,
                user: userId,
                assignmentId,
                performanceId,
                questionId: Number(questionId),
            }));

        const entry = await prisma.answer.createMany({ data: transformed });

        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
