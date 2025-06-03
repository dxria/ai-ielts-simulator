import { Typography } from '@mui/material';

import { Icon } from '@/components/icon';
import { useAssignmentContext } from '@/providers/assignment/assignment-provider';

export function QuestionChip({
    text,
    onClick,
    activeId,
    questionId,
}: Readonly<{
    activeId: number;
    onClick(): void;
    questionId: number;
    text: string;
}>) {
    const { answers } = useAssignmentContext();

    const isDone = Object.entries(answers).find(
        ([key, value]) => +key === questionId && value,
    );

    return (
        <Typography
            gap={1}
            display='flex'
            variant='body2'
            sx={(theme) => ({
                width: isDone ? 135 : 110,
                padding: theme.spacing(0.5, 2),
                borderRadius: theme.spacing(3),
                cursor: isDone ? 'auto' : 'pointer',
                transition: (theme) => theme.transitions.create('all'),
                backgroundColor:
                    questionId === activeId
                        ? 'primary.main'
                        : isDone
                          ? 'primary.a20'
                          : '#fff',
                color:
                    questionId === activeId
                        ? 'white !important'
                        : isDone
                          ? `${theme.palette.text.disabled} !important`
                          : `${theme.palette.text.primary} !important`,
            })}
            onClick={() => (isDone ? undefined : onClick())}>
            {text}
            {isDone && <Icon name='check' />}
        </Typography>
    );
}
