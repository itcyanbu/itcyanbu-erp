
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
    { id: '1', name: 'Dental Care Professionals', status: 'Active', stats: '6 Pages', type: 'Medical', lastUpdated: '3 hours ago', url: 'https://demo.dentalcare.com' },
    { id: '2', name: 'Luxury Real Estate Listings', status: 'Active', stats: '12 Pages', type: 'Real Estate', lastUpdated: '1 day ago', url: 'https://demo.realty.com' },
    { id: '3', name: 'Crossfit Gym & Fitness', status: 'Active', stats: '5 Pages', type: 'Fitness', lastUpdated: '2 days ago', url: 'https://demo.crossfit.com' },
    { id: '4', name: 'Legal Experts & Associates', status: 'Draft', stats: '4 Pages', type: 'Legal', lastUpdated: '1 week ago' },
    { id: '5', name: 'Digital Growth Agency', status: 'Active', stats: '8 Pages', type: 'Agency', lastUpdated: '3 days ago', url: 'https://demo.agency.com' },
    { id: '6', name: 'Organic Juice Bar', status: 'Active', stats: '5 Pages', type: 'Restaurant', lastUpdated: '5 hours ago' }
];

export const mockBlogs: SiteItem[] = [
    { id: '1', name: 'Healthy Living Insights', status: 'Active', stats: '32 Posts', type: 'Health', lastUpdated: '2 hours ago' },
    { id: '2', name: 'Real Estate Market Trends', status: 'Active', stats: '15 Posts', type: 'Property', lastUpdated: '4 days ago' },
    { id: '3', name: 'Tech & Innovation News', status: 'Draft', stats: '5 Posts', type: 'Technology', lastUpdated: '1 week ago' }
];

export const mockForms: SiteItem[] = [
    { id: '1', name: 'New Patient Registration', status: 'Active', stats: '243 Submissions', type: 'Registration', lastUpdated: '30 mins ago' },
    { id: '2', name: 'Property Viewing Request', status: 'Active', stats: '56 Submissions', type: 'Real Estate', lastUpdated: '2 hours ago' },
    { id: '3', name: 'Free Consultation Application', status: 'Active', stats: '89 Submissions', type: 'Consultation', lastUpdated: '1 day ago' },
    { id: '4', name: 'Newsletter Signup - Footer', status: 'Active', stats: '1,205 Submissions', type: 'Lead Gen', lastUpdated: '10 mins ago' },
    { id: '5', name: 'Customer Feedback Form', status: 'Active', stats: '45 Submissions', type: 'Feedback', lastUpdated: '3 days ago' }
];

export const mockSurveys: SiteItem[] = [
    { id: '1', name: 'Client Onboarding Questionnaire', status: 'Active', stats: '34 Responses', type: 'Onboarding', lastUpdated: '1 hour ago' },
    { id: '2', name: 'Customer Satisfaction (NPS)', status: 'Active', stats: '156 Responses', type: 'Feedback', lastUpdated: '5 hours ago' },
    { id: '3', name: 'Fitness Goals Assessment', status: 'Active', stats: '89 Responses', type: 'Fitness', lastUpdated: '2 days ago' },
    { id: '4', name: 'Home Security Audit', status: 'Draft', stats: '0 Responses', type: 'Security', lastUpdated: '1 week ago' }
];

export const mockChatWidgets: SiteItem[] = [
    { id: '1', name: 'Main Site - Support', status: 'Active', stats: 'Standard Theme', type: 'Chat', lastUpdated: '1 month ago' },
    { id: '2', name: 'Sales Page - Lead Capture', status: 'Active', stats: 'Pop-up Theme', type: 'Chat', lastUpdated: '2 weeks ago' }
];

export const mockWordPress: SiteItem[] = [
    { id: '1', name: 'WP Corporate Portal', status: 'Active', stats: 'v6.4', type: 'Managed', lastUpdated: '3 hours ago' },
    { id: '2', name: 'WooCommerce Store', status: 'Active', stats: 'v6.4', type: 'E-commerce', lastUpdated: '1 day ago' },
    { id: '3', name: 'Client Blog Network', status: 'Draft', stats: 'v6.3', type: 'Blog', lastUpdated: '2 weeks ago' }
];
