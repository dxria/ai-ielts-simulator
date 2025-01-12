import { createNavigation } from 'next-intl/navigation';

import { routing } from '@/config/i18n';
export { useLocale } from 'next-intl';
export const { Link, redirect, useRouter, usePathname, getPathname } =
    createNavigation(routing);
