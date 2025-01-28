'use client';
import { UserButton } from '@clerk/nextjs';

import AddSession from './add-session';

export default function Main() {
    return (
        <>
            <UserButton />
            <h1>hi dash</h1>
            <AddSession />
        </>
    );
}
