'use client';
import { useState } from 'react';

import {
    Backdrop,
    Dialog,
    DialogContent,
    type DialogProps,
    DialogTitle,
    IconButton,
} from '@mui/material';

import { Icon } from '@/components/icon';

export type BaseModalProps = {
    onClose(): void;
    open: boolean;
};

type ModalProps = BaseModalProps & {
    maxWidth?: DialogProps['maxWidth'];
    title: React.ReactNode;
};

export function useModalState() {
    const [open, setOpen] = useState<boolean>(false);

    const triggerOpen = () => setOpen(true);
    const triggerClose = () => setOpen(false);
    const triggerToggle = () => setOpen((p) => !p);

    return {
        open,
        triggerOpen,
        triggerClose,
        triggerToggle,
    };
}

export function Modal({
    open,
    title,
    onClose,
    children,
    maxWidth = 'md',
}: React.PropsWithChildren<ModalProps>) {
    return (
        <Dialog
            fullWidth
            disableRestoreFocus
            open={open}
            maxWidth={maxWidth}
            slots={{
                backdrop: () => (
                    <Backdrop
                        open={open}
                        sx={{
                            backgroundColor: '#090F4E20',
                        }}
                        onClick={onClose}
                    />
                ),
            }}
            PaperProps={{
                sx: {
                    gap: 2,
                    width: '100%',
                    boxShadow: 'none',
                    borderRadius: { xs: 5, sm: 7 },
                    p: {
                        xs: 3,
                        sm: 5,
                    },
                    m: {
                        xs: 3,
                        sm: 6,
                        md: 8,
                    },
                },
            }}
            onClose={onClose}>
            <IconButton
                sx={{
                    p: 0,
                    position: 'absolute',
                    top: { xs: 16, sm: 24 },
                    right: { xs: 16, sm: 24 },
                }}
                onClick={onClose}>
                <Icon size={22} name='close' />
            </IconButton>

            <DialogTitle sx={{ padding: 0, textAlign: 'center' }}>{title}</DialogTitle>

            <DialogContent sx={{ padding: 0, fontWeight: 200, textAlign: 'center' }}>
                {children}
            </DialogContent>
        </Dialog>
    );
}
