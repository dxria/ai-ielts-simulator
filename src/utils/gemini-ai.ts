import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from '@google/generative-ai';

import { GEMINI_API_KEY } from '@/config';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY ?? '');

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
    topK: 40,
    topP: 0.95,
    temperature: 1,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

export const chatSession = model.startChat({
    generationConfig,
});
