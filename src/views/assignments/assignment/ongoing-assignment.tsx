'use client';

import { useEffect, useState } from 'react';
import useSpeechToText, { ResultType } from 'react-hook-speech-to-text';

import { useLocale, useTranslations } from 'next-intl';

import { useUser } from '@clerk/nextjs';
import { Stack } from '@mui/material';

import { AssignmentAnswerInput } from '@/api/dto';
import { Question, QuestionsResponse, QuestionWithPrompt } from '@/api/entities';
import { useGetEvaluated, useSaveAnswers, useSavePerformance } from '@/api/hooks';
import { PageHeader } from '@/components/page-header';
import { redirect } from '@/intl/navigation';
import { useAssignmentContext } from '@/providers/assignment/assignment-provider';

import QuestionRecordTab from './question-record-tab';
import QuestionsTab from './questions-tab';

type OngoingAssignmentProps = { assignmentId: number; questions: QuestionsResponse };

export default function OngoingAssignment({
    questions,
    assignmentId,
}: OngoingAssignmentProps) {
    const t = useTranslations();
    const [active, setActive] = useState<Question | QuestionWithPrompt>(
        questions.part1[0].questions[0],
    );
    const startTime = new Date();

    const { user } = useUser();
    const locale = useLocale();
    const { results, setResults, isRecording, stopSpeechToText, startSpeechToText } =
        useSpeechToText({ continuous: true, useLegacyResults: false });

    const { answers, setAnswers } = useAssignmentContext();
    const { savePerformance, loading: loading1 } = useSavePerformance();
    const { saveAnswers, loading: loading2 } = useSaveAnswers();
    const { getEvaluated, loading: loading3 } = useGetEvaluated();

    useEffect(() => {
        setAnswers((prev: AssignmentAnswerInput) => {
            return {
                ...prev,
                [active.id]: (results as ResultType[]).map((r) => r.transcript).join(' '),
            };
        });
    }, [active.id, results, setAnswers]);

    if (!user) return null;

    const handleChangeQuestion = (v: Question | QuestionWithPrompt) => {
        setActive(v);
        stopSpeechToText();
        setResults([]);
    };

    const handleFinish = async () => {
        // save performance
        const performance = await savePerformance({
            startTime,
            assignmentId,
            userId: user?.id,
            endTime: new Date(),
        });
        // save answers
        await saveAnswers({
            answers,
            assignmentId,
            userId: user?.id,
            performanceId: performance.id,
        });
        // get evaluation and save it
        await getEvaluated({
            assignmentId,
            userId: user?.id,
            performanceId: performance.id,
        });
        redirect({ locale, href: `/stats/${performance.id}` });
    };

    return (
        <Stack p={3}>
            <PageHeader back backHref='/assignment' title={t('assignments.title')} />
            <Stack gap={10} direction='row'>
                <QuestionsTab
                    active={active}
                    questions={questions}
                    onClick={(q) => handleChangeQuestion(q)}
                />
                <QuestionRecordTab
                    active={active}
                    handleFinish={handleFinish}
                    saving={loading1 || loading2 || loading3}
                    record={{ isRecording, stopSpeechToText, startSpeechToText }}
                />
            </Stack>
        </Stack>
    );
}
