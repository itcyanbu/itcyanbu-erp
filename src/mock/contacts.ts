import type { Contact } from '../types/contact';

const COLORS = ['bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600', 'bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600'];

const NAMES = [
    'Tom Cook', 'Whitney Francis', 'Leonard Krasner', 'Floyd Miles', 'Emily Selman',
    'Kristin Watson', 'Cody Fisher', 'Courtney Henry', 'Theresa Webb', 'Arlene McCoy'
];

export const generateMockContacts = (): Contact[] => {
    return NAMES.map((name, index) => {
        const initials = name.split(' ').map(n => n[0]).join('');
        const id = Math.random().toString(36).substr(2, 9);

        return {
            id,
            name,
            email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
            phone: `(555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            tags: Math.random() > 0.5 ? ['lead', 'new'] : ['customer'],
            initials,
            avatarColor: COLORS[index % COLORS.length]
        };
    });
};
