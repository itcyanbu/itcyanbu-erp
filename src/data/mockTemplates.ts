export interface MessageTemplate {
  id: string;
  name: string;
  category: 'Greeting' | 'Utility' | 'Marketing' | 'Campaign' | 'Support';
  preview: string;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  { id: '1', name: 'Welcome Message', category: 'Greeting', preview: 'Hello {{name}}! Welcome to our store. We\'re excited to have you as our customer. Feel free to reach out anytime! 🎉', },
  { id: '2', name: 'Order Confirmation', category: 'Utility', preview: 'Hi {{name}}, your order #{{order_id}} has been confirmed! 📦 Expected delivery: {{date}}. Track here: {{link}}', },
  { id: '3', name: 'Abandoned Cart Recovery', category: 'Marketing', preview: 'Hey {{name}}! You left something behind 🛒 Your cart is waiting. Complete your purchase and get 10% OFF with code SAVE10!', },
  { id: '4', name: 'Flash Sale Announcement', category: 'Campaign', preview: '🔥 FLASH SALE! {{name}}, get up to 50% OFF for the next 24 hours only! Shop now: {{link}}', },
  { id: '5', name: 'Feedback Request', category: 'Support', preview: 'Hi {{name}}, thank you for your purchase! We\'d love to hear your feedback. Rate us here: {{link}} ⭐', },
  { id: '6', name: 'Re-engagement', category: 'Marketing', preview: 'We miss you, {{name}}! 💙 It\'s been a while. Here\'s an exclusive 15% discount just for you: {{code}}', },
];
