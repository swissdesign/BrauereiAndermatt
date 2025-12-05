
import React, { useState, useEffect } from 'react';
import { BEERS, GAS_URL, ORDER_CONFIG } from '../constants';
import { OrderFormData, CartItem } from '../types';
import { Plus, Minus, ShoppingBag, Loader2, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    email: '',
    address: '',
    phone: '',
    cart: BEERS.filter(b => !b.comingSoon).map(b => ({ beerId: b.id, quantity: 0 })),
    pickupDate: '',
    confirmed: false
  });
  
  const [pickupDateDisplay, setPickupDateDisplay] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Calculate next valid Last Friday of the Month
  useEffect(() => {
    const calculateNextPickup = () => {
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth(); // 0-11

      // Find last Friday of current month
      let lastDayOfMonth = new Date(year, month + 1, 0);
      let dayOfWeek = lastDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
      
      // Calculate offset to get to Friday (5)
      // If dayOfWeek is 6 (Sat), subtract 1. If 5 (Fri), subtract 0. If 0 (Sun), subtract 2.
      let offset = (dayOfWeek + 7 - 5) % 7;
      let lastFriday = new Date(lastDayOfMonth);
      lastFriday.setDate(lastDayOfMonth.getDate() - offset);
      lastFriday.setHours(ORDER_CONFIG.PICKUP_END_HOUR, 0, 0, 0);

      // If we are past the last Friday (or it's today but too late), move to next month
      if (today > lastFriday) {
        month++;
        if (month > 11) {
          month = 0;
          year++;
        }
        lastDayOfMonth = new Date(year, month + 1, 0);
        dayOfWeek = lastDayOfMonth.getDay();
        offset = (dayOfWeek + 7 - 5) % 7;
        lastFriday = new Date(lastDayOfMonth);
        lastFriday.setDate(lastDayOfMonth.getDate() - offset);
      }

      const formattedDate = lastFriday.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      setPickupDateDisplay(formattedDate);
      setFormData(prev => ({ ...prev, pickupDate: formattedDate }));
    };

    calculateNextPickup();
  }, []);

  const updateQuantity = (beerId: string, delta: number) => {
    setFormData(prev => {
      const currentCart = [...prev.cart];
      const index = currentCart.findIndex(item => item.beerId === beerId);
      
      if (index > -1) {
        const newQuantity = Math.max(0, currentCart[index].quantity + delta);
        
        // Calculate total items to ensure we don't exceed limit
        const totalItems = currentCart.reduce((sum, item) => 
          item.beerId === beerId ? sum : sum + item.quantity, 0) + newQuantity;
          
        if (totalItems <= ORDER_CONFIG.MAX_CANS_PER_ORDER) {
           currentCart[index].quantity = newQuantity;
        }
      }
      return { ...prev, cart: currentCart };
    });
  };

  const totalCans = formData.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCans === 0) {
      alert("Please select at least one beer.");
      return;
    }
    
    if (GAS_URL.includes('PLACEHOLDER')) {
      alert("Please update the Google Apps Script URL in the code.");
      return;
    }

    setStatus('submitting');

    const payload = {
        ...formData,
        type: 'order', // Flag for backend to treat this as an order
        totalCans
    };

    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setStatus('success');
      setFormData(prev => ({ 
          ...prev, 
          cart: prev.cart.map(i => ({...i, quantity: 0})),
          confirmed: false 
      }));
    } catch (error) {
      console.error('Order error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
        <div className="text-center py-12 px-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Order Received!</h3>
            <p className="text-slate-600 mb-6">
                Thank you for your order. We will see you on <br/>
                <span className="font-bold text-slate-900">{pickupDateDisplay}</span> between {ORDER_CONFIG.PICKUP_START_HOUR}:00 and {ORDER_CONFIG.PICKUP_END_HOUR}:00.
            </p>
            <p className="text-sm text-amber-600 font-bold uppercase">Payment upon pickup (Card or Cash)</p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm font-bold text-slate-500 hover:text-slate-900 underline"
            >
                Place another order
            </button>
        </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 uppercase mb-2">Local Pickup Order</h2>
        <p className="text-slate-600 text-sm">
           Exclusively for Andermatt locals. Reserve your cans now.
        </p>
      </div>

      <div className="space-y-8">
        {/* Beer Selection */}
        <div>
          <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wide mb-4 flex justify-between items-center">
             <span>Select Cans</span>
             <span className={`text-xs ${totalCans >= ORDER_CONFIG.MAX_CANS_PER_ORDER ? 'text-red-600' : 'text-slate-400'}`}>
                Limit: {totalCans}/{ORDER_CONFIG.MAX_CANS_PER_ORDER}
             </span>
          </h3>
          <div className="space-y-4">
            {formData.cart.map((item) => {
              const beer = BEERS.find(b => b.id === item.beerId);
              if (!beer) return null;
              
              return (
                <div key={item.beerId} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full bg-white border-2 ${beer.colorClass} flex items-center justify-center flex-shrink-0`}>
                        <img 
                          src={beer.image} 
                          alt={beer.name} 
                          className="w-full h-full object-cover rounded-full opacity-80" 
                        />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900 text-sm leading-tight">{beer.name}</p>
                        <p className="text-xs text-slate-500">{beer.specs.style}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                       type="button" 
                       onClick={() => updateQuantity(item.beerId, -1)}
                       disabled={item.quantity === 0}
                       className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-stone-300 text-slate-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 transition-colors"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-slate-900 w-6 text-center">{item.quantity}</span>
                    <button 
                       type="button" 
                       onClick={() => updateQuantity(item.beerId, 1)}
                       disabled={totalCans >= ORDER_CONFIG.MAX_CANS_PER_ORDER}
                       className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-stone-300 text-slate-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
             <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wide">Your Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
                 />
                 <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
                 />
             </div>
             <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
             />
             <input
                type="text"
                name="address"
                placeholder="Address in Andermatt / Ursern"
                required
                value={formData.address}
                onChange={handleChange}
                className="block w-full rounded-md border-stone-300 bg-stone-50 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
             />
        </div>

        {/* Confirmation */}
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
           <label className="flex items-start gap-3 cursor-pointer">
              <input 
                 type="checkbox" 
                 name="confirmed" 
                 checked={formData.confirmed} 
                 onChange={handleChange}
                 required
                 className="mt-1 h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-800 leading-snug">
                 I confirm that I will pick up my order on <strong>{pickupDateDisplay}</strong> between <strong>{ORDER_CONFIG.PICKUP_START_HOUR}:00</strong> and <strong>{ORDER_CONFIG.PICKUP_END_HOUR}:00</strong>.
              </span>
           </label>
        </div>

        <button
            type="submit"
            disabled={status === 'submitting' || !formData.confirmed || totalCans === 0}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase tracking-wider"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Reserving...
              </>
            ) : (
              <>
                Confirm Order ({totalCans} cans)
                <ShoppingBag className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
      </div>
    </form>
  );
};

export default OrderForm;
