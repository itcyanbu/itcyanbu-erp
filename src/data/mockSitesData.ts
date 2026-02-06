
export interface SiteItem {
    id: string;
    name: string;
    status: 'Active' | 'Draft' | 'Archived';
    stats?: string; // e.g. "5 Pages", "12 Submissions"
    type?: string;
    lastUpdated: string;
    url?: string;
}

export const mockWebsites: SiteItem[] = [
    { id: '1', name: 'Main Corporate Site', status: 'Active', stats: '8 Pages', type: 'Business', lastUpdated: '2 hours ago', url: 'https://mysite.com' },
    { id: '2', name: 'Landing Page Campaign', status: 'Active', stats: '1 Page', type: 'Landing Page', lastUpdated: '1 day ago', url: 'https://promo.mysite.com' },
    { id: '3', name: 'Old Portfolio', status: 'Archived', stats: '4 Pages', type: 'Portfolio', lastUpdated: '3 months ago' },
];

export const mockBlogs: SiteItem[] = [
    { id: '1', name: 'Industry Insights', status: 'Active', stats: '24 Posts', type: 'Tech', lastUpdated: '5 hours ago' },
    { id: '2', name: 'Company News', status: 'Active', stats: '12 Posts', type: 'Updates', lastUpdated: '1 week ago' },
];

export const mockForms: SiteItem[] = [
    { id: '1', name: 'Contact Us Form', status: 'Active', stats: '154 Submissions', lastUpdated: '1 hour ago' },
    { id: '2', name: 'Lead Magnet Download', status: 'Active', stats: '892 Submissions', lastUpdated: '3 days ago' },
    { id: '3', name: 'Customer Feedback', status: 'Draft', stats: '0 Submissions', lastUpdated: '2 weeks ago' },
];

export const mockSurveys: SiteItem[] = [
    { id: '1', name: 'Onboarding Survey', status: 'Active', stats: '45 Responses', lastUpdated: '2 days ago' },
    { id: '2', name: 'NPS Survey', status: 'Active', stats: '128 Responses', lastUpdated: '1 week ago' },
];

export const mockChatWidgets: SiteItem[] = [
    { id: '1', name: 'Main Site Widget', status: 'Active', stats: 'Default Theme', lastUpdated: '1 month ago' },
];

export const mockWordPress: SiteItem[] = [
    { id: '1', name: 'WP Corporate', status: 'Active', stats: 'v6.4', type: 'Managed', lastUpdated: '2 days ago' },
    { id: '2', name: 'WP Shop', status: 'Draft', stats: 'v6.3', type: 'WooCommerce', lastUpdated: '1 week ago' },
];
