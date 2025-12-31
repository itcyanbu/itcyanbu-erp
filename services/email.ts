import emailjs from '@emailjs/browser';

// Keys should be in .env file, but providing defaults/placeholders here
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export const initEmail = () => {
    emailjs.init(PUBLIC_KEY);
};

export const sendEmail = async (templateParams: Record<string, unknown>) => {
    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return { success: true, status: response.status, text: response.text };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return { success: false, error };
    }
};

export const sendWelcomeEmail = async (name: string, email: string) => {
    // Generate a simple random ID for the software login
    const softwareId = `ITC-${Math.floor(1000 + Math.random() * 9000)}`;

    const message = `
Thank you for Reseller / client Registration with itcyanbu !
Dear customer
Welcome to us

We have Created your Reseller /client as well itcyanbu Software Account. You Need to Login from Super Admin login credential and upload Following Document by clicking on Reseller / client Profile to complete your Reseller /client profile:
Aadhar Card
PAN Card
Photo
Canceled Cheque
Reseller Agreement

We have also Create Your two login credential for you (Super Admin Login and User Login). First You will have to login from Super Admin Login credential and fill all the detail of your company. Users login will not work until you fill complete company detail.

What's next
Step 1: Super Admin Login Credential.
Super Admin User Id - ${email}
Password - 123456
Login Url - Super Admin Login	

Step 2: Software & CRM Login Credential (Use Only After Putting all information in company detail).
Software Login User Id - ${softwareId}
Password - 123456
Login Url - User Login

Note- This is a free account, active for 7 days. Please take the time to review all features, functionalities, and calculations of the software carefully. Any modifications beyond the existing features and functionalities will be considered as additional customization and will incur extra charges.

Please feel free to contact us at +966545450613 or at itc@itcyanbu.net for any query.

Thanks & Regards,

itcyanbu Team
    `.trim();

    return sendEmail({
        to_name: name,
        to_email: email,
        subject: 'Welcome to itcyanbu - Account Details',
        message: message,
        type: 'New Registration'
    });
};

export const sendResellerInquiry = async (data: any) => {
    return sendEmail({
        to_name: 'Admin',
        from_name: data.fullName,
        from_email: data.email,
        company: data.company,
        message: data.message,
        subject: `New Reseller Inquiry from ${data.company}`,
        type: 'Reseller Inquiry'
    });
};

export const sendQuoteRequest = async (data: any) => {
    return sendEmail({
        to_name: 'Admin',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        subject: `New Quote Request: ${data.service}`,
        type: 'Quote Request'
    });
};
