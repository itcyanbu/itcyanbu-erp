export interface Funnel {
    id: string;
    name: string;
    steps: number;
    status: 'Active' | 'Draft' | 'Archived';
    lastUpdated: string;
    type: 'Sales' | 'Webinar' | 'Lead Magnet' | 'Product Launch';
}

export const mockFunnels: Funnel[] = [
    {
        id: '1',
        name: 'High Ticket Coaching Application',
        steps: 4,
        status: 'Active',
        lastUpdated: '2 hours ago',
        type: 'Sales'
    },
    {
        id: '2',
        name: 'Free E-book Opt-in',
        steps: 2,
        status: 'Active',
        lastUpdated: '1 day ago',
        type: 'Lead Magnet'
    },
    {
        id: '3',
        name: 'Webinar Registration',
        steps: 3,
        status: 'Draft',
        lastUpdated: '3 days ago',
        type: 'Webinar'
    },
    {
        id: '4',
        name: 'Holiday Promo Sale',
        steps: 5,
        status: 'Archived',
        lastUpdated: '1 month ago',
        type: 'Sales'
    },
    {
        id: '5',
        name: 'Client Onboarding',
        steps: 6,
        status: 'Active',
        lastUpdated: '5 days ago',
        type: 'Product Launch'
    }
];
