import { type NextRequest, NextResponse } from 'next/server';

import { ContactInput } from '@/api/dto';
import mailService from '@/utils/mail.service';

export async function POST(req: NextRequest) {
    try {
        const json = (await req.json()) as ContactInput;

        await mailService.send(json);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false });
    }
}
