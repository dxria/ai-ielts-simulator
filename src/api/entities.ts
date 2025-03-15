export type Assignment = {
    createdAt: Date;
    difficulty: 'easy' | 'medium' | 'hard';
    id: number;
    questions: QuestionsResponse;
    updatedAt: Date;
    user: string;
};

export type QuestionsResponse = {
    part1: Question[];
    part2: QuestionWithPrompt[];
    part3: Question[];
};

export type QuestionWithPrompt = {
    prompt: string;
    question: string;
    topic: string;
};

export type Question = {
    questions: string[];
    topic: string;
};
