import type { Conversation, Contact } from '../types/conversations';

// Mock users for assignment
export const mockUsers = [
    { id: 'u1', name: 'Balaji V', email: 'balaji@agency.com', role: 'Admin' }, // Updated to match screenshot mention
    { id: 'u2', name: 'Sarah Smith', email: 'sarah@agency.com', role: 'Agent' },
    { id: 'u3', name: 'Mike Johnson', email: 'mike@agency.com', role: 'Agent' },
];

// Mock contacts
const contacts: Contact[] = [
    { id: 'c1', name: 'Guest Visitor Cewhl', email: 'visitor.cewhl@example.com', phone: '', tags: ['inquiry_received', 'livechat'], customFields: {}, owner: 'u1', company: 'Utility Company' }, // Matches screenshot
    { id: 'c2', name: 'Pop', email: 'pop@outlook.com', phone: '+1234567891', tags: ['customer'], customFields: {}, owner: 'u2' },
    { id: 'c3', name: 'test 1', email: 'test1@business.com', phone: '+1234567892', tags: ['lead'], customFields: {}, owner: 'u1' },
    { id: 'c4', name: 'Prasath Dhayalan', email: 'prasath@startup.com', phone: '+1234567893', tags: ['customer', 'vip'], customFields: {}, owner: 'u3' },
    { id: 'c5', name: 'Guest Visitor Mzaqu', email: 'mzaqu@corp.com', phone: '+1234567894', tags: ['lead', 'follow-up'], customFields: {} },
    { id: 'c6', name: 'Test Test', email: 'test.test@email.com', phone: '+1234567895', tags: ['customer'], customFields: {}, owner: 'u2' },
];

const today = new Date();
const setTime = (h: number, m: number) => {
    const d = new Date(today);
    d.setHours(h, m, 0, 0);
    return d;
};

// Generate mock conversations
export const mockConversations: Conversation[] = [
    {
        id: 'conv1',
        contactId: 'c1',
        contact: contacts[0],
        channel: 'chat',
        messages: [
            { id: 'm1', conversationId: 'conv1', type: 'message', from: 'contact', body: 'Hello', timestamp: setTime(13, 22), status: 'read', channel: 'chat' },
            { id: 'm2', conversationId: 'conv1', type: 'message', from: 'user', userId: 'u1', userName: 'Balaji V', body: 'I can help with pricing, support, or reviews—what do you need?', timestamp: setTime(13, 22), status: 'read', channel: 'chat' },
            { id: 'm3', conversationId: 'conv1', type: 'message', from: 'contact', body: 'Sure, I need some details', timestamp: setTime(13, 22), status: 'read', channel: 'chat' },
            { id: 'm4', conversationId: 'conv1', type: 'message', from: 'user', userId: 'u1', userName: 'Balaji V', body: 'We provide facials and pedicure services. If you need more details or want to book, let me know your preferred date or ask your next question.', timestamp: setTime(13, 22), status: 'read', channel: 'chat' },
            { id: 'm5', conversationId: 'conv1', type: 'internal_comment', from: 'user', userId: 'sd', userName: 'SD', body: 'Hello @Balaji V , Please call this customer', timestamp: setTime(13, 31), status: 'read', channel: 'internal', isInternal: true }, // Internal Note from screenshot
        ],
        lastMessage: { id: 'm5', conversationId: 'conv1', type: 'internal_comment', from: 'user', body: 'Hello @Balaji V , Please call this customer', timestamp: setTime(13, 31), status: 'read', channel: 'internal' },
        lastUpdated: setTime(13, 31),
        unreadCount: 2,
        isStarred: true,
        assignedTo: 'u1',
        assignedToName: 'Unassigned', // Matches screenshot "Owner: Unassigned" visual despite having an ID
        tags: ['inquiry_received', 'livechat'],
        status: 'open',
        isArchived: false,
    },
    {
        id: 'conv2',
        contactId: 'c2',
        contact: contacts[1],
        channel: 'email',
        messages: [
            { id: 'm6', conversationId: 'conv2', type: 'message', from: 'contact', body: 'Hello ragav outlook, You have received a n...', timestamp: setTime(13, 31), status: 'read', channel: 'email' },
        ],
        lastMessage: { id: 'm6', conversationId: 'conv2', type: 'message', from: 'contact', body: 'Hello ragav outlook, You have received a n...', timestamp: setTime(13, 31), status: 'read', channel: 'email' },
        lastUpdated: setTime(13, 31),
        unreadCount: 13,
        isStarred: true,
        assignedTo: 'u2',
        tags: [],
        status: 'open',
        isArchived: false,
    },
    {
        id: 'conv3',
        contactId: 'c3',
        contact: contacts[2],
        channel: 'sms',
        messages: [
            { id: 'm7', conversationId: 'conv3', type: 'message', from: 'contact', body: 'fhdfgh', timestamp: setTime(13, 31), status: 'read', channel: 'sms' },
        ],
        lastMessage: { id: 'm7', conversationId: 'conv3', type: 'message', from: 'contact', body: 'fhdfgh', timestamp: setTime(13, 31), status: 'read', channel: 'sms' },
        lastUpdated: setTime(13, 31),
        unreadCount: 1,
        isStarred: true,
        assignedTo: 'u1',
        tags: [],
        status: 'open',
        isArchived: false,
    },
    {
        id: 'conv4',
        contactId: 'c4',
        contact: contacts[3],
        channel: 'whatsapp',
        messages: [
            { id: 'm8', conversationId: 'conv4', type: 'message', from: 'contact', body: 'IG outbound message using API - Health ...', timestamp: setTime(13, 27), status: 'read', channel: 'whatsapp' },
        ],
        lastMessage: { id: 'm8', conversationId: 'conv4', type: 'message', from: 'contact', body: 'IG outbound message using API - Health ...', timestamp: setTime(13, 27), status: 'read', channel: 'whatsapp' },
        lastUpdated: setTime(13, 27),
        unreadCount: 1,
        isStarred: true,
        assignedTo: 'u3',
        tags: [],
        status: 'open',
        isArchived: false,
    }
];
