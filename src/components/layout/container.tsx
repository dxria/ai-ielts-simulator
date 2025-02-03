import { Box } from '@mui/material';

export function Container({ children }: React.PropsWithChildren) {
    return (
        <Box
            pb={15}
            margin='auto'
            maxWidth={1156}
            px={{
                xs: 3,
                sm: 6,
                md: 8,
                lg: 0,
            }}>
            {children}
        </Box>
    );
}
