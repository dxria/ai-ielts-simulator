'use client';

import React, { createContext, useContext, useState } from 'react';

import { AssignmentAnswerInput } from '@/api/dto';
// import { useLocalStorage } from '@/hooks/use-local-storage';

type AssignmentContextProps = {
    children: React.ReactNode;
};

type AssignmentContextValue = {
    answers: AssignmentAnswerInput;
    enabled: boolean;
    setAnswers: React.Dispatch<React.SetStateAction<AssignmentAnswerInput>>;
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
    started: boolean;
};

const AssignmentContext = createContext<AssignmentContextValue | null>(null);

export function useAssignmentContext() {
    const context = useContext(AssignmentContext);

    if (!context) {
        throw new Error('AssignmentContext in not available');
    }

    return context;
}

export function AssignmentProvider({ children }: AssignmentContextProps) {
    const [enabled, setEnabled] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);
    const [answers, setAnswers] = useState<AssignmentAnswerInput>({});

    const value: AssignmentContextValue = {
        enabled,
        started,
        answers,
        setEnabled,
        setStarted,
        setAnswers,
    };

    return (
        <AssignmentContext.Provider value={value}>{children}</AssignmentContext.Provider>
    );
}
