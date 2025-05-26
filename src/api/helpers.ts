import { Answer as AnswerEntity, Question as QuestionEntity } from '@prisma/client';

import {
    QuestionsAIResponse,
    QuestionsResponse,
    QuestionWithPrompt,
    RegularQuestion,
} from './entities';

export function transformQuestionsResponseToPrisma(
    response: QuestionsAIResponse,
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
            (
                questions as {
                    questions: string[];
                    topic: string;
                }[]
            ).forEach((q) => {
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
            acc[question.part] ??= [];
            acc[question.part].push(question);
            return acc;
        },
        {} as Record<number, QuestionEntity[]>,
    );

    Object.entries(groupedByPart).forEach(([part, partQuestions]) => {
        if (parseInt(part) === 2) {
            const prompts: Record<string, QuestionWithPrompt> = {};

            partQuestions.forEach((q) => {
                if (q.type === 'PROMPT') {
                    prompts[q.topic] = {
                        id: q.id,
                        question: '',
                        prompt: q.text,
                        topic: q.topic,
                    };
                } else if (q.type === 'QUESTION') {
                    if (prompts[q.topic]) {
                        prompts[q.topic].question = q.text;
                        prompts[q.topic].id = q.id;
                    } else {
                        prompts[q.topic] = {
                            id: q.id,
                            prompt: '',
                            topic: q.topic,
                            question: q.text,
                        };
                    }
                }
            });

            response.part2 = Object.values(prompts);
        } else {
            const topicMap: Record<string, RegularQuestion> = {};

            partQuestions.forEach((q) => {
                if (!topicMap[q.topic]) {
                    topicMap[q.topic] = { questions: [], topic: q.topic };
                }
                topicMap[q.topic].questions.push({ id: q.id, question: q.text });
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

export function transformPrismaQuestionsToResponseWithAnswers(
    questions: QuestionEntity[],
    answers: AnswerEntity[],
): QuestionsResponse {
    const response: QuestionsResponse = {
        part1: [],
        part2: [],
        part3: [],
    };

    const answerMap: Record<number, string> = answers.reduce(
        (acc, answer) => {
            acc[answer.questionId] = answer.speech;
            return acc;
        },
        {} as Record<number, string>,
    );

    const groupedByPart: Record<number, QuestionEntity[]> = questions.reduce(
        (acc, question) => {
            acc[question.part] ??= [];
            acc[question.part].push(question);
            return acc;
        },
        {} as Record<number, QuestionEntity[]>,
    );

    Object.entries(groupedByPart).forEach(([part, partQuestions]) => {
        if (parseInt(part) === 2) {
            const prompts: Record<string, QuestionWithPrompt> = {};

            partQuestions.forEach((q) => {
                if (q.type === 'PROMPT') {
                    prompts[q.topic] = {
                        id: q.id,
                        question: '',
                        prompt: q.text,
                        topic: q.topic,
                    };
                } else if (q.type === 'QUESTION') {
                    if (prompts[q.topic]) {
                        prompts[q.topic].question = q.text;
                        prompts[q.topic].id = q.id;
                        prompts[q.topic].answer = answerMap[q.id] || '';
                    } else {
                        prompts[q.topic] = {
                            id: q.id,
                            prompt: '',
                            topic: q.topic,
                            question: q.text,
                            answer: answerMap[q.id] || '',
                        };
                    }
                }
            });

            response.part2 = Object.values(prompts);
        } else {
            const topicMap: Record<string, RegularQuestion> = {};

            partQuestions.forEach((q) => {
                if (!topicMap[q.topic]) {
                    topicMap[q.topic] = { questions: [], topic: q.topic };
                }
                topicMap[q.topic].questions.push({
                    id: q.id,
                    question: q.text,
                    answer: answerMap[q.id] || '',
                });
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
