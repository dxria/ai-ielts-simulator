import { metadata } from '@/intl/metadata';
import AssignmentView from '@/views/assignments';

export const generateMetadata = metadata('assignments');

export default function Main() {
    return <AssignmentView />;
}
