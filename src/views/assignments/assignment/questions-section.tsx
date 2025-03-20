import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Stack, Typography } from '@mui/material';

import { QuestionsResponse } from '@/api/entities';
import { PageHeader } from '@/components/page-header';

type QuestionsSectionProps = {
    questions: QuestionsResponse;
};

function QuestionTypography({
    text,
    active,
    onClick,
    question,
}: {
    active: string;
    onClick(): void;
    question: string;
    text: string;
}) {
    return (
        <Typography
            variant='body2'
            sx={(theme) => ({
                width: 110,
                padding: theme.spacing(0.5, 2),
                borderRadius: theme.spacing(3),
                transition: (theme) => theme.transitions.create('all'),
                backgroundColor: question === active ? 'primary.main' : '#fff',
                color:
                    question === active
                        ? 'white !important'
                        : `${theme.palette.text.primary} !important`,
            })}
            onClick={onClick}>
            {text}
        </Typography>
    );
}

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
    const t = useTranslations();
    const [active, setActive] = useState<string>(questions.part1[0].questions[0]);

    return (
        <Stack p={3}>
            <PageHeader back backHref='/assignment' title={t('assignments.title')} />
            <Stack gap={1}>
                <Typography variant='body1' fontWeight={500}>
                    Part 1: {questions.part1[0].topic}, {questions.part1[1].topic},{' '}
                    {questions.part1[2].topic}
                </Typography>
                {questions.part1.map((topic1) => (
                    <Stack key={topic1.topic} gap={0.5}>
                        <Typography variant='body2'>Topic 1: {topic1.topic}</Typography>
                        <Stack gap={1} direction='row'>
                            {topic1.questions.map((q, idx) => (
                                <QuestionTypography
                                    key={q}
                                    question={q}
                                    active={active}
                                    text={`Question ${idx + 1}`}
                                    onClick={() => setActive(q)}
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
                        <Typography variant='body2'>Topic 1: {topic1.topic}</Typography>
                        <QuestionTypography
                            key={topic1.question}
                            active={active}
                            text={`Question ${1}`}
                            question={topic1.question}
                            onClick={() => setActive(topic1.question)}
                        />
                    </Stack>
                ))}
                <Typography variant='body1' fontWeight={500}>
                    Part 3: {questions.part3[0].topic}
                </Typography>
                {questions.part3.map((topic1) => (
                    <Stack key={topic1.topic} gap={0.5}>
                        <Typography variant='body2'>Topic 1: {topic1.topic}</Typography>
                        <Stack gap={1} direction='row'>
                            {topic1.questions.map((q, idx) => (
                                <QuestionTypography
                                    key={q}
                                    question={q}
                                    active={active}
                                    text={`Question ${idx + 1}`}
                                    onClick={() => setActive(q)}
                                />
                            ))}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}
