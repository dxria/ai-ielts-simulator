'use client';

import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import {
    Box,
    Card,
    CardContent,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material';

import { GetPerformanceInput } from '@/api/dto';
import { usePerformance } from '@/api/hooks';

export default function Index({ performanceId }: { performanceId: number }) {
    const { user } = useUser();

    if (!user) return null;

    return <PerformanceView userId={user.id} performanceId={performanceId} />;
}

function PerformanceView({ userId, performanceId }: GetPerformanceInput) {
    const { data } = usePerformance({ userId, performanceId });
    console.log(data);
    if (!data) return null;

    return <PerformanceFeedback data={data} />;
}

function PerformanceFeedback({ data }: { data: any }) {
    const [activeTab, setActiveTab] = useState('part1');
    const feedback = JSON.parse(data.evaluation.feedback);

    const handleChange = (event: any, newValue: any) => {
        setActiveTab(newValue);
    };

    const renderTable = (part: any) => {
        const partData = feedback[part];
        if (!partData || (!partData.questions?.length && !partData.question))
            return <Typography>No feedback available.</Typography>;

        return (
            <TableContainer sx={{ mt: 2 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Fluency & Coherence</TableCell>
                            <TableCell>Grammar</TableCell>
                            <TableCell>Lexical Resource</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partData.questions ? (
                            partData.questions.map((q: any) => (
                                <TableRow key={q.id}>
                                    <TableCell>{q.question}</TableCell>
                                    <TableCell>{q.answer || 'No answer'}</TableCell>
                                    <TableCell>{q.comments}</TableCell>
                                    <TableCell>{q.fluency_and_coherence}</TableCell>
                                    <TableCell>
                                        {q.grammatical_range_and_accuracy}
                                    </TableCell>
                                    <TableCell>{q.lexical_resource}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow key={partData.id}>
                                <TableCell>{partData.question}</TableCell>
                                <TableCell>{partData.answer || 'No answer'}</TableCell>
                                <TableCell>{partData.comments}</TableCell>
                                <TableCell>{partData.fluency_and_coherence}</TableCell>
                                <TableCell>
                                    {partData.grammatical_range_and_accuracy}
                                </TableCell>
                                <TableCell>{partData.lexical_resource}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box p={3}>
            <Card>
                <CardContent>
                    <Typography variant='h5'>Performance Feedback</Typography>

                    <Typography variant='body1'>
                        Start Time: {new Date(data.startTime).toLocaleString()}
                    </Typography>
                    <Typography variant='body1'>
                        End Time: {new Date(data.endTime).toLocaleString()}
                    </Typography>
                    <Typography variant='h6' sx={{ mt: 2 }}>
                        Overall Feedback
                    </Typography>
                    <Typography variant='body2'>{feedback.overall_feedback}</Typography>
                </CardContent>
            </Card>

            <Tabs centered sx={{ mt: 2 }} value={activeTab} onChange={handleChange}>
                <Tab value='part1' label='Part 1' />
                <Tab value='part2' label='Part 2' />
                <Tab value='part3' label='Part 3' />
            </Tabs>

            {renderTable(activeTab)}
        </Box>
    );
}
