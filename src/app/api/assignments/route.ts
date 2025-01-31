import { NextRequest, NextResponse } from 'next/server';

import ConnectToDB from '@/utils/db-connection';

export async function GET(req: NextRequest) {
    try {
        await ConnectToDB();

        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('userId') ?? '';

        const assignments = await prisma.assignment.findMany({
            where: { user: userId },
        });

        return NextResponse.json(assignments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
