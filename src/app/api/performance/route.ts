import { NextRequest, NextResponse } from 'next/server';

import { SavePerformanceInput } from '@/api/dto';
import ConnectToDB from '@/utils/db-connection';

export async function POST(req: NextRequest) {
    try {
        await ConnectToDB();
        const { userId, endTime, startTime, assignmentId }: SavePerformanceInput =
            await req.json();

        const entry = await prisma.performance.create({
            data: { endTime, startTime, user: userId, assignmentId },
        });

        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
