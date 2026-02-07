import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type SiteItem, mockWebsites, mockBlogs, mockForms, mockSurveys, mockChatWidgets, mockWordPress } from '../data/mockSitesData';
import { type Funnel, mockFunnels } from '../data/mockFunnels';
import { useAuth } from './AuthContext';

interface SiteContextType {
    funnels: Funnel[];
    websites: SiteItem[];
    blogs: SiteItem[];
    forms: SiteItem[];
    surveys: SiteItem[];
    chatWidgets: SiteItem[];
    wordPressSites: SiteItem[];
    mediaItems: SiteItem[];
    addSite: (type: string, name: string) => void;
    deleteSite: (tab: string, id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    // State initialized with mock data as fallback
    const [funnels, setFunnels] = useState<Funnel[]>([]);
    const [websites, setWebsites] = useState<SiteItem[]>([]);
    const [blogs, setBlogs] = useState<SiteItem[]>([]);
    const [forms, setForms] = useState<SiteItem[]>([]);
    const [surveys, setSurveys] = useState<SiteItem[]>([]);
    const [chatWidgets, setChatWidgets] = useState<SiteItem[]>([]);
    const [wordPressSites, setWordPressSites] = useState<SiteItem[]>([]);
    const [mediaItems, setMediaItems] = useState<SiteItem[]>([]);

    // Load data from localStorage on mount or user change
    useEffect(() => {
        const userId = user?.id || 'demo';

        const load = (key: string, defaultData: any[]) => {
            try {
                const saved = localStorage.getItem(`ghl_${key}_${userId}`);
                return saved ? JSON.parse(saved) : defaultData;
            } catch (e) {
                console.error(`Error loading ${key}:`, e);
                return defaultData;
            }
        };

        setFunnels(load('funnels', mockFunnels));
        setWebsites(load('websites', mockWebsites));
        setBlogs(load('blogs', mockBlogs));
        setForms(load('forms', mockForms));
        setSurveys(load('surveys', mockSurveys));
        setChatWidgets(load('chat_widgets', mockChatWidgets));
        setWordPressSites(load('wordpress_sites', mockWordPress));
        setMediaItems(load('media_items', [
            { id: '1', name: 'hero-image.jpg', status: 'Active', lastUpdated: '1 hour ago' },
            { id: '2', name: 'logo-dark.png', status: 'Active', lastUpdated: '2 hours ago' },
            { id: '3', name: 'banner-ads.png', status: 'Active', lastUpdated: '1 day ago' },
            { id: '4', name: 'testimonial-1.jpg', status: 'Active', lastUpdated: '3 days ago' }
        ]));
    }, [user]);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        if (!user && !localStorage.getItem('ghl_funnels_demo')) return; // Don't save empty defaults if not needed

        const userId = user?.id || 'demo';
        const save = (key: string, data: any[]) => {
            localStorage.setItem(`ghl_${key}_${userId}`, JSON.stringify(data));
        };

        if (funnels.length > 0) save('funnels', funnels);
        if (websites.length > 0) save('websites', websites);
        if (blogs.length > 0) save('blogs', blogs);
        if (forms.length > 0) save('forms', forms);
        if (surveys.length > 0) save('surveys', surveys);
        if (chatWidgets.length > 0) save('chat_widgets', chatWidgets);
        if (wordPressSites.length > 0) save('wordpress_sites', wordPressSites);
        if (mediaItems.length > 0) save('media_items', mediaItems);
    }, [user, funnels, websites, blogs, forms, surveys, chatWidgets, wordPressSites, mediaItems]);

    const addSite = (type: string, name: string) => {
        const newItemBase = {
            id: Date.now().toString(),
            name,
            status: 'Draft' as const,
            lastUpdated: 'Just now',
        };

        switch (type) {
            case 'Funnel':
                setFunnels(prev => [{ ...newItemBase, steps: 0, type: 'Sales' } as Funnel, ...prev]);
                break;
            case 'Website':
                setWebsites(prev => [{ ...newItemBase, stats: '0 Pages', type: 'Business' }, ...prev]);
                break;
            case 'Blog':
                setBlogs(prev => [{ ...newItemBase, stats: '0 Posts', type: 'General' }, ...prev]);
                break;
            case 'WordPress Site':
                setWordPressSites(prev => [{ ...newItemBase, stats: 'v6.4', type: 'Managed' }, ...prev]);
                break;
            case 'Form':
                setForms(prev => [{ ...newItemBase, stats: '0 Submissions', type: 'Form' }, ...prev]);
                break;
            case 'Survey':
                setSurveys(prev => [{ ...newItemBase, stats: '0 Responses', type: 'Survey' }, ...prev]);
                break;
            case 'Chat Widget':
                setChatWidgets(prev => [{ ...newItemBase, stats: 'Default Theme', type: 'Chat' }, ...prev]);
                break;
            case 'Media File':
                setMediaItems(prev => [{ id: Date.now().toString(), name: name || 'uploaded-file.jpg', status: 'Draft', lastUpdated: 'Just now' }, ...prev]);
                break;
        }
    };

    const deleteSite = (tab: string, id: string) => {
        const filter = (prev: any[]) => prev.filter(item => item.id !== id);

        switch (tab) {
            case 'funnels': setFunnels(filter); break;
            case 'websites': setWebsites(filter); break;
            case 'blogs': setBlogs(filter); break;
            case 'wordpress': setWordPressSites(filter); break;
            case 'forms': setForms(filter); break;
            case 'surveys': setSurveys(filter); break;
            case 'chat_widget': setChatWidgets(filter); break;
            case 'media': setMediaItems(filter); break;
        }
    };

    const value = {
        funnels,
        websites,
        blogs,
        forms,
        surveys,
        chatWidgets,
        wordPressSites,
        mediaItems,
        addSite,
        deleteSite
    };

    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSites = () => {
    const context = useContext(SiteContext);
    if (!context) throw new Error('useSites must be used within SiteProvider');
    return context;
};
