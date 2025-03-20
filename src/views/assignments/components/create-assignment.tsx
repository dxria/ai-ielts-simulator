import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useUser } from '@clerk/nextjs';
import {
    Box,
    Button,
    Stack,
    styled,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import { useCreateAssignment } from '@/api/hooks';
import { SubmitButton } from '@/components/form/submit-button';
import { Icon } from '@/components/icon';
import { Modal, useModalState } from '@/components/modal';

const StyledButton = styled(ToggleButton)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderRadius: theme.spacing(3),
    color: theme.palette.text.disabled,
    borderColor: theme.palette.secondary.a20,
    '&:hover': {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.a20,
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.a10,
        '&:hover': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.a20,
        },
    },
}));

export default function CreateAssignment() {
    const t = useTranslations();
    const modalState = useModalState();

    const [difficulty, setDifficulty] = useState<string>('easy');

    const { user } = useUser();
    const { loading, createAssignment } = useCreateAssignment();

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
            <Button
                variant='contained'
                sx={{ gap: 1, display: 'flex', alignItems: 'center' }}
                onClick={modalState.triggerOpen}>
                <Icon name='plus' />
                <Typography variant='body2' color='white!important'>
                    {t('assignments.button')}
                </Typography>
            </Button>

            <Modal
                maxWidth='md'
                open={modalState.open}
                title={t('assignments.button')}
                onClose={modalState.triggerClose}>
                <Stack gap={2} alignItems='center'>
                    <Typography> Choose the difficulty level</Typography>
                    <ToggleButtonGroup
                        exclusive
                        value={difficulty}
                        onChange={handleDifficulty}>
                        <StyledButton value='easy'>{t('level.easy')}</StyledButton>
                        <StyledButton value='medium'>{t('level.medium')}</StyledButton>
                        <StyledButton value='hard'>{t('level.hard')}</StyledButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack spacing={2} direction='row' justifyContent='flex-end'>
                    <Button variant='text' onClick={modalState.triggerClose}>
                        {t('action.cancel')}
                    </Button>
                    <SubmitButton
                        submitting={loading}
                        onClick={async () => {
                            const input = { difficulty, userId: user?.id ?? '' };
                            await createAssignment(input);
                            modalState.triggerClose();
                        }}>
                        {loading ? t('action.creating') : t('action.create')}
                    </SubmitButton>
                </Stack>
            </Modal>
        </Box>
    );
}
