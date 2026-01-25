// TypeScript types for Conversations feature

export type Channel = 'sms' | 'email' | 'whatsapp' | 'chat' | 'internal';
export type MessageType = 'message' | 'internal_comment' | 'activity';
export type MessageFrom = 'contact' | 'user' | 'system';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type ConversationStatus = 'open' | 'closed';
export type InboxType = 'my' | 'team' | 'internal';

export interface Contact {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
    tags: string[];
    customFields: Record<string, any>;
    owner?: string;
    company?: string;
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}

export interface Message {
    id: string;
    conversationId: string;
    type: MessageType;
    from: MessageFrom;
    userId?: string;
    userName?: string;
    body: string;
    timestamp: Date;
    status: MessageStatus;
    attachments?: Attachment[];
    channel: Channel;
    isInternal?: boolean;
}

export interface Conversation {
    id: string;
    contactId: string;
    contact: Contact;
    channel: Channel;
    messages: Message[];
    lastMessage: Message;
    lastUpdated: Date;
    unreadCount: number;
    isStarred: boolean;
    assignedTo: string | null;
    assignedToName?: string;
    tags: string[];
    status: ConversationStatus;
    isArchived: boolean;
    folder?: string;
}

export interface FilterCriteria {
    search?: string;
    channels?: Channel[];
    tags?: string[];
    assignedTo?: string[];
    status?: ConversationStatus[];
    isStarred?: boolean;
    isArchived?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
    operator?: 'AND' | 'OR';
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: string;
}
