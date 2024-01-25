import { SideNavItem } from '@/models/SideNavItem';
import {
    BarChart3Icon,
    CircleDollarSignIcon,
    HomeIcon,
    LandmarkIcon, PlaneTakeoffIcon,
} from 'lucide-react';

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
    },
    {
        title: 'Transactions',
        path: '/transactions',
        icon: <CircleDollarSignIcon />,
    },
    {
        title: 'Accounts',
        path: '/accounts',
        icon: <LandmarkIcon />,
    },
    {
        title: 'Analytics',
        path: '/analytics',
        icon: <BarChart3Icon />,
    },
    {
        title: 'Trips',
        path: '/trips',
        icon: <PlaneTakeoffIcon />,
    },
];
