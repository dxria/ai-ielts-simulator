export type CreateAssignmentInput = { difficulty: string; userId: string };

export type GetAssignmentInput = { assignmentId: number; userId: string };

export type ContactInput = {
    agreement: string;
    email: string;
    message: string;
    name: string;
};

export type AssignmentAnswerInput = Record<number, string>;

export type SavePerformanceInput = {
    assignmentId: number;
    endTime: Date;
    startTime: Date;
    userId: string;
};

export type SaveAnswersInput = {
    answers: AssignmentAnswerInput;
    assignmentId: number;
    performanceId: number;
    userId: string;
};

export type GetEvaluatedInput = {
    assignmentId: number;
    performanceId: number;
    userId: string;
};

export type GetPerformanceInput = {
    performanceId: number;
    userId: string;
};
