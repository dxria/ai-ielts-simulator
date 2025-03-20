import { IconButton, Stack, Typography } from '@mui/material';

import { Icon } from '@/components/icon';
import { UniversalLink } from '@/components/universal-link';

type PageHeaderProps = {
    back?: boolean;
    backHref?: string;
    right?: React.ReactNode;
    title: React.ReactNode;
};

export function PageTitle({ children }: React.PropsWithChildren) {
    return (
        <Typography variant='h5' fontWeight='600'>
            {children}
        </Typography>
    );
}

export function PageHeader({ back, title, right, backHref }: PageHeaderProps) {
    return (
        <Stack mb={3} direction='row' alignItems='center' justifyContent='space-between'>
            <Stack direction='row' alignItems='center'>
                {back && (
                    <IconButton href={backHref} component={UniversalLink}>
                        <Icon size={24} name='chevron-right' sx={{ rotate: '180deg' }} />
                    </IconButton>
                )}
                {typeof title === 'string' ? <PageTitle>{title}</PageTitle> : title}
            </Stack>
            {right}
        </Stack>
    );
}
