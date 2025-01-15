import { ClerkProvider } from '@clerk/nextjs';

export default function AuthProvider({ children }: React.PropsWithChildren) {
    return <ClerkProvider>{children}</ClerkProvider>;
}
