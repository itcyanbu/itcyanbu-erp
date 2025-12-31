
import React from 'react';
import { 
  Database, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Monitor, 
  Settings, 
  ShieldCheck, 
  Smartphone, 
  MessageCircle,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export const CONTACT_INFO = {
  phone: '+966 54 545 0613',
  whatsapp: '+966545450613',
  email: 'itc@itcyanbu.net',
  address: 'Saudi Arabia - Yanbu RCY - Sumairi Area -Busatan Market - building 2 -floor 2 - Office No.18'
};

export const SERVICES = [
  {
    title: 'ERP Software',
    description: 'To manage your day-to-day business activities and reporting. We provide highly customizable Billing & Accounting Software (ERP) for Various Industries in Online, Offline & Mobile Version',
    image: 'https://picsum.photos/seed/erp/400/300',
    icon: <Database className="w-8 h-8 text-blue-600" />
  },
  {
    title: 'Ecommerce Solution',
    description: 'To enhance your sales or Company Brand, we provide Dynamic e-commerce or business website along with mobile application, domain & Server.',
    image: 'https://picsum.photos/seed/shop/400/300',
    icon: <ShoppingCart className="w-8 h-8 text-blue-600" />
  },
  {
    title: 'CRM Software',
    description: 'To manage your sales team and help the team in managing their business leads, we provide Customer Relationship Management (CRM) solution',
    image: 'https://picsum.photos/seed/crm/400/300',
    icon: <Users className="w-8 h-8 text-blue-600" />
  },
  {
    title: 'HRM Software',
    description: 'To track the day-to-day activities, reporting and attendance of your employees we also provide Human Resource Management (HRM) System',
    image: 'https://picsum.photos/seed/hrm/400/300',
    icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />
  }
];

export const FEATURES = [
  {
    title: 'All in One Software',
    description: 'Get all required Software for your business in Just One ERP Software.',
    icon: <Monitor className="w-6 h-6" />
  },
  {
    title: 'Advanced Features',
    description: 'Get advance ERP & CRM features to run your business in current market scenario.',
    icon: <Settings className="w-6 h-6" />
  },
  {
    title: 'Easy-to-Use',
    description: 'Our ERP, CRM and HRMS can be used by any common person without any technical knowledge or detailed training.',
    icon: <Smartphone className="w-6 h-6" />
  },
  {
    title: 'One Point of Contact',
    description: 'You need to contact us for any technical issue arises, no need to call anywhere else.',
    icon: <Headphones className="w-6 h-6" />
  },
  {
    title: 'Highly Customizable',
    description: 'Our ERP Software can be customized as per your requirement and scale your business.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: 'Access from Anywhere',
    description: 'Our ERP & CRM Software can be access from anywhere, Our Data is getting synchronize on run time basis.',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: 'Highly Scalable',
    description: 'As your business grow and open multiple business, our ERP & CRM Software meets your requirement.',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: 'Dedicated Whatsapp Group',
    description: 'We create dedicated WhatsApp Group in which customers as well as our team is connected.',
    icon: <MessageCircle className="w-6 h-6" />
  }
];
