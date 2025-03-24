export type CreateAssignmentInput = { difficulty: string; userId: string };

export type GetAssignmentInput = { assignmentId: number; userId: string };

export type ContactInput = {
    agreement: string;
    email: string;
    message: string;
    name: string;
};

export type AssignmentAnswerInput = Record<number, string>;
