
import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { GAS_URL } from '../constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    topic: 'General Enquiry',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (GAS_URL.includes('PLACEHOLDER')) {
      alert("Please update the Google Apps Script URL in the code.");
      return;
    }

    setStatus('submitting');

    try {
      // Using no-cors mode to avoid CORS preflight issues with GAS. 
      // Note: We won't get a readable response JSON in no-cors mode, so we assume success if no network error throws.
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setStatus('success');
      setFormData({ name: '', email: '', topic: 'General Enquiry', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-stone-200 rounded-lg">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
          />
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Topic</label>
          <select
            name="topic"
            id="topic"
            value={formData.topic}
            onChange={handleChange}
            className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
          >
            <option>General Enquiry</option>
            <option>B2B / Wholesale</option>
            <option>Kegs</option>
            <option>Events</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Message</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors uppercase tracking-wider"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
                Message Sent
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {status === 'error' && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Submission failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Please try again later or email us directly at info@brauerei-andermatt.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
