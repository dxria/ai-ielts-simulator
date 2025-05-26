import { IconName } from '@/types/name';

export const header: { href: string; id: number; title: any }[] = [
    // { id: 1, title: 'header.home', href: '#home' },
    { id: 2, href: '#what-we-offer', title: 'header.what-we-offer' },
    { id: 3, href: '#faq', title: 'header.faq' },
    { id: 4, href: '#get-in-touch', title: 'header.get-in-touch' },
];

export const linking: { href: string; icon: IconName; id: number; title: any }[] = [
    { id: 2, icon: 'clipboard', href: '/assignment', title: 'linking.assignments' },
    // { id: 3, icon: 'chart', href: '/dashboard', title: 'linking.dashboard' },
];
