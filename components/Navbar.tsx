import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Mail } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { WideLogo, RoundLogo } from './Logos';

type Language = 'EN' | 'DE' | 'IT' | 'FR';

interface NavbarProps {
    onOpenOrderModal: () => void;
    onOpenNewsletterModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, onOpenNewsletterModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('EN');

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOrderClick = () => {
      setIsOpen(false);
      onOpenOrderModal();
  };

  const handleNewsletterClick = () => {
    setIsOpen(false);
    onOpenNewsletterModal();
  };

  const languages: Language[] = ['EN', 'DE', 'IT', 'FR'];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Side: Logo (Moved to Left as requested) */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center gap-2 group" onClick={(e) => handleNavClick(e, '#hero')}>
                <WideLogo className="h-10 w-auto text-black group-hover:text-amber-600 transition-colors" />
                <span className="sr-only">Brauerei Andermatt</span>
              </a>
            </div>

            {/* Right Side: Hamburger Button (Moved to Right as requested) */}
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors"
                aria-expanded={isOpen}
                aria-label="Open main menu"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-8 w-8" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-stone-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header inside overlay */}
          <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200 bg-stone-50">
             {/* Logo in Menu Header (Left) */}
             <div className="flex items-center gap-2 opacity-50 grayscale">
                 <RoundLogo className="h-10 w-10" />
             </div>

             {/* Close Button on Right to match open button position */}
             <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                aria-label="Close menu"
              >
                <X className="block h-8 w-8" strokeWidth={1.5} />
              </button>
          </div>

          {/* Menu Content */}
          <div className="flex-grow flex flex-col justify-center items-center space-y-8 p-4 overflow-y-auto">
            <nav className="flex flex-col items-center space-y-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-3xl md:text-4xl font-bold text-slate-900 hover:text-amber-600 transition-colors uppercase tracking-tight text-center"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
                <button
                  onClick={handleOrderClick}
                  className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold uppercase tracking-wider rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                   <ShoppingBag className="w-5 h-5" />
                   Order Direct
                </button>
                
                <button
                  onClick={handleNewsletterClick}
                  className="w-full px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-900 text-slate-900 font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2"
                >
                   <Mail className="w-5 h-5" />
                   Newsletter
                </button>
              </div>
            </nav>
          </div>

          {/* Language Switcher */}
          <div className="p-8 border-t border-stone-200 bg-stone-100">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select Language</span>
              <div className="flex space-x-3">
                {languages.map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => setCurrentLang(langCode)}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2
                      ${currentLang === langCode 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-110' 
                        : 'bg-white text-slate-600 border-stone-200 hover:border-amber-500 hover:text-amber-600'}
                    `}
                    aria-label={`Switch to ${langCode}`}
                    aria-pressed={currentLang === langCode}
                  >
                    {langCode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
