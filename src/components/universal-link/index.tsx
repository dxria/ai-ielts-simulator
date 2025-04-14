'use client';

import { forwardRef, useMemo } from 'react';

import { Link, type LinkProps } from '@mui/material';

import { Link as NextLink } from '@/intl/navigation';

const isTelLink = (href: string) => href.startsWith('tel:');
const isMailLink = (href: string) => href.startsWith('mailto:');
const isHashLink = (href: string) => href.startsWith('#');
const isLocalLink = (href: string) => href.startsWith('/');

export const UniversalLink = forwardRef(
    ({ href, ...props }: LinkProps, ref: React.Ref<HTMLAnchorElement>) => {
        const _props = useMemo(() => {
            if (!href) {
                return {};
            }

            const isLocal = isLocalLink(href);

            if (isLocal) {
                return {
                    component: NextLink,
                };
            }

            if (!isLocal && !isMailLink(href) && !isTelLink(href) && !isHashLink(href)) {
                return {
                    target: 'blank',
                    rel: 'noopener noreferrer',
                };
            }
        }, [href]);

        return <Link ref={ref} href={href} underline='none' {..._props} {...props} />;
    },
);

UniversalLink.displayName = 'UniversalLink';
