import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import {
    Box,
    Button,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import { useCreateSession } from '@/api/hooks';
import { SubmitButton } from '@/components/form/submit-button';
import { Modal, useModalState } from '@/components/modal';

export default function AddSession() {
    const modalState = useModalState();

    const [difficulty, setDifficulty] = useState<string>('easy');

    const { user } = useUser();
    const { loading, createSession } = useCreateSession();

    const handleDifficulty = (
        event: React.MouseEvent<HTMLElement>,
        newDifficulty: string | null,
    ) => {
        if (newDifficulty !== null) {
            setDifficulty(newDifficulty);
        }
    };

    return (
        <Box>
            <Button variant='contained' onClick={modalState.triggerOpen}>
                Add new session
            </Button>
            <Modal
                maxWidth='md'
                open={modalState.open}
                title='Add new session'
                onClose={modalState.triggerClose}>
                <Stack gap={2} alignItems='center'>
                    <Typography> Choose the difficulty level</Typography>
                    <ToggleButtonGroup
                        exclusive
                        value={difficulty}
                        onChange={handleDifficulty}>
                        <ToggleButton value='easy' aria-label='left aligned'>
                            Easy
                        </ToggleButton>
                        <ToggleButton value='medium' aria-label='centered'>
                            Medium
                        </ToggleButton>
                        <ToggleButton value='hard' aria-label='right aligned'>
                            Hard
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack spacing={2} direction='row' justifyContent='flex-end'>
                    <Button variant='text' onClick={modalState.triggerClose}>
                        cancel
                    </Button>
                    <SubmitButton
                        submitting={loading}
                        onClick={async () => {
                            const input = { difficulty, userId: user?.id ?? '' };
                            await createSession(input);
                            modalState.triggerClose();
                        }}>
                        {loading ? 'creating' : 'create'}
                    </SubmitButton>
                </Stack>
            </Modal>
        </Box>
    );
}
