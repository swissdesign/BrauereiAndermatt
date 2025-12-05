import React, { useState } from 'react';
import { NewsletterFormData } from '../types';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { GAS_URL } from '../constants';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (GAS_URL.includes('PLACEHOLDER')) {
      alert("Please update the Google Apps Script URL in the code.");
      return;
    }

    setStatus('submitting');

    // Adapt payload to match the ContactFormData structure the backend expects
    const payload = {
      name: 'Newsletter Subscriber',
      email: email,
      topic: 'Newsletter',
      message: 'Please add me to the mailing list.'
    };

    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">You're on the list.</h3>
        <p className="text-slate-600 mb-6 text-sm">
          We promise not to spam you. We're too busy brewing beer to write emails anyway.
          Expect to hear from us... occasionally.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-amber-600 hover:text-amber-700 underline uppercase tracking-wide"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 uppercase mb-2">Join the Club</h2>
        <p className="text-slate-600 text-sm">
           Get updates on new releases, events, and what we're brewing next. No fluff.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="email"
              name="email"
              id="newsletter-email"
              required
              className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-stone-300 rounded-md p-3 border bg-stone-50"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors uppercase tracking-wider"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Signing up...
            </>
          ) : (
            'Subscribe'
          )}
        </button>

        {status === 'error' && (
          <div className="rounded-md bg-red-50 p-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">Something went wrong. Try again later.</span>
          </div>
        )}
        
        <p className="text-xs text-center text-stone-400 mt-4">
          By clicking Subscribe, you agree to receive emails from Brauerei Andermatt. You can unsubscribe at any time.
        </p>
      </div>
    </form>
  );
};

export default NewsletterForm;
