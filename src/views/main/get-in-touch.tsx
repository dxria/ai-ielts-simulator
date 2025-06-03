'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { contact } from '@/api/actions';
import { ContactInput } from '@/api/dto';
import { SubmitButton } from '@/components/form/submit-button';
import { Icon } from '@/components/icon';
import { Modal, useModalState } from '@/components/modal';

export default function GetInTouch() {
    const t = useTranslations('main.get-in-touch');
    const modalState = useModalState();
    const [success, setSuccess] = useState(false);

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactInput>({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const getFieldState = (name: keyof ContactInput) => {
        const error = errors[name];

        return { error: !!error };
    };

    return (
        <Stack
            mt={30}
            gap={4}
            id='get-in-touch'
            alignItems='center'
            sx={{ scrollMarginTop: 100 }}>
            <Typography variant='h2' textAlign='center'>
                Let’s Get in Touch
            </Typography>
            <Box
                borderRadius={{ xs: 5, sm: 10 }}
                width={{
                    xs: '100%',
                    sm: 'fit-content',
                }}>
                <form
                    onSubmit={handleSubmit(async (values) => {
                        const res = await contact(values);
                        console.log(res);
                        setSuccess(res.success);
                        modalState.triggerOpen();
                        reset();
                    })}>
                    <Stack
                        width='100%'
                        alignItems='center'
                        p={{ xs: 3, sm: 6 }}
                        gap={{ xs: 3, sm: 5 }}>
                        <Stack
                            gap={{
                                xs: 2,
                                sm: 3,
                            }}>
                            <Box
                                display='flex'
                                gap={{
                                    xs: 2,
                                    sm: 3,
                                }}
                                flexDirection={{
                                    sm: 'column',
                                    xs: 'column',
                                }}
                                width={{
                                    sm: 500,
                                    md: 650,
                                    xs: '100%',
                                }}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{
                                        required: true,
                                        maxLength: {
                                            value: 100,
                                            message: t('form.too-long-validation-helper'),
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            placeholder={t('form.name-placeholder')}
                                            {...getFieldState(field.name)}
                                        />
                                    )}
                                />
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{
                                        required: true,
                                        pattern: {
                                            message: t('form.email-validation-helper'),
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            placeholder={t('form.email-placeholder')}
                                            onFocus={() => {
                                                if (!field.value.includes('@')) {
                                                    field.onChange(
                                                        field.value + '@gmail.com',
                                                    );
                                                }
                                            }}
                                            {...getFieldState(field.name)}
                                        />
                                    )}
                                />
                            </Box>
                            <Controller
                                name='message'
                                control={control}
                                rules={{
                                    required: true,
                                    maxLength: {
                                        value: 1000,
                                        message: t('form.too-long-validation-helper'),
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        rows={6}
                                        placeholder={t('form.message-placeholder')}
                                        {...getFieldState(field.name)}
                                    />
                                )}
                            />
                            <Controller
                                name='agreement'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-asterisk': {
                                                display: 'none',
                                            },
                                        }}
                                        label={
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: 'black',
                                                    textDecoration: 'underline',
                                                }}>
                                                {t('form.personal-data')}
                                            </Typography>
                                        }
                                        control={
                                            <Checkbox
                                                disableRipple
                                                checked={field.value === 'true'}
                                                checkedIcon={
                                                    <Icon size={24} name='checked-box' />
                                                }
                                                icon={
                                                    <Icon
                                                        size={24}
                                                        name='unchecked-box'
                                                        color={
                                                            errors?.agreement
                                                                ? 'error.main'
                                                                : 'divider'
                                                        }
                                                    />
                                                }
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.checked.toString(),
                                                    )
                                                }
                                            />
                                        }
                                    />
                                )}
                            />
                        </Stack>
                        <SubmitButton
                            variant='contained'
                            disabled={isSubmitting}
                            sx={{
                                width: '100%',
                                padding: '13px 30px',
                            }}>
                            {t('form.send-button')}
                        </SubmitButton>
                    </Stack>
                </form>

                <Modal
                    maxWidth='sm'
                    open={modalState.open}
                    title={t(`dialog.success-${success}.title`)}
                    onClose={modalState.triggerClose}>
                    <Typography align='left' variant='body2'>
                        {t(`dialog.success-${success}.content`)}
                    </Typography>
                </Modal>
            </Box>
        </Stack>
    );
}
