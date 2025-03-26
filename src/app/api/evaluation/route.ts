import { NextRequest, NextResponse } from 'next/server';

import { GetEvaluatedInput } from '@/api/dto';
import { transformPrismaQuestionsToResponseWithAnswers } from '@/api/helpers';
import ConnectToDB from '@/utils/db-connection';
import { chatSession } from '@/utils/gemini-ai';

export async function POST(req: NextRequest) {
    try {
        await ConnectToDB();
        const { userId, assignmentId, performanceId }: GetEvaluatedInput =
            await req.json();

        const questions = await prisma.question.findMany({ where: { assignmentId } });
        const answers = await prisma.answer.findMany({
            where: { assignmentId, user: userId, performanceId },
        });

        const transformed = transformPrismaQuestionsToResponseWithAnswers(
            questions,
            answers,
        );

        console.log(transformed);

        const result =
            await chatSession.sendMessage(`Please, generate feedback for the recorded with SpeechToText student answers for ielts speaking exam simulation. Rate the answers by fluency and coherence, grammatical range and accuracy, lexical resourse. Keep in mind the possible mismatches, that can be the result of Speech Recognition tools mistakes. Give your answer as JSON object with this strict format:
                        { part1 | part2 | part3: { questions: { id: number; answer: string; comments: string; fluency_and_coherence: string; grammatical_range_and_accuracy: string; lexical_resource: string;}[]; topic: string;}; overall_feedback: string; }.
                         Here are the questions and answers of the student: ${JSON.stringify(transformed)}`);

        const feedback = JSON.parse(
            result.response.text().replace('```json', '').replace('```', ''),
        );
        console.log(feedback);
        const entry = await prisma.evaluation.create({
            data: { feedback, user: userId, performanceId },
        });

        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
