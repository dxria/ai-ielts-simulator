// 'use client';

// import { useEffect, useState } from 'react';

// // const isSsr = typeof window === 'undefined';

// export function useLocalStorage<T>(key: string, defaultValue: T) {
//     const [value, setValue] = useState<string | null>(
//         null,
//         // isSsr ? null : window.localStorage.getItem(key),
//     );

//     useEffect(() => {
//         const storedValue = window.localStorage.getItem(key);

//         if (storedValue !== null) {
//             setValue(storedValue);
//         }
//     }, [key]);

//     const handleSetValue = (value: T) => {
//         setValue(JSON.stringify(value));
//         window.localStorage.setItem(key, JSON.stringify(value));
//     };

//     return [value ? (JSON.parse(value) as T) : defaultValue, handleSetValue] as const;
// }
