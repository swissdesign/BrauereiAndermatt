
import { Beer, DiaryEntry, FAQItem, NavItem, Partner, PhilosophySection, BeerStatGuide } from "./types";

// CHANGE THIS URL to your deployed Google Apps Script Web App URL
export const GAS_URL = 'https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_FOR_YOUR_SCRIPT_ID/exec';

export const ORDER_CONFIG = {
  MAX_CANS_PER_ORDER: 24,
  PICKUP_START_HOUR: 17,
  PICKUP_END_HOUR: 18,
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beers', href: '#beers' },
  { label: 'Brewery', href: '#brewery' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Process', href: '#process' },
  { label: 'Find Us', href: '#find-us' },
  { label: 'Diary', href: '#diary' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const BEERS: Beer[] = [
  {
    id: 'helles',
    name: 'Helles – Andermatt Lager',
    tagline: 'The Swiss Army Knife of Beers',
    description: 'Clean, balanced, and always polite. Gentle malt sweetness keeps it smooth while the subtle bitterness lets every conversation flow. Ideal when you want a beer that simply behaves. A smooth malt sweetness upfront with a crisp, slightly dry finish.',
    specs: { style: 'Lager / Helles', abv: '5.0%', ibu: '28', ebc: '6 (Yellow/Gold)', character: 'Honey, herbs, fresh bread' },
    colorClass: 'border-yellow-400',
    image: 'https://placehold.co/800x600/f5f5f4/1a1a1a?text=Helles+Label+Placeholder'
  },
  {
    id: 'weizen',
    name: 'Weizen – Andermatt Wheat',
    tagline: 'The Banana-and-Clove Smoothie',
    description: 'Light, approachable, and so silky it almost apologises. The banana-and-clove smoothie that became beer. Perfect when you want a beer without overthinking it. Soft, bright, and naturally refreshing with a gentle vanilla aromatic twist.',
    specs: { style: 'Wheat Beer / Weissbier', abv: '5.0%', ibu: '18', ebc: '4 (Pale/Hazy)', character: 'Banana, clove, vanilla' },
    colorClass: 'border-amber-400',
    image: 'https://placehold.co/800x600/f5f5f4/1a1a1a?text=Weizen+Label+Placeholder'
  },
  {
    id: 'ipa',
    name: 'IPA – Andermatt IPA',
    tagline: 'A Modern Classic',
    description: 'For everyone who wants to nudge their tastebuds—citrus and pine, bold hops and an honest bitterness to keep you awake. A modern classic brewed with an extra hop bill. Expect bright grapefruit, floral, and pine aromas supported by a smooth malt backbone.',
    specs: { style: 'India Pale Ale', abv: '6.5%', ibu: '50', ebc: '24 (Amber)', character: 'Citrus, pine, bold hops' },
    colorClass: 'border-orange-500',
    image: 'https://placehold.co/800x600/f5f5f4/1a1a1a?text=IPA+Label+Placeholder'
  },
  {
    id: 'teufels',
    name: 'Teufels IPA – DDH (Limited)',
    tagline: 'Alpine Attitude',
    description: 'Double Dry Hopped. Intense. Juicy. Rich hop aroma with citrus, floral notes and a balanced, higher bitterness. Malty body, caramel hints, and a crisp dry finish.',
    specs: { style: 'DDH IPA', abv: '6.5%', ibu: '65', ebc: '24', character: 'Juicy, intense, floral' },
    colorClass: 'border-red-700',
    image: 'https://placehold.co/800x600/f5f5f4/1a1a1a?text=Teufels+Label+Placeholder',
    comingSoon: true
  }
];

export const PHILOSOPHY_SECTIONS: PhilosophySection[] = [
  {
    title: 'Quality',
    subtitle: 'Better for the Beer',
    icon: 'beer',
    points: [
      { title: 'No Light Strike', desc: 'Cans block UV completely—no "skunky" off-notes.' },
      { title: 'Less Oxygen', desc: 'Modern filling lines cut oxygen pickup compared with bottles.' },
      { title: 'Chills Faster', desc: 'Aluminium cools quickly—perfect for everyday moments.' }
    ]
  },
  {
    title: 'Sustainability',
    subtitle: 'Better for the Planet',
    icon: 'leaf',
    points: [
      { title: 'Recycled Content', desc: 'Cans contain 3×–20× more recycled content than bottles.' },
      { title: 'Energy Savings', desc: 'Recycled aluminium saves up to 95% energy compared with primary production.' },
      { title: 'Lower Emissions', desc: 'Lifecycle studies show cans emit less CO₂ per litre than glass.' },
      { title: 'High Recycling Rate', desc: '90% of cans in Switzerland are recycled.' }
    ]
  },
  {
    title: 'Practicality',
    subtitle: 'Better for You',
    icon: 'backpack',
    points: [
      { title: 'Portable', desc: 'Perfect for hiking, après-ski, and lake days.' },
      { title: 'Safe', desc: 'No breakage risk where glass is often banned.' },
      { title: 'Lightweight', desc: 'Easier to carry in your backpack.' }
    ]
  }
];

const UTM_PARAMS = '?utm_source=brauerei-andermatt.com&utm_medium=referral&utm_content=partner_link';

export const PARTNERS: Partner[] = [
  { 
    name: 'Vinothek Andermatt', 
    type: 'Retail & Tasting', 
    description: 'Pick up cans or sit down for a tasting flight.',
    url: `https://vinothek1620.ch${UTM_PARAMS}`
  },
  { 
    name: 'Tavola 1620', 
    type: 'Dining - Coming Soon', 
    description: 'Fine dining in the heart of Andermatt.',
    url: `https://tavola1620.ch${UTM_PARAMS}`
  },
  { 
    name: 'Hotel Restaurant Bären', 
    type: 'Dining & Accommodation', 
    description: 'Enjoy a cold Helles with traditional Swiss cuisine.',
    url: `https://www.baeren-andermatt.ch/${UTM_PARAMS}`
  },
  { 
    name: 'Pinte – Pub & Club', 
    type: 'Nightlife & Après-Ski', 
    description: 'Après-ski and late night pints.',
    url: `https://pinte-andermatt.ch${UTM_PARAMS}`
  },
  {
    name: 'Vertical Drop',
    type: 'Après-Ski (Gurschen)',
    description: 'Located on the Gemsstock. Featuring a special beer brewed for the opening of their new Schirmbar.',
    url: `https://www.andermatt-sedrun-disentis.ch/de/service-providers/apresskibar-rondodrom${UTM_PARAMS}`
  }
];

export const DIARY_ENTRIES: DiaryEntry[] = [
  { 
    id: '1', 
    title: 'From Construction Dust to Copper Kettles', 
    date: 'June 12, 2025', 
    summary: 'A behind-the-scenes look at building a brewery at 1,447 metres. From blasting bedrock to the logistical ballet of guiding 3HL copper kettles into place in Andermatt.',
    fullText: `Building a brewery at 1,447 meters is not for the faint of heart. This post is a look back at the journey, from blasting to the logistical ballet of getting 3HL copper kettles delivered up to Andermatt. To getting the whole thing put together and built over brewing my first batch and dealing with all the hurdles inbetween.

First, go grab a beer or two this is going to take a while...`
  },
  { 
    id: '2', 
    title: 'What Alpine Water Gives to Our Beer', 
    date: 'August 1, 2025', 
    summary: 'Our secret isn\'t magic; it\'s geology. Glacial runoff filtered through granite gives us naturally soft water—a blank canvas.',
    fullText: `The cliché about our “secret” being Alpine water is true – just not the way you think. Glacial runoff filtered through granite yields remarkably soft, pure water. Brewing is over 90 % water, and its minerals shape the final product. Hard water in many cities is loaded with calcium and magnesium, perfect for dark, malty beers like stouts. Our mountain springs, however, have almost none of that.

That means we don’t fight the water; we build on a blank canvas. For our Helles, we add just enough calcium for a crisp finish. For our hop-forward IPA, we design a sulfate profile that makes the hops pop. Brewers in hard-water cities juggle pH and hop rates; we start from zero and tune each batch like an Alpine instrument—bright, precise, free of off-flavors.

Soft water is classically linked to bright, hop-driven beers; the famous Czech pilsner tradition relies on extremely soft water. In our beer, malts and hops speak clearly, unhindered by chalky minerals. And if we decide to brew a rich, malty stout? We’ll add minerals deliberately, mimicking the hardness that shaped those styles.`
  },
  { 
    id: '3', 
    title: 'A Brief History of Beer in Urserntal', 
    date: 'October 29, 2025', 
    summary: 'From mountain passes to the cartel era. Before the Gotthard railway, inns brewed locally. After a century of industrial beer dominance, Brauerei Andermatt is finally bringing brewing back home.',
    fullText: `From mountain passes to the cartel era — Barrels and high Alpine passes never loved each other.

Before the Gotthard railway, inns brewed locally and kept beer cold the hard way. Industrialisation brought big breweries—and Switzerland’s beer cartel (1935–1991), which “harmonised” styles and prices. Creativity moved to basements until the craft boom kicked the doors back open. Hops made beer keep longer, and Bavaria’s 1516 Purity Law standardised water, barley, and hops. Less herb roulette, more consistency—the slow shift from porridge to crisp refreshment.

Ursern Valley: beer, tunnels, and drama.
Andermatt, Hospental, Realp, Goeschenen—long-standing nodes on the north–south route. Beer was poured in inns, but Andermatt itself went centuries without a formally registered brewery. Goeschenen had one during the tunnel boom; then came unpaid bills, a notorious stabbing, and eventually an auction. Plenty of story, not much steady brewing.

20th century: powder snow over copper kettles.
Post-war, the last Uri breweries closed. Andermatt leaned into tourism: skiing, hotels, later the motorway. Beer arrived by truck—reliable, not exactly romantic. Choice lived elsewhere.

2025: Brauerei Andermatt—finally brewing at home.
Now it’s simple: Andermatt has its own officially registered brewery. Small batches, five tanks, clean process—and cans. Yes, cans: better against light and oxygen, chill fast, and are highly recycled in Switzerland. Most importantly, the liquid: soft local spring water, mineralised per style. That means a crisp Helles or a hop-forward ale can both land precisely—bright and clean, minus the glacier dust.

The obvious question — Is this Andermatt’s first official brewery?
Records point to Altdorf, Amsteg, and Goeschenen—but for Andermatt itself there was nothing on the books for a very long time. On today’s evidence, it’s very likely the first officially registered brewery in the village. If someone unearths an old kettle in a cellar, we’ll happily brew a tribute.

Bottom line.
From Sumerian spoon-beer through monastic plans and cartel years to the craft wave, beer has taken the scenic route—often across the Gotthard. It’s time to keep it local. With fresh mountain water, modern kit, and a calm hand, Andermatt now pours a beer with real address. Next time on the Gemsstock or at après-ski, remember: there’s a lot of history in that glass—and a place with character deserves a beer with provenance. Cheers.`
  },
  { 
    id: '4', 
    title: 'Cans, Bottles, and the Honest Choice', 
    date: 'November 5, 2025', 
    summary: 'Heavy glass feels premium, but cans win on all counts: better UV protection, lower carbon footprint, and infinitely recyclable. We chose the best vessel for the liquid.',
    fullText: `Heavy glass may feel premium, but in the Alps and for our beer, cans win on all counts. Three straightforward reasons:

Better for the Beer: Cans block 100 % of UV light—beer’s mortal enemy. They provide a reliable, airtight seal that keeps oxygen out. Worried about metallic taste? Modern interior linings stop any metal flavour.

Better for the Planet: Aluminium is infinitely recyclable, and in the EU, Switzerland, Norway and Iceland 76 % of cans were recycled in 2021. Recycled aluminium uses about 95 % less energy than primary production. Cans are lighter than glass, shrinking the carbon footprint of every shipment.

Better for You: Cans are portable, chill quickly, and are welcome where glass isn’t—on hikes, at the lake. They don’t shatter and are safer to pack.

We care about what’s inside, not nostalgic packaging. If you crave romance, fill a heavy stein; our cans protect the beer and the environment.`
  }
];

export const FAQS: FAQItem[] = [
  { question: 'What makes Brauerei Andermatt unique?', answer: 'We are the only independent microbrewery in Andermatt, brewing at 1,447m altitude. We use naturally soft Alpine water (glacial runoff) which allows us to control the mineral profile perfectly for both crisp Lagers and hoppy IPAs.' },
  { question: 'Why do you use cans instead of bottles?', answer: 'Cans protect beer from light (UV) and oxygen better than glass, ensuring the beer tastes fresher for longer. They are also lighter to transport and highly recyclable, making them the sustainable choice for the Swiss Alps.' },
  { question: 'Can I visit the brewery?', answer: 'We are a working production brewery, but we are open to curious visitors. Please use our contact form to enquire about visits or tastings.' },
  { question: 'Where is the brewery located?', answer: 'We are located at Gotthardstrasse 163, 6490 Andermatt, right in the heart of the Ursern Valley.' },
];

export const PROCESS_STEPS = [
  { title: '1. Milling & Mashing', desc: 'We use Swiss and selected EU malts with multi-step rests for body, fermentability, and style-specific profiles.' },
  { title: '2. Boil & Hops', desc: 'Clean bitterness and expressive late additions—ranging from noble classics to modern aroma cultivars.' },
  { title: '3. Fermentation', desc: 'Temperature-controlled fermentation followed by on-site canning or kegging—freshness guaranteed.' },
  { title: '4. Consistency', desc: 'An automated brewhouse dials in temperatures, timings, and transfers. The craft stays where it belongs: recipe and sensory work.' },
  { title: '5. Andermatt Water Advantage', desc: 'Our alpine water is naturally soft. We tailor minerals for each style, building the perfect profile from the start.' },
];

export const BEER_STAT_GUIDE: BeerStatGuide = {
  intro: "We believe in transparency. Here's a quick guide to the numbers on our cans.",
  stats: [
    {
      code: 'ABV',
      name: 'Alcohol By Volume',
      description: 'The percentage of alcohol in the beer. Higher numbers mean a stronger beer.',
      scale: [
        { label: 'Light', value: 3.5 },
        { label: 'Standard', value: 5.0 },
        { label: 'Strong', value: 7.5 }
      ]
    },
    {
      code: 'IBU',
      name: 'International Bitterness Units',
      description: 'A measure of the actual bitterness contributed by hops. Perceived bitterness depends on the malt balance, but generally:',
      scale: [
        { label: 'Mild (Weizen)', value: 15 },
        { label: 'Crisp (Helles)', value: 28 },
        { label: 'Hoppy (IPA)', value: 50 },
        { label: 'Bitter (DIPA)', value: 70 }
      ]
    },
    {
      code: 'EBC',
      name: 'European Brewery Convention',
      description: 'The color of the beer. Lower numbers are pale straw; higher numbers are dark amber or black.',
      scale: [
        { label: 'Pale', value: 4, color: '#fef3c7' }, // Light yellow
        { label: 'Gold', value: 10, color: '#fbbf24' }, // Gold
        { label: 'Amber', value: 24, color: '#d97706' }, // Amber
        { label: 'Dark', value: 40, color: '#78350f' }, // Brown
        { label: 'Black', value: 80, color: '#1a1a1a' }  // Black
      ]
    }
  ]
};
