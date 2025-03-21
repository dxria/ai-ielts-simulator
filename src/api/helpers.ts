import { Question as QuestionEntity } from '@prisma/client';

import { Question, QuestionsResponse, QuestionWithPrompt } from './entities';

export function transformQuestionsResponseToPrisma(
    response: QuestionsResponse,
    assignmentId: number,
): any {
    const transformedQuestions: any = [];

    Object.entries(response).forEach(([partKey, questions], index) => {
        const partNumber = index + 1;

        if (partKey === 'part2') {
            (questions as QuestionWithPrompt[]).forEach((q) => {
                transformedQuestions.push({
                    assignmentId,
                    type: 'PROMPT',
                    topic: q.topic,
                    text: q.prompt,
                    part: partNumber,
                });

                transformedQuestions.push({
                    assignmentId,
                    topic: q.topic,
                    part: partNumber,
                    type: 'QUESTION',
                    text: q.question,
                });
            });
        } else {
            (questions as Question[]).forEach((q) => {
                q.questions.forEach((questionText) => {
                    transformedQuestions.push({
                        assignmentId,
                        topic: q.topic,
                        part: partNumber,
                        type: 'QUESTION',
                        text: questionText,
                    });
                });
            });
        }
    });

    return transformedQuestions;
}

export function transformPrismaQuestionsToResponse(
    questions: QuestionEntity[],
): QuestionsResponse {
    const response: QuestionsResponse = {
        part1: [],
        part2: [],
        part3: [],
    };

    const groupedByPart: Record<number, QuestionEntity[]> = questions.reduce(
        (acc, question) => {
            if (!acc[question.part]) {
                acc[question.part] = [];
            }
            acc[question.part].push(question);
            return acc;
        },
        {} as Record<number, Question[]>,
    );

    Object.entries(groupedByPart).forEach(([part, partQuestions]) => {
        if (parseInt(part) === 2) {
            const prompts: Record<string, QuestionWithPrompt> = {};

            partQuestions.forEach((q) => {
                if (q.type === 'PROMPT') {
                    prompts[q.topic] = { question: '', prompt: q.text, topic: q.topic };
                } else if (q.type === 'QUESTION') {
                    if (prompts[q.topic]) {
                        prompts[q.topic].question = q.text;
                    } else {
                        prompts[q.topic] = {
                            prompt: '',
                            topic: q.topic,
                            question: q.text,
                        };
                    }
                }
            });

            response.part2 = Object.values(prompts);
        } else {
            const topicMap: Record<string, Question> = {};

            partQuestions.forEach((q) => {
                if (!topicMap[q.topic]) {
                    topicMap[q.topic] = { questions: [], topic: q.topic };
                }
                topicMap[q.topic].questions.push(q.text);
            });

            if (parseInt(part) === 1) {
                response.part1 = Object.values(topicMap);
            } else if (parseInt(part) === 3) {
                response.part3 = Object.values(topicMap);
            }
        }
    });

    return response;
}
