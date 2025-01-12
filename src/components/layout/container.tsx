import { Box } from '@mui/material';

export function Container({ children }: React.PropsWithChildren) {
    return (
        <Box
            margin='auto'
            maxWidth={1156}
            px={{
                xs: 3,
                sm: 6,
                md: 8,
                lg: 0,
            }}
            pb={{
                xs: 15,
                sm: 18,
                md: 25,
                lg: 25,
            }}>
            {children}
        </Box>
    );
}
