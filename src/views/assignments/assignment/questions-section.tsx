'use client';

import { useEffect, useState } from 'react';
import useSpeechToText, { ResultType } from 'react-hook-speech-to-text';

import { useTranslations } from 'next-intl';

import { Box, Button, Stack, Typography } from '@mui/material';

import { AssignmentAnswerInput } from '@/api/dto';
import { Question, QuestionsResponse, QuestionWithPrompt } from '@/api/entities';
import { Icon } from '@/components/icon';
import { PageHeader } from '@/components/page-header';
import { useAssignmentContext } from '@/providers/assignment/assignment-provider';

import { QuestionChip } from './question-chip';
import WebCam from './web-cam';

type QuestionsSectionProps = { questions: QuestionsResponse };

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
    const t = useTranslations();
    const [active, setActive] = useState<Question | QuestionWithPrompt>(
        questions.part1[0].questions[0],
    );
    const startTime = new Date();

    const { enabled, setEnabled, setAnswers } = useAssignmentContext();
    const { results, setResults, isRecording, stopSpeechToText, startSpeechToText } =
        useSpeechToText({
            continuous: true,
            useLegacyResults: false,
        });

    useEffect(() => {
        setAnswers((prev: AssignmentAnswerInput) => {
            return {
                ...prev,
                [active.id]: (results as ResultType[]).map((r) => r.transcript).join(' '),
            };
        });
    }, [active.id, results, setAnswers]);
    const handleChangeQuestion = (v: Question | QuestionWithPrompt) => {
        setActive(v);
        stopSpeechToText();
        setResults([]);
    };

    const handleFinish = () => {
        const finishTime = new Date();

        console.log(startTime, finishTime);
        // save performance

        // save answers

        // get evaluation and save it
    };

    return (
        <Stack p={3}>
            <PageHeader back backHref='/assignment' title={t('assignments.title')} />
            <Stack gap={10} direction='row'>
                <Stack gap={1}>
                    <Typography variant='body1' fontWeight={500}>
                        Part 1: {questions.part1[0].topic}, {questions.part1[1].topic},{' '}
                        {questions.part1[2].topic}
                    </Typography>
                    {questions.part1.map((topic1) => (
                        <Stack key={topic1.topic} gap={0.5}>
                            <Typography variant='body2'>
                                Topic 1: {topic1.topic}
                            </Typography>
                            <Stack gap={1} direction='row'>
                                {topic1.questions.map((q, idx) => (
                                    <QuestionChip
                                        key={q.id}
                                        questionId={q.id}
                                        activeId={active.id}
                                        text={`Question ${idx + 1}`}
                                        onClick={() => handleChangeQuestion(q)}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    ))}
                    <Typography variant='body1' fontWeight={500}>
                        Part 2: {questions.part2[0].topic}
                    </Typography>
                    {questions.part2.map((topic1) => (
                        <Stack key={topic1.topic} gap={0.5}>
                            <Typography variant='body2'>
                                Topic 1: {topic1.topic}
                            </Typography>
                            <QuestionChip
                                key={topic1.id}
                                activeId={active.id}
                                text={`Question ${1}`}
                                questionId={topic1.id}
                                onClick={() => handleChangeQuestion(topic1)}
                            />
                        </Stack>
                    ))}
                    <Typography variant='body1' fontWeight={500}>
                        Part 3: {questions.part3[0].topic}
                    </Typography>
                    {questions.part3.map((topic1) => (
                        <Stack key={topic1.topic} gap={0.5}>
                            <Typography variant='body2'>
                                Topic 1: {topic1.topic}
                            </Typography>
                            <Stack gap={1} direction='row'>
                                {topic1.questions.map((q, idx) => (
                                    <QuestionChip
                                        key={q.id}
                                        questionId={q.id}
                                        activeId={active.id}
                                        text={`Question ${idx + 1}`}
                                        onClick={() => handleChangeQuestion(q)}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    ))}
                    <Stack
                        p={2}
                        mt={2}
                        maxWidth={400}
                        borderRadius={3}
                        height='fit-content'
                        bgcolor={(theme) => theme.palette.secondary.a20}
                        border={(theme) => `2px solid ${theme.palette.secondary.main}`}>
                        <Box gap={1} display='flex' alignItems='center'>
                            <Icon name='lightbulb' />
                            <Typography variant='body1'>Information</Typography>
                        </Box>
                        <Typography variant='body2'>
                            Turn on the microphone to start recording your answer and turn
                            it off, once the you finish answering this particular answer.
                            Program will save the answer and proceed to next question.
                            NOTE: your video is not filmed and you can turn it of any
                            minute you want.
                        </Typography>
                    </Stack>
                </Stack>
                <Stack gap={2} width='100%'>
                    <Stack
                        p={2}
                        borderRadius={3}
                        border='2px solid transparent'
                        sx={{
                            background: `linear-gradient(white, white) padding-box, linear-gradient(.04deg, #4FD1C5 .04%, rgba(237,135,4,0) 99.97%) border-box`,
                        }}>
                        <Box gap={1} display='flex' alignItems='center'>
                            <Icon size={22} name='question' />
                            <Typography variant='h6'>Question</Typography>
                        </Box>
                        <Typography variant='body1'>{active.question}</Typography>
                        {'prompt' in active && active.prompt && (
                            <Typography variant='body2' sx={{ whiteSpace: 'pre-line' }}>
                                {active.prompt}
                            </Typography>
                        )}
                    </Stack>

                    <Stack>
                        <WebCam
                            enabled={enabled}
                            onEnable={() => setEnabled(true)}
                            onDisable={() => setEnabled(false)}
                        />
                    </Stack>

                    <Stack gap={2} width='100%' direction='row'>
                        <Button
                            variant='outlined'
                            sx={{ width: '100%' }}
                            onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                            {isRecording ? 'Stop Recording' : 'Record answer'}
                        </Button>
                        <Button
                            variant='outlined'
                            sx={{
                                width: '100%',
                                color: 'error.main',
                                border: (theme) =>
                                    `1px solid ${theme.palette.error.main}`,
                            }}
                            onClick={handleFinish}>
                            {'Finish assignment'}
                        </Button>
                    </Stack>

                    <Typography variant='body2'>
                        {(results as ResultType[]).map((result) => result.transcript)}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
