import AssignmentView from '@/views/assignments/assignment';

export default async function Page({ params }: PageProps<{ assignmentId: string }>) {
    const assignmentId = (await params).assignmentId;

    return <AssignmentView assignmentId={+assignmentId} />;
}
