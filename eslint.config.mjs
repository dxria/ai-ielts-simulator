import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...compat.config({
        parser: '@typescript-eslint/parser',
        plugins: ['perfectionist', '@typescript-eslint'],
        extends: ['next/core-web-vitals', 'next/typescript'],
        ignorePatterns: ['src/components/rich-editor/extensions/variable/index.tsx'],
        parserOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            camelcase: 1,
            'max-depth': ['error', 4],
            'max-params': ['error', 4],
            'no-duplicate-imports': 'error',
            'react-hooks/rules-of-hooks': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',

            'perfectionist/sort-objects': [
                'error',
                {
                    type: 'line-length',
                },
            ],
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@mui/*/*/*/*'],
                },
            ],
            'perfectionist/sort-named-imports': [
                'error',
                {
                    type: 'alphabetical',
                },
            ],
            'perfectionist/sort-interfaces': [
                'error',
                {
                    type: 'natural',
                    groups: ['multiline'],
                },
            ],
            'perfectionist/sort-object-types': [
                'error',
                {
                    type: 'natural',
                    groups: ['multiline'],
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
            'perfectionist/sort-jsx-props': [
                'error',
                {
                    type: 'line-length',
                    groups: ['key', 'shorthand', 'unknown', 'multiline', 'callback'],
                    customGroups: {
                        key: '^key$',
                        callback: '^on.+',
                    },
                },
            ],
            'perfectionist/sort-imports': [
                'error',
                {
                    internalPattern: ['^@/.*'],
                    groups: [
                        'react',
                        'next',
                        'type',
                        ['builtin', 'external'],
                        'internal-type',
                        'internal',
                        ['parent-type', 'sibling-type', 'index-type'],
                        ['parent', 'sibling', 'index'],
                        'object',
                        'unknown',
                    ],
                    customGroups: {
                        type: {
                            next: ['^next$', '^next/.+', '^next-.+', '^next-./.+'],
                            react: ['^react$', '^react-.+', '^react/.+', '^react-./.+'],
                        },
                        value: {
                            next: ['^next$', '^next/.+', '^next-.+', '^next-./.+'],
                            react: ['^react$', '^react-.+', '^react/.+', '^react-./.+'],
                        },
                    },
                },
            ],
        },
    }),
];

export default eslintConfig;
