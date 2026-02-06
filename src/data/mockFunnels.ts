export interface Funnel {
    id: string;
    name: string;
    steps: number;
    status: 'Active' | 'Draft' | 'Archived';
    lastUpdated: string;
    type: 'Sales' | 'Webinar' | 'Lead Magnet' | 'Product Launch' | 'Appointment';
}

export const mockFunnels: Funnel[] = [
    {
        id: '1',
        name: 'Free Teeth Whitening Voucher',
        steps: 2,
        status: 'Active',
        lastUpdated: '1 hour ago',
        type: 'Lead Magnet'
    },
    {
        id: '2',
        name: 'Home Buyers Guide 2024',
        steps: 3,
        status: 'Active',
        lastUpdated: '4 hours ago',
        type: 'Lead Magnet'
    },
    {
        id: '3',
        name: 'Webinar: Financial Freedom Strategies',
        steps: 4,
        status: 'Active',
        lastUpdated: '1 day ago',
        type: 'Webinar'
    },
    {
        id: '4',
        name: 'Auto Detailing Special Offer',
        steps: 3,
        status: 'Active',
        lastUpdated: '2 days ago',
        type: 'Sales'
    },
    {
        id: '5',
        name: 'Yoga Class Free Trial',
        steps: 2,
        status: 'Active',
        lastUpdated: '3 days ago',
        type: 'Lead Magnet'
    },
    {
        id: '6',
        name: 'High Ticket Coaching Application',
        steps: 5,
        status: 'Active',
        lastUpdated: '5 days ago',
        type: 'Appointment'
    },
    {
        id: '7',
        name: 'Black Friday Flash Sale',
        steps: 3,
        status: 'Archived',
        lastUpdated: '2 months ago',
        type: 'Sales'
    },
    {
        id: '8',
        name: 'Crossfit Challenge Registration',
        steps: 4,
        status: 'Draft',
        lastUpdated: '1 week ago',
        type: 'Product Launch'
    }
];
