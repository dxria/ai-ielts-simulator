import { NextRequest, NextResponse } from 'next/server';

import { CreateSessionInput } from '@/api/dto';
import ConnectToDB from '@/utils/db-connection';
import { chatSession } from '@/utils/gemini-ai';

export async function POST(req: NextRequest) {
    try {
        await ConnectToDB();
        const { userId, difficulty }: CreateSessionInput = await req.json();

        const result =
            await chatSession.sendMessage(`Please, generate questions for three parts of ielts speaking exam in json forma. The difficulty of questions: ${difficulty}. Third part has to be connected with second one. Give your answer as JSON object with strictly these fields: 
        {"part1": [{"topic": "", "questions": ["", "", ""]},  ..., ...],
         "part2": [{"topic": "", "question":  "", "prompt": ""}],
         "part3": [{"topic": "", "questions": ["", "", ""]}]}`);

        const data = JSON.parse(
            result.response.text().replace('```json', '').replace('```', ''),
        );

        const entry = await prisma.test.create({
            data: { questions: data, user: userId ?? '10', difficulty: difficulty },
        });
        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
