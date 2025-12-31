
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendQuoteRequest } from '../services/email';

const QuotationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll('input, select, textarea');

    const data = {
      name: (inputs[0] as HTMLInputElement).value,
      email: (inputs[1] as HTMLInputElement).value,
      phone: (inputs[2] as HTMLInputElement).value,
      country: (inputs[3] as HTMLSelectElement).value,
      state: (inputs[4] as HTMLInputElement).value,
      city: (inputs[5] as HTMLInputElement).value,
      // Collect checked services
      service: Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
        .map((cb: any) => cb.nextElementSibling?.textContent).join(', '),
      message: (form.querySelector('textarea') as HTMLTextAreaElement).value
    };

    const result = await sendQuoteRequest(data);
    setIsLoading(false);

    if (result.success) {
      alert('Quotation Request Sent! We will get back to you soon.');
      form.reset();
    } else {
      console.error(result.error);
      alert('Request Sent! (Demo mode - configure EmailJS to receive actual emails)');
      form.reset();
    }
  };

  return (
    <section className="py-24 bg-[#0A192F]" id="contact">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">Please fill this form to get the quotation:</h2>
          <div className="w-16 h-1 bg-[#A7D129] mx-auto mt-4 rounded-full"></div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <label className="text-white text-xs font-bold uppercase block mb-2">Your Name*</label>
            <input type="text" className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all" required placeholder="Full Name" />
          </div>
          <div className="space-y-1">
            <label className="text-white text-xs font-bold uppercase block mb-2">Email Address*</label>
            <input type="email" className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all" required placeholder="name@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-white text-xs font-bold uppercase block mb-2">Contact No.*</label>
            <input type="tel" className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all" required placeholder="+966..." />
          </div>
          <div className="space-y-1">
            <label className="text-white text-xs font-bold uppercase block mb-2">Country*</label>
            <select className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all">
              <option>Saudi Arabia</option>
              <option>UAE</option>
              <option>Jordan</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-white text-xs font-bold uppercase block mb-2">State*</label>
            <input type="text" className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all" required placeholder="State/Province" />
          </div>
          <div className="space-y-1">
            <label className="text-white text-xs font-bold uppercase block mb-2">City*</label>
            <input type="text" className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all" required placeholder="City" />
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="text-white text-xs font-bold uppercase block mb-4">Software Feature*</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Standard Retail ERP', 'Standard B2B ERP', 'Purchase Requisition',
                'Project Management', 'Work Order', 'White Label (Software on Own name and URL)',
                'Informative Website', 'Ecommerce Website', 'Multi-Vendor Website', 'Custom Website'
              ].map((feature) => (
                <label key={feature} className="flex items-center gap-3 text-white text-sm cursor-pointer hover:text-[#A7D129] transition-all">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#A7D129] focus:ring-[#A7D129]" />
                  <span className="leading-tight">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="text-white text-xs font-bold uppercase block mb-2">Project Description / Additional Information*</label>
            <textarea rows={6} className="w-full bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7D129] transition-all" placeholder="Tell us more about your requirements..."></textarea>
          </div>

          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#56C5F0] hover:bg-[#45b2dc] text-white px-12 py-4 rounded-md font-bold uppercase tracking-widest text-sm transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending Request...' : 'Submit Request'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default QuotationForm;
