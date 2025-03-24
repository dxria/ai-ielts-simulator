export type Assignment = {
    createdAt: Date;
    difficulty: 'easy' | 'medium' | 'hard';
    id: number;
    questions: QuestionsResponse;
    updatedAt: Date;
    user: string;
};

export type QuestionsAIResponse = {
    part1: {
        questions: string[];
        topic: string;
    }[];
    part2: {
        prompt: string;
        question: string;
        topic: string;
    }[];
    part3: {
        questions: string[];
        topic: string;
    }[];
};
export type QuestionsResponse = {
    part1: RegularQuestion[];
    part2: QuestionWithPrompt[];
    part3: RegularQuestion[];
};
export type QuestionWithPrompt = {
    id: number;
    prompt: string;
    question: string;
    topic: string;
};
export type RegularQuestion = {
    questions: Question[];
    topic: string;
};

export type Question = {
    id: number;
    question: string;
};
