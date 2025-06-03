import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

import { Question, QuestionWithPrompt } from '@/api/entities';
import { Icon } from '@/components/icon';
import { useAssignmentContext } from '@/providers/assignment/assignment-provider';

import WebCam from './web-cam';
type QuestionsTabProps = {
    active: Question | QuestionWithPrompt;
    handleFinish(): void;
    record: { isRecording: boolean; startSpeechToText(): void; stopSpeechToText(): void };
    saving: boolean;
};

export default function QuestionRecordTab({
    active,
    saving,
    record,
    handleFinish,
}: Readonly<QuestionsTabProps>) {
    const { enabled, setEnabled } = useAssignmentContext();

    return (
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
                    onClick={
                        record.isRecording
                            ? record.stopSpeechToText
                            : record.startSpeechToText
                    }>
                    {record.isRecording ? 'Stop Recording' : 'Record answer'}
                </Button>
                <Button
                    variant='outlined'
                    sx={{
                        width: '100%',
                        color: 'error.main',
                        border: (theme) => `1px solid ${theme.palette.error.main}`,
                    }}
                    onClick={handleFinish}>
                    {saving && (
                        <CircularProgress size={16} color='inherit' sx={{ mr: 1.5 }} />
                    )}
                    {'Finish assignment'}
                </Button>
            </Stack>
        </Stack>
    );
}
