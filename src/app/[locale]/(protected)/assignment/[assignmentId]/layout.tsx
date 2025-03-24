import { AssignmentProvider } from '@/providers/assignment/assignment-provider';

export default function AssignmentLayout({ children }: React.PropsWithChildren) {
    return <AssignmentProvider>{children}</AssignmentProvider>;
}
