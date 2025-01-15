import { SignIn } from '@clerk/nextjs';
import { Box } from '@mui/material';

export default function Page() {
    return (
        <Box display='flex' height='100vh' alignItems='center' justifyContent='center'>
            <SignIn />
        </Box>
    );
}
