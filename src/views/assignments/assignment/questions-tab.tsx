import { Box, Stack, Typography } from '@mui/material';

import { Question, QuestionsResponse, QuestionWithPrompt } from '@/api/entities';
import { Icon } from '@/components/icon';

import { QuestionChip } from './question-chip';

type QuestionsTabProps = {
    active: Question | QuestionWithPrompt;
    onClick(v: Question | QuestionWithPrompt): void;
    questions: QuestionsResponse;
};

export default function QuestionsTab({ active, onClick, questions }: QuestionsTabProps) {
    return (
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
                            <QuestionChip
                                key={q.id}
                                questionId={q.id}
                                activeId={active.id}
                                text={`Question ${idx + 1}`}
                                onClick={() => onClick(q)}
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
                    <QuestionChip
                        key={topic1.id}
                        activeId={active.id}
                        text={`Question ${1}`}
                        questionId={topic1.id}
                        onClick={() => onClick(topic1)}
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
                            <QuestionChip
                                key={q.id}
                                questionId={q.id}
                                activeId={active.id}
                                text={`Question ${idx + 1}`}
                                onClick={() => onClick(q)}
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
                    Turn on the microphone to start recording your answer and turn it off,
                    once the you finish answering this particular answer. Program will
                    save the answer and proceed to next question. NOTE: your video is not
                    filmed and you can turn it of any minute you want.
                </Typography>
            </Stack>
        </Stack>
    );
}
