import { metadata } from '@/intl/metadata';
import AssignmentView from '@/views/assignments/assignment';

export const generateMetadata = metadata('ongoing-assignment');

export default async function Page({
    params,
}: Readonly<PageProps<{ assignmentId: string }>>) {
    const assignmentId = (await params).assignmentId;

    return <AssignmentView assignmentId={+assignmentId} />;
}
