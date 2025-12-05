import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import OrderForm from './components/OrderForm';
import NewsletterForm from './components/NewsletterForm';
import { BEERS, PROCESS_STEPS, PARTNERS, DIARY_ENTRIES, FAQS, PHILOSOPHY_SECTIONS, BEER_STAT_GUIDE } from './constants';
import { DiaryEntry } from './types';
import { ChevronDown, MapPin, Beer as BeerIcon, Leaf, Check, Plus, Minus, ArrowRight, Backpack, ExternalLink, X, Cookie, HelpCircle } from 'lucide-react';
import { RoundLogo, WideLogo } from './components/Logos';

const App: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<DiaryEntry | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    // Simulate initial loading time for preloader effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Check cookie consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay banner slightly so it doesn't clash with preloader
      setTimeout(() => setShowCookieBanner(true), 2500);
    }

    return () => clearTimeout(timer);
  }, []);

  const saveConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieBanner(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const openBlog = (e: React.MouseEvent, entry: DiaryEntry) => {
    e.preventDefault();
    setSelectedBlogPost(entry);
    document.body.style.overflow = 'hidden';
  };

  const closeBlog = () => {
    setSelectedBlogPost(null);
    document.body.style.overflow = '';
  };

  const toggleStatsModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const newState = !showStatsModal;
    setShowStatsModal(newState);
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const toggleOrderModal = () => {
      const newState = !showOrderModal;
      setShowOrderModal(newState);
      if (newState) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
  };

  const toggleNewsletterModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const newState = !showNewsletterModal;
    setShowNewsletterModal(newState);
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const getPhilosophyIcon = (iconName: string) => {
    switch(iconName) {
      case 'beer': return <BeerIcon className="h-10 w-10 text-amber-500 mb-4" />;
      case 'leaf': return <Leaf className="h-10 w-10 text-green-500 mb-4" />;
      case 'backpack': return <Backpack className="h-10 w-10 text-amber-500 mb-4" />;
      default: return <Check className="h-10 w-10 text-amber-500 mb-4" />;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-50 flex items-center justify-center animate-fade-out" style={{ animationDelay: '1.5s' }}>
        <div className="w-32 h-32 md:w-48 md:h-48 animate-pulse">
           <RoundLogo className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans animate-in fade-in duration-700">
      <Navbar onOpenOrderModal={toggleOrderModal} onOpenNewsletterModal={toggleNewsletterModal} />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section id="hero" className="relative h-[85vh] min-h-[600px] flex items-center bg-slate-900 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/id/866/1920/1080" 
              alt="Swiss Alpine Landscape" 
              className="w-full h-full object-cover opacity-60 grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
              Brauerei Andermatt: <br/>
              <span className="text-amber-400">Small-Batch Beer.</span> <br/>
              Alpine Character.
            </h1>
            <h2 className="text-lg md:text-2xl text-stone-200 mb-4 max-w-3xl font-medium leading-relaxed">
              Brewed at 1,447 metres in the heart of Switzerland. Locally owned. Independently brewed. Inspired by the Alps and crafted for people who appreciate clean, honest beer.
            </h2>
            <p className="text-stone-300 mb-10 max-w-2xl text-base opacity-90">
              A locally owned and independent microbrewery crafting small-batch beers with big character. Rooted in Andermatt, brewed with passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#beers" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors uppercase tracking-wider">
                Explore Our Beers
              </a>
              <a href="#find-us" className="inline-flex justify-center items-center px-8 py-4 border-2 border-white text-base font-bold rounded-md text-white hover:bg-white hover:text-slate-900 transition-colors uppercase tracking-wider">
                Find Us in Andermatt
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
             <ChevronDown className="h-8 w-8 text-white/50" />
          </div>
        </section>

        {/* BEERS SECTION */}
        <section id="beers" className="py-20 md:py-28 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Our Beers</h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
              
              <button 
                onClick={toggleStatsModal}
                className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors uppercase tracking-wide border border-stone-300 px-4 py-2 rounded-full hover:border-amber-500 hover:bg-white"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                What do these numbers mean?
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {BEERS.map((beer) => (
                <div key={beer.id} className={`bg-white rounded-lg shadow-sm overflow-hidden border-t-4 ${beer.colorClass} hover:shadow-md transition-shadow flex flex-col h-full relative group`}>
                  
                  {/* Image Container with Label Placeholder */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                     <img 
                      src={beer.image || `https://placehold.co/800x600/f5f5f4/1a1a1a?text=${encodeURIComponent(beer.name)}`} 
                      alt={beer.name} 
                      className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${beer.comingSoon ? 'grayscale opacity-70' : ''}`} 
                     />
                     
                     {/* Coming Soon Overlay */}
                     {beer.comingSoon && (
                       <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[2px]">
                         <span className="bg-amber-500 text-slate-900 px-6 py-2 text-lg font-bold uppercase tracking-widest transform -rotate-12 shadow-xl border-2 border-white/50">
                           Coming Soon
                         </span>
                       </div>
                     )}
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{beer.name}</h3>
                    <p className="text-amber-700 font-medium text-sm mb-4 uppercase tracking-wide">{beer.tagline}</p>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">{beer.description}</p>
                  </div>
                  <div className="bg-stone-100 p-4 border-t border-stone-200 text-xs text-slate-500 grid grid-cols-2 gap-y-2">
                    <div><span className="font-bold text-slate-900 block">Style</span> {beer.specs.style}</div>
                    <div><span className="font-bold text-slate-900 block">ABV</span> {beer.specs.abv}</div>
                    <div><span className="font-bold text-slate-900 block">IBU</span> {beer.specs.ibu}</div>
                    <div><span className="font-bold text-slate-900 block">EBC</span> {beer.specs.ebc}</div>
                    <div className="col-span-2"><span className="font-bold text-slate-900 block">Char</span> {beer.specs.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BREWERY & ABOUT SECTION */}
        <section id="brewery" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Where Alpine clarity meets small-batch craft.
                </h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  In the heart of Andermatt, we blend traditional craft with modern technique. Our beers mirror the clarity of the Alps—brewed by hand, rooted in the region, and open to curious visitors.
                </p>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Over 30 years of homebrewing—a passion now scaled into a brewery. High in the Ursern Alps, we brew characterful beers in small batches. We utilize a modern brewhouse and technology for hop-forward excellence.
                </p>
                
                <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Key Capabilities</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    '3HL Brewhouse: Capacity built for precise small batches.',
                    '5 Fermentation Tanks: Dedicated vessels for consistency and control.',
                    'On-Site Canning: Packaged immediately to lock in freshness.',
                    'Kegs (20L): Compact event kegs for partners across the region.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 font-medium">
                      <Check className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                {/* Placeholder for brewery interior shot */}
                <div className="aspect-w-4 aspect-h-3 bg-stone-200 rounded-lg overflow-hidden shadow-lg">
                   <img src="https://picsum.photos/id/447/800/600" alt="Brewery tanks" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CANS (Philosophy) */}
        <section id="philosophy" className="py-20 bg-slate-900 text-stone-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We Choose Cans</h2>
               <p className="text-stone-300 max-w-2xl mx-auto">Bottles feel nostalgic, but if you care about flavour stability and footprint, cans win. That’s why we package our core beers on site within hours of release.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PHILOSOPHY_SECTIONS.map((section, idx) => (
                  <div key={idx} className="bg-slate-800 p-8 rounded-lg border border-slate-700 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      {getPhilosophyIcon(section.icon)}
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded">{section.subtitle}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-white">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.points.map((point, pIdx) => (
                        <li key={pIdx}>
                          <strong className="text-stone-200 block mb-1">{point.title}</strong>
                          <span className="text-slate-400 text-sm leading-snug block">{point.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center uppercase">From Grain to Can</h2>
            
            <div className="relative">
              {/* Desktop connector line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-stone-200 -z-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {PROCESS_STEPS.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-4 border-stone-200 rounded-full flex items-center justify-center text-2xl font-bold text-amber-600 mb-4 group-hover:border-amber-500 transition-colors shadow-sm z-10">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title.split('. ')[1]}</h3>
                    <p className="text-sm text-slate-600 leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FIND US */}
        <section id="find-us" className="py-20 bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 uppercase">Find Our Beer</h2>
                  <p className="text-lg text-slate-600 mb-8">Proudly served at these fine establishments in the Ursern Valley.</p>
                  <div className="space-y-6">
                    {PARTNERS.map((partner, idx) => {
                      const Content = () => (
                        <>
                          <div className="flex-shrink-0 bg-stone-100 p-3 rounded-md group-hover:bg-amber-100 transition-colors">
                            <MapPin className="h-6 w-6 text-amber-600" />
                          </div>
                          <div className="ml-4 flex-grow">
                             <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{partner.name}</h3>
                                {partner.url && <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all" />}
                             </div>
                             <p className="text-sm font-bold text-amber-600 uppercase tracking-wide mb-1">{partner.type}</p>
                             <p className="text-slate-600">{partner.description}</p>
                          </div>
                        </>
                      );

                      return partner.url ? (
                        <a 
                          key={idx} 
                          href={partner.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-start group p-2 -ml-2 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                        >
                          <Content />
                        </a>
                      ) : (
                        <div key={idx} className="flex items-start group p-2 -ml-2">
                          <Content />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-10">
                    <a href="https://maps.google.com/?q=Gotthardstrasse+163,+6490+Andermatt" target="_blank" rel="noreferrer" className="inline-flex items-center font-bold text-amber-600 hover:text-amber-700">
                      Open in Google Maps <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
               </div>
               <div className="bg-stone-100 rounded-lg overflow-hidden h-96 lg:h-auto relative">
                 {/* Static map placeholder */}
                 <img src="https://picsum.photos/id/1036/800/800" alt="Map of Andermatt" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-500" />
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-white/90 px-4 py-2 rounded shadow text-xs font-bold uppercase tracking-widest">Map Placeholder</span>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* DIARY */}
        <section id="diary" className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center uppercase">Brewer's Diary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {DIARY_ENTRIES.map((entry) => (
                 <div key={entry.id} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex flex-col">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-2">{entry.date}</span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex-grow">{entry.title}</h3>
                    <p className="text-slate-600 mb-4 text-sm line-clamp-3">{entry.summary}</p>
                    <button 
                      onClick={(e) => openBlog(e, entry)} 
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors mt-auto flex items-center"
                    >
                      Read more <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center uppercase">FAQ</h2>
            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <div key={index} className="border-b border-stone-200 pb-4">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left focus:outline-none group"
                  >
                    <span className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors pr-4">{faq.question}</span>
                    {openFaqIndex === index ? <Minus className="h-5 w-5 text-amber-500 flex-shrink-0" /> : <Plus className="h-5 w-5 text-stone-400 flex-shrink-0" />}
                  </button>
                  <div className={`mt-2 pr-8 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="py-2">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 uppercase">Get in Touch</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Whether you want to stock our beer, organize a keg for your event, or just say hello.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Address</h3>
                    <p className="text-slate-600">Gotthardstrasse 163<br/>6490 Andermatt<br/>Switzerland</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Email</h3>
                    <p className="text-slate-600 hover:text-amber-600"><a href="mailto:info@brauerei-andermatt.com">info@brauerei-andermatt.com</a></p>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-stone-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
             <WideLogo className="h-8 w-auto text-white" />
             <div className="text-center md:text-left">
                <p className="text-sm mt-1">Alpine Character. Swiss Quality.</p>
             </div>
          </div>
          <div className="flex space-x-6 text-sm flex-wrap justify-center gap-y-4">
             <button onClick={toggleOrderModal} className="hover:text-white transition-colors text-amber-500 font-bold uppercase">Order Direct</button>
             <button onClick={(e) => toggleNewsletterModal(e)} className="hover:text-white transition-colors">Join Mailing List</button>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Imprint</a>
             <a href="https://instagram.com/brauereiandermatt" className="hover:text-white transition-colors">Instagram</a>
          </div>
          <div className="mt-8 md:mt-0 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Brauerei Andermatt.
          </div>
        </div>
      </footer>

      {/* STATS GUIDE MODAL */}
      {showStatsModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => toggleStatsModal()}></div>
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center z-10">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Beer Stats Guide</span>
              <button onClick={() => toggleStatsModal()} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Decoding the Can</h2>
              <p className="text-slate-600 mb-8">{BEER_STAT_GUIDE.intro}</p>
              
              <div className="space-y-10">
                {BEER_STAT_GUIDE.stats.map((stat) => (
                  <div key={stat.code}>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{stat.code}</h3>
                      <span className="text-sm text-slate-500 font-medium">{stat.name}</span>
                    </div>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{stat.description}</p>
                    
                    {stat.scale && (
                      <div className="relative mt-4 mb-2">
                        {/* Scale Visual */}
                        <div className="h-4 w-full rounded-full overflow-hidden flex bg-stone-200">
                          {stat.code === 'EBC' ? (
                            // Gradient style for EBC
                            stat.scale.map((point, idx) => (
                              <div key={idx} style={{ flex: 1, backgroundColor: point.color }}></div>
                            ))
                          ) : (
                             // Gradient Bar for IBU/ABV
                             <div className={`w-full h-full bg-gradient-to-r ${stat.code === 'IBU' ? 'from-green-100 to-green-700' : 'from-blue-100 to-blue-700'}`}></div>
                          )}
                        </div>
                        
                        {/* Scale Labels */}
                        <div className="relative h-10 mt-2 text-xs text-slate-500 font-medium">
                          {stat.code === 'EBC' ? (
                            <div className="flex justify-between w-full text-center">
                               {stat.scale.map((point, idx) => (
                                 <div key={idx} className="flex-1 flex flex-col items-center">
                                    <span className="block font-bold text-slate-900">{point.value}</span>
                                    <span className="block text-[10px] sm:text-xs">{point.label}</span>
                                 </div>
                               ))}
                            </div>
                          ) : (
                             stat.scale.map((point, idx) => (
                               <div 
                                 key={idx} 
                                 className="absolute transform -translate-x-1/2 flex flex-col items-center" 
                                 style={{ left: `${(point.value / (stat.code === 'ABV' ? 12 : 100)) * 100}%` }}
                               >
                                  <div className="w-0.5 h-2 bg-slate-300 mb-1"></div>
                                  <div className="text-center">
                                    <span className="block font-bold text-slate-900 leading-none">{point.value}</span>
                                    <span className="block text-[10px] whitespace-nowrap">{point.label}</span>
                                  </div>
                               </div>
                             ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-end">
               <button onClick={() => toggleStatsModal()} className="text-sm font-bold text-slate-700 hover:text-slate-900 uppercase">
                 Got it
               </button>
            </div>
          </div>
        </div>
      )}

      {/* BLOG MODAL OVERLAY */}
      {selectedBlogPost && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeBlog}></div>
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
             <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center z-10">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{selectedBlogPost.date}</span>
                <button onClick={closeBlog} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                  <X className="h-6 w-6" />
                </button>
             </div>
             <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{selectedBlogPost.title}</h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                   {selectedBlogPost.fullText ? (
                     selectedBlogPost.fullText.split('\n\n').map((paragraph, idx) => (
                       <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                     ))
                   ) : (
                     <p>{selectedBlogPost.summary}</p>
                   )}
                </div>
             </div>
             <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-end">
               <button onClick={closeBlog} className="text-sm font-bold text-slate-700 hover:text-slate-900 uppercase">
                 Close
               </button>
             </div>
          </div>
        </div>
      )}

      {/* ORDER FORM MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={toggleOrderModal}></div>
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center z-10">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Order Direct</span>
              <button onClick={toggleOrderModal} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <OrderForm />
            
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-end">
               <button onClick={toggleOrderModal} className="text-sm font-bold text-slate-700 hover:text-slate-900 uppercase">
                 Cancel
               </button>
            </div>
          </div>
        </div>
      )}

      {/* NEWSLETTER MODAL */}
      {showNewsletterModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={(e) => toggleNewsletterModal(e)}></div>
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="sticky top-0 bg-white px-4 py-3 flex justify-end items-center z-10">
              <button onClick={(e) => toggleNewsletterModal(e)} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-8 pb-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}

      {/* COOKIE BANNER */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-slate-900 text-stone-100 p-6 rounded-lg shadow-2xl border border-slate-700 animate-in slide-in-from-bottom duration-500">
          <div className="flex items-start">
             <Cookie className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1 mr-3" />
             <div>
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Digital Cookies, not Stout Cookies</h4>
                <p className="text-sm text-stone-300 mb-4 leading-snug">
                   We use cookies. Unfortunately, they are digital tracking pixels, not the chewy oatmeal-raisin kind that pairs well with our Stout. We use them to see how many people actually read this banner.
                </p>
                <div className="flex gap-3">
                  <button onClick={saveConsent} className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded text-xs font-bold uppercase transition-colors">
                    I'll drink to that
                  </button>
                  <button onClick={saveConsent} className="text-stone-400 hover:text-white px-2 py-2 text-xs font-bold uppercase transition-colors">
                    Whatever
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
