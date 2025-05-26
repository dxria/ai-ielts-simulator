import { NextRequest, NextResponse } from 'next/server';

import { GetEvaluatedInput } from '@/api/dto';
import { transformPrismaQuestionsToResponseWithAnswers } from '@/api/helpers';
import ConnectToDB from '@/utils/db-connection';
import { chatSession } from '@/utils/gemini-ai';
import prisma from '@/utils/prisma-client';

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

        const result =
            await chatSession.sendMessage(`Please, generate feedback for the recorded with SpeechToText student answers for ielts speaking exam simulation. Rate the answers by fluency and coherence, grammatical range and accuracy, lexical resourse, use the rating range of IELTS exam. Keep in mind the possible mismatches, that can be the result of Speech Recognition tools mistakes, but do not mention such errors in your comments. Format the "answer" field texts (but do not change anything, except for sentence punctuation). Give your answer as JSON object with this strict format:
                                          { part1 | part2 | part3: { questions: { id: number; question: string; answer: string; comments: string; fluency_and_coherence: string (the mark); grammatical_range_and_accuracy: string (the mark); lexical_resource: string (the mark);}[]; topic: string;}; overall_feedback: string (include approximate mark, commentary); }.                         
                                          Here are the questions and answers of the student: ${JSON.stringify(transformed)}`);

        const feedback = JSON.parse(
            result.response.text().replace('```json', '').replace('```', ''),
        );
        console.log(feedback);
        const entry = await prisma.evaluation.create({
            data: { user: userId, performanceId, feedback: JSON.stringify(feedback) },
        });

        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
