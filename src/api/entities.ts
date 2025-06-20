export type Assignment = {
    createdAt: Date;
    difficulty: 'easy' | 'medium' | 'hard';
    id: number;
    performances: Performance[];
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
    answer?: string;
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
    answer?: string;
    id: number;
    question: string;
};

export type Feedback = {
    overall_feedback: string;
    part1: FeedbackPart;
    part2: FeedbackPart;
    part3: FeedbackPart;
};

export type FeedbackPart =
    | { questions: FeedbackQuestion[]; topic: string }
    | (FeedbackQuestion & { topic: string });

export type FeedbackQuestion = {
    answer: string;
    comments: string;
    fluency_and_coherence: string;
    grammatical_range_and_accuracy: string;
    id: number;
    lexical_resource: string;
    question: string;
};

export type Evaluation = {
    createdAt: string;
    feedback: string;
    id: number;
    performanceId: number;
    updatedAt: string;
    user: string;
};

export type Performance = {
    assignmentId: number;
    createdAt: string;
    endTime: string;
    evaluation?: Evaluation;
    id: number;
    startTime: string;
    updatedAt: string;
    user: string;
};
