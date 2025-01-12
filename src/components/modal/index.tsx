"use client";
import {
    type DialogProps,
    Dialog,
    DialogContent,
    DialogTitle,
    Backdrop,
    IconButton,
} from "@mui/material";
import { useState } from "react";
import { Icon } from "@/components/icon";

export type BaseModalProps = {
    onClose(): void;
    open: boolean;
};

type ModalProps = BaseModalProps & {
    maxWidth?: DialogProps["maxWidth"];
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
    onClose,
    title,
    children,
    maxWidth = "md",
}: React.PropsWithChildren<ModalProps>) {
    return (
        <Dialog
            fullWidth
            disableRestoreFocus
            open={open}
            maxWidth={maxWidth}
            PaperProps={{
                sx: {
                    borderRadius: { xs: 5, sm: 10 },
                    boxShadow: "none",
                    p: {
                        xs: 3,
                        sm: 5,
                    },
                    m: {
                        xs: 3,
                        sm: 6,
                        md: 8,
                    },
                    width: "100%",
                    gap: 2,
                },
            }}
            slots={{
                backdrop: () => (
                    <Backdrop
                        open={open}
                        onClick={onClose}
                        sx={{
                            backgroundColor: "#090F4E20",
                        }}
                    />
                ),
            }}
            onClose={onClose}>
            <IconButton
                onClick={onClose}
                sx={{
                    position: "absolute",
                    right: { xs: 16, sm: 24 },
                    top: { xs: 16, sm: 24 },
                    p: 0,
                }}>
                <Icon size={22} name="close" />
            </IconButton>

            <DialogTitle sx={{ textAlign: "center", padding: 0 }}>
                {title}
            </DialogTitle>

            <DialogContent
                sx={{ textAlign: "center", padding: 0, fontWeight: 200 }}>
                {children}
            </DialogContent>
        </Dialog>
    );
}
