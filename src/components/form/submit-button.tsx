import { Button, type ButtonProps, CircularProgress } from '@mui/material';

type SubmitButtonProps = ButtonProps & { submitting?: boolean };

export function SubmitButton({
    children,
    disabled,
    submitting,
    ...props
}: SubmitButtonProps) {
    return (
        <Button
            variant='contained'
            {...props}
            type='submit'
            disabled={disabled || submitting}>
            {submitting && (
                <CircularProgress size={16} color='inherit' sx={{ mr: 1.5 }} />
            )}
            {children}
        </Button>
    );
}
