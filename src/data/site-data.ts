export type NavItem = {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
};

export type ServiceCard = {
  title: string;
  path: string;
  price: string;
  description: string;
  image: string;
};

export type FleetCard = {
  title: string;
  price: string;
  passengers: string;
  luggage: string;
  image: string;
};

export type ContentPage = {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  points: string[];
};

export type LegalPage = {
  path: string;
  title: string;
  sections: string[];
};

export type BlogPost = {
  path: string;
  title: string;
  category: string;
  description: string;
};

export const company = {
  name: 'Crown Prestige Limousines',
  tagline: "Melbourne's #1 Luxury Chauffeur Service",
  established: 'Est. 1999',
  phone: '1300 965 915',
  phoneHref: 'tel:1300965915',
  mobile: '+61 407 776 706',
  mobileHref: 'tel:+61407776706',
  email: 'bookings@crownprestigelimousines.com.au',
  emailHref: 'mailto:bookings@crownprestigelimousines.com.au',
  address: 'Head Office: Tullamarine VIC 3043',
  hours: 'Mon-Fri 8am-6pm, Sat-Sun 10am-4pm',
  logo: 'https://crownprestigelimousines.com.au/wp-content/uploads/2021/02/crown-prestige-limousines-logo-100x100-1.png',
};

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Locations',
    to: '/chauffeur-service/',
    children: [
      { label: 'Melbourne', to: '/chauffeur-service/chauffeur-melbourne/' },
      { label: 'Sydney', to: '/chauffeur-service/sydney/' },
      { label: 'Brisbane', to: '/chauffeur-service/chauffeur-service-brisbane/' },
      { label: 'Gold Coast', to: '/chauffeur-service/gold-coast-chauffeur-service/' },
      { label: 'Adelaide', to: '/chauffeur-service/adelaide/' },
    ],
  },
  {
    label: 'Services',
    to: '/services/',
    children: [
      { label: 'Airport Transfers', to: '/chauffeur-service/chauffeur-melbourne/airport-transfer-melbourne-airport/' },
      { label: 'Chauffeur Service', to: '/chauffeur-service/chauffeur-melbourne/chauffeur-service-melbourne/' },
      { label: 'Stretch Limo Hire', to: '/services/limo-hire-melbourne/' },
      { label: 'HUMMER Limo Hire', to: '/hummer-limo-hire/' },
      { label: 'Wedding Car Hire', to: '/services/wedding-car-hire-melbourne/' },
    ],
  },
  {
    label: 'Airport',
    children: [
      { label: 'Melbourne Airport Transfer', to: '/chauffeur-service/chauffeur-melbourne/airport-transfer-melbourne-airport/' },
      { label: 'Sydney Airport Transfers', to: '/chauffeur-service/sydney/airport-transfers/' },
      { label: 'Brisbane Airport Transfers', to: '/chauffeur-service/airport-transfers/' },
      { label: 'Gold Coast Airport Transfers', to: '/gold-coast-airport-transfers/' },
      { label: 'Adelaide Airport Transfer', to: '/adelaide-airport-transfers/' },
    ],
  },
  {
    label: 'Fleet',
    to: '/our-fleet/',
    children: [
      { label: 'Chauffeur Cars Fleet', to: '/our-fleet/' },
      { label: 'People Mover Hire', to: '/people-mover-hire-melbourne/' },
      { label: 'Minivan – Minibus – Coach', to: '/services/minibus-hire-melbourne/' },
      { label: 'Minibus Hire', to: '/mini-bus-hire-melbourne/' },
      { label: 'Bus Hire Adelaide', to: '/chauffeur-service/bus-hire-adelaide/' },
    ],
  },
  {
    label: 'Contact',
    to: '/contact/',
    children: [
      { label: 'Our History', to: '/about-us/' },
      { label: 'Blog', to: '/blog-2/' },
      { label: 'Privacy Policy', to: '/privacy-policy/' },
      { label: 'Reservation Agreement', to: '/reservation-agreement/' },
      { label: 'Terms and Conditions', to: '/terms-and-conditions/' },
    ],
  },
];

export const heroStats = [
  { value: '10,000+', label: 'Satisfied customers' },
  { value: '450+', label: 'Vehicles across partner fleet' },
  { value: '24/7', label: 'Booking support' },
  { value: '5', label: 'Major cities served' },
];

export const trustPoints = [
  'Fixed rates with no hidden costs',
  'STV-accredited professional chauffeurs',
  'Airport, wedding, executive, and group specialists',
  'Nationwide coverage across Melbourne and major Australian cities',
];

export const serviceCards: ServiceCard[] = [
  {
    title: 'Melbourne Airport Transfers',
    path: '/chauffeur-service/chauffeur-melbourne/airport-transfer-melbourne-airport/',
    price: 'From $99',
    description:
      'Fixed-price airport transfers with live flight tracking, meet-and-greet service, and polished chauffeurs for domestic and international arrivals.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/cheap-chauffeur-melbourne.jpg',
  },
  {
    title: 'Wedding Car Hire Melbourne',
    path: '/services/wedding-car-hire-melbourne/',
    price: 'From $250',
    description:
      'Elegant wedding transport with white ribbons, red carpet service, champagne, and coordinated bridal party logistics.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_2296.jpeg',
  },
  {
    title: 'Corporate Chauffeur Service',
    path: '/chauffeur-service/chauffeur-melbourne/chauffeur-service-melbourne/',
    price: 'From $110',
    description:
      'Discreet executive travel for airport pickups, roadshows, board meetings, and premium client hosting.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/Chauffeur-melbourne.jpg',
  },
  {
    title: 'Limousine Hire Melbourne',
    path: '/services/limo-hire-melbourne/',
    price: 'From $350',
    description:
      'Chrysler and Hummer stretch limousines for birthdays, formals, bucks, hens, and VIP event arrivals.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/05/limo-hire-melbourne-chrysler-stretch-limo-11.jpg',
  },
  {
    title: 'Winery Tours',
    path: '/book-now/',
    price: 'Custom quote',
    description:
      'Private winery and day tours through Yarra Valley, Mornington Peninsula, and other premium destinations.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/Yarra-Valley.jpg',
  },
  {
    title: 'Group Transfers and Bus Hire',
    path: '/services/minibus-hire-melbourne/',
    price: 'From $150',
    description:
      'Mercedes people movers, minibuses, and coaches for conferences, sporting events, school groups, and special occasions.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/Crown-Prestige-Limousines-Mercedes-Benz-minivan-minibus-Fleet.jpg',
  },
];

export const fleetCards: FleetCard[] = [
  {
    title: 'Mercedes Sedan Fleet',
    price: 'Starting $95',
    passengers: 'Up to 4 passengers',
    luggage: '2 large cases + 3 carry-ons',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/new-portrait-12-800x800-1.jpg',
  },
  {
    title: 'European Prestige Sedan',
    price: 'Starting $150 (3 hrs+)',
    passengers: 'Up to 4 passengers',
    luggage: '2 large cases + 3 carry-ons',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/premium-chauffeur-service-melbourne.jpg',
  },
  {
    title: 'Mercedes People Mover',
    price: 'From $100',
    passengers: '4 to 7 passengers',
    luggage: '6 large cases + 3 cabin bags',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_9808.jpeg',
  },
  {
    title: 'Mercedes Sprinter Minibus',
    price: 'From $150',
    passengers: '8 to 18 passengers',
    luggage: '11 to 16 large cases',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_4908.jpeg',
  },
  {
    title: 'Chrysler Stretch Limousine',
    price: 'Starting $350 (3 hrs+)',
    passengers: '10 to 12 passengers',
    luggage: '4 large cases + 4 carry-ons',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/05/limo-hire-melbourne-chrysler-stretch-limo-12.jpg',
  },
  {
    title: 'Hummer Stretch Limousine',
    price: 'Starting $450 (3 hrs+)',
    passengers: '15 to 24 passengers',
    luggage: '4 large cases + 4 carry-ons',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/05/hummer-limo-hire-melbourne-whitek18.jpg',
  },
];

export const locationSummaries = [
  {
    title: 'Melbourne',
    path: '/chauffeur-service/chauffeur-melbourne/',
    description:
      'Luxury chauffeur service, airport transfers, weddings, and corporate travel throughout Melbourne and regional Victoria.',
  },
  {
    title: 'Sydney',
    path: '/chauffeur-service/sydney/',
    description:
      'Premium transfers across Sydney with airport, city, and event transport supported by a large multi-vehicle fleet.',
  },
  {
    title: 'Adelaide',
    path: '/chauffeur-service/adelaide/',
    description:
      'Airport transfers, wedding transport, chauffeur cars, and bus hire service across Adelaide and surrounds.',
  },
  {
    title: 'Brisbane',
    path: '/chauffeur-service/chauffeur-service-brisbane/',
    description:
      'Executive chauffeur transport, airport pickups, and luxury car hire for Brisbane business and leisure travellers.',
  },
  {
    title: 'Gold Coast',
    path: '/chauffeur-service/gold-coast-chauffeur-service/',
    description:
      'Tourist, airport, and private luxury transfers throughout the Gold Coast and South East Queensland.',
  },
];

export const testimonials = [
  {
    quote:
      'The chauffeur was early, the vehicle was spotless, and the experience felt calm and premium from pickup to arrival.',
    name: 'Corporate Travel Client',
  },
  {
    quote:
      'Our wedding cars were beautifully presented and perfectly timed. It made the day feel much more polished.',
    name: 'Melbourne Wedding Booking',
  },
  {
    quote:
      'Excellent communication, clean vehicles, and a much better experience than standard transfers for our interstate group.',
    name: 'Group Transfers Client',
  },
];

export const faqs = [
  {
    question: 'Do you offer fixed pricing?',
    answer:
      'Yes. Crown Prestige is positioned around fixed, transparent rates with no hidden costs and no surprise surge pricing for pre-booked work.',
  },
  {
    question: 'Can you handle large groups?',
    answer:
      'Yes. The fleet spans sedans, people movers, minibuses, stretch limousines, and coach options for 4 to 55 passengers.',
  },
  {
    question: 'Do you monitor flights for airport transfers?',
    answer:
      'Yes. Airport work includes live flight monitoring so pickups can adjust for early arrivals and delays.',
  },
  {
    question: 'Which cities do you cover?',
    answer:
      'Melbourne, Sydney, Adelaide, Brisbane, and Gold Coast are represented, with private transfers and special-event transport available across Australia.',
  },
];

export const servicePages: ContentPage[] = [
  {
    path: '/services/wedding-car-hire-melbourne/',
    title: 'Melbourne Wedding Car Hire',
    eyebrow: 'Wedding Transport',
    description:
      'Elegant wedding transport with premium sedans, European prestige cars, stretch limousines, and professional chauffeurs for every stage of the day.',
    image: 'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_2296.jpeg',
    points: [
      'White ribbons, red carpet service, and complimentary champagne available',
      'Vehicle options for intimate couples, bridal parties, and guest transfers',
      'Photo-stop coordination and professionally presented chauffeurs',
      'Coverage across Melbourne CBD, Yarra Valley, Mornington Peninsula, and regional venues',
    ],
  },
  {
    path: '/services/minibus-hire-melbourne/',
    title: 'Minibus Hire Melbourne',
    eyebrow: 'Group Transport',
    description:
      'Premium minibus and coach hire for school groups, events, conferences, winery tours, airport groups, and special occasions.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/Mercedes-benz-Sprinter-mini-bus-hire-melbourne.jpg',
    points: [
      'Mercedes-Benz Sprinter and larger coach options for 8 to 55 passengers',
      'Perfect for transfers, sporting fixtures, day tours, and corporate shuttles',
      'Luggage trailers and coordinated multi-vehicle logistics available',
      'Experienced drivers and clear scheduling support for organisers',
    ],
  },
  {
    path: '/services/limo-hire-melbourne/',
    title: 'Melbourne Limo Hire',
    eyebrow: 'Stretch Limos',
    description:
      'Celebrate in style with Chrysler and Hummer stretch limousines built for unforgettable arrivals and polished event transport.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/05/limo-hire-melbourne-chrysler-stretch-limo-11.jpg',
    points: [
      'Popular for birthdays, school formals, hens, bucks, and milestone celebrations',
      '10 to 26 passenger configurations across select limousine options',
      'Premium interiors, party-ready ambience, and experienced chauffeurs',
      'Ideal for city cruising, event transfers, and VIP occasions',
    ],
  },
  {
    path: '/people-mover-hire-melbourne/',
    title: 'People Mover Hire Melbourne for Events and Airport',
    eyebrow: 'People Movers',
    description:
      'Luxury people movers with room for luggage, family travel, airport runs, executive groups, and event transport across Melbourne.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/luxury-chauffeur-service-melbourne.jpg',
    points: [
      'Mercedes V-Class and similar premium people mover options',
      'Comfortable transfers for 4 to 7 passengers with generous luggage capacity',
      'Suitable for business, airport, weddings, and private group travel',
      'Excellent value for families and small executive teams',
    ],
  },
  {
    path: '/hummer-limo-hire/',
    title: 'HUMMER Limo Hire',
    eyebrow: 'Hummer Fleet',
    description:
      'Make a statement with black and white Hummer stretch limousines for large-group celebrations and headline arrivals.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/05/hummer-limo-hire-melbourne-black18.jpg',
    points: [
      'Large-format stretch limo experience for 15 to 24 passengers',
      'Popular for birthdays, nightlife transfers, weddings, and VIP events',
      'Bold styling with spacious interior layouts',
      'Chauffeur-driven service focused on timing, safety, and occasion management',
    ],
  },
  {
    path: '/chauffeur-service/chauffeur-melbourne/airport-transfer-melbourne-airport/',
    title: 'Luxury Melbourne Airport Transfers',
    eyebrow: 'Airport Specialists',
    description:
      'Private Melbourne Airport transfers with fixed rates, polished vehicles, and real-time flight tracking from terminal to destination.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/cheap-chauffeur-melbourne.jpg',
    points: [
      'Meet-and-greet service and smart terminal coordination',
      'Domestic and international airport pickup coverage',
      'Ideal for business travellers, families, and VIP arrivals',
      'Sedans, people movers, minibuses, and stretch limousines available',
    ],
  },
  {
    path: '/chauffeur-service/sydney/airport-transfers/',
    title: 'Sydney Airport Transfers',
    eyebrow: 'Airport Specialists',
    description:
      'Premium Sydney Airport transfers with professional chauffeurs, flight tracking, and meet-and-greet service at all terminals.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/cheap-chauffeur-melbourne.jpg',
    points: [
      'Meet-and-greet service inside domestic and international terminal arrivals',
      'Real-time flight tracking to adjust pickup times for delays or early landings',
      'Complimentary waiting time: 30 minutes domestic / 60 minutes international',
      'Private luxury sedans and premium people movers for individual or group transfers',
    ],
  },
  {
    path: '/chauffeur-service/airport-transfers/',
    title: 'Brisbane Airport Transfers',
    eyebrow: 'Airport Specialists',
    description:
      'Seamless, fixed-price Brisbane Airport transfers. Professional chauffeurs, flight monitoring, and prestige vehicles for stress-free travel.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/Crown-Prestige-Limousines-Mercedes-Benz-minivan-minibus-Fleet.jpg',
    points: [
      'Dedicated meet-and-greet at Brisbane Airport arrivals hall',
      'Live flight tracking with automatic adjustments for timing updates',
      'Accredited professional drivers committed to punctuality and premium service',
      'Sedans and spacious people movers for family or business travellers',
    ],
  },
  {
    path: '/gold-coast-airport-transfers/',
    title: 'Gold Coast Airport Transfers',
    eyebrow: 'Airport Specialists',
    description:
      'Reliable luxury airport transfers for Gold Coast Airport (OOL) and Brisbane Airport (BNE) to your hotel, resort, or residence.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/cheap-chauffeur-melbourne.jpg',
    points: [
      'Servicing Gold Coast Coolangatta Airport and transfers from Brisbane Airport',
      'Flight arrival monitoring and paging board meet-and-greet support',
      'Chauffeurs assist with luggage loading and hotel transfer coordination',
      'Fixed price packages with child seats and booster seats available on request',
    ],
  },
  {
    path: '/adelaide-airport-transfers/',
    title: 'Adelaide Airport Transfers',
    eyebrow: 'Airport Specialists',
    description:
      'Polished, private airport transfers in Adelaide. Meet-and-greet, live flight tracking, and premium chauffeur service for arrivals and departures.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_4909.jpeg',
    points: [
      'Direct, flat-rate transport between Adelaide Airport and all metropolitan suburbs',
      'Chauffeurs monitor flight statuses to align with your touchdown time',
      'Comfortable executive sedans and Mercedes people movers',
      'Professional meet-and-greet with paging assistance',
    ],
  },
  {
    path: '/mini-bus-hire-melbourne/',
    title: 'Minibus Hire Melbourne',
    eyebrow: 'Group Transport',
    description:
      'Luxury minibus hire in Melbourne for corporate groups, weddings, tours, and special events. Up to 18-passenger capacities with driver.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/Mercedes-benz-Sprinter-mini-bus-hire-melbourne.jpg',
    points: [
      'Mercedes-Benz Sprinter luxury van and minibus configurations',
      'Perfect for corporate events, team shuttles, winery tours, and guest logistics',
      'Equipped with comfortable seating, dual-zone climate control, and privacy glass',
      'Accredited professional drivers with extensive experience in group transport',
    ],
  },
  {
    path: '/chauffeur-service/bus-hire-adelaide/',
    title: 'Bus Hire Adelaide',
    eyebrow: 'Adelaide Group Transport',
    description:
      'Private bus and minibus hire with driver in Adelaide for group travel, winery tours, events, and airport transport.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_4908.jpeg',
    points: [
      'Minibus and charter bus hire options for Adelaide and regional tours',
      'Winery day-trip transport for Barossa Valley, McLaren Vale, and Adelaide Hills',
      'Professional group transport coordination for weddings, corporate and social events',
      'Reliable airport transfers for large tour groups and athletic clubs',
    ],
  },
];

export const chauffeurPages: ContentPage[] = [
  {
    path: '/chauffeur-service/chauffeur-melbourne/',
    title: 'Chauffeur Melbourne | Luxury Chauffeur Service Melbourne',
    eyebrow: 'Melbourne Chauffeurs',
    description:
      'Luxury chauffeur service in Melbourne for airport travel, business, weddings, events, tours, and premium private transfers.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/Chauffeur-melbourne.jpg',
    points: [
      'Corporate, personal, and event-focused chauffeur work across Melbourne',
      'Premium sedans, prestige European vehicles, people movers, and group transport',
      'Strong focus on punctuality, presentation, and customer care',
      'Available for transfers, hourly bookings, and tailored itineraries',
    ],
  },
  {
    path: '/chauffeur-service/chauffeur-melbourne/chauffeur-service-melbourne/',
    title: 'Chauffeur Hire Melbourne',
    eyebrow: 'Executive Travel',
    description:
      'A refined chauffeur hire solution for executives, VIPs, client hospitality, and high-standard private travel requirements.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/premium-chauffeur-service-melbourne.jpg',
    points: [
      'Designed for corporate roadshows, airport meetups, and full-day bookings',
      'Quiet, polished vehicles suited to business conversations and productivity',
      'Discreet, experienced chauffeurs with presentation standards that fit premium brands',
      'Strong fit for concierge teams, executive assistants, and personal bookings',
    ],
  },
];

export const locationPages: ContentPage[] = [
  {
    path: '/chauffeur-service/',
    title: 'Locations',
    eyebrow: 'Australia Coverage',
    description:
      'Crown Prestige Limousines delivers premium transport across major Australian cities with consistent service standards and flexible fleet options.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/Crown-Prestige-Limousines-Mercedes-Benz-minivan-minibus-Fleet.jpg',
    points: [
      'Melbourne, Sydney, Adelaide, Brisbane, and Gold Coast coverage',
      'Airport transfers, weddings, executive travel, and large group movement plans',
      'Sedans, limousines, people movers, minibuses, and coaches',
      'Professional dispatch, fixed pricing, and premium presentation',
    ],
  },
  {
    path: '/chauffeur-service/sydney/',
    title: 'Sydney',
    eyebrow: 'Sydney Chauffeur Service',
    description:
      'Luxury transport in Sydney for airport travel, business bookings, events, private transfers, and premium group journeys.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/cheap-chauffeur-melbourne.jpg',
    points: [
      'Sydney Airport transfer support and point-to-point luxury transport',
      'Vehicles available for solo travellers, executives, and larger groups',
      'Suitable for city hotels, events, and itinerary-based travel',
      'Backed by a broad service mix and premium presentation',
    ],
  },
  {
    path: '/chauffeur-service/adelaide/',
    title: 'Adelaide',
    eyebrow: 'Adelaide Chauffeur Service',
    description:
      'Premium chauffeur transport in Adelaide with airport, wedding, event, and private car hire support.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2025/06/IMG_4909.jpeg',
    points: [
      'Airport transfers, chauffeur car hire, wedding transport, and bus hire',
      'Luxury sedans through to larger group vehicles available',
      'Useful for both private travel and corporate movement plans',
      'Professional presentation with clear scheduling and support',
    ],
  },
  {
    path: '/chauffeur-service/chauffeur-service-brisbane/',
    title: 'Brisbane Chauffeur Service',
    eyebrow: 'Brisbane Chauffeurs',
    description:
      'Executive chauffeur transport, airport pickups, and luxury car hire for Brisbane business and leisure travellers.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/02/Crown-Prestige-Limousines-Mercedes-Benz-minivan-minibus-Fleet.jpg',
    points: [
      'Professional airport transfers for Brisbane (BNE) and domestic terminals',
      'Luxury sedans, corporate people movers, and sprinter coaches',
      'Accredited, professional chauffeurs with extensive local route knowledge',
      'Fixed pricing with online booking and email invoice statements',
    ],
  },
  {
    path: '/chauffeur-service/gold-coast-chauffeur-service/',
    title: 'Gold Coast Chauffeur Service',
    eyebrow: 'Gold Coast Chauffeurs',
    description:
      'Tourist, airport, and private luxury transfers throughout the Gold Coast and South East Queensland.',
    image:
      'https://crownprestigelimousines.com.au/wp-content/uploads/2026/01/cheap-chauffeur-melbourne.jpg',
    points: [
      'Airport transfers serving Gold Coast Airport (OOL) and Brisbane Airport (BNE)',
      'Prestige vehicles for private tours, theme parks, and corporate hosting',
      'Accredited professional chauffeurs with strict attention to timing and safety',
      'Transparent flat rates with no peak-hour or traffic surcharge additions',
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    path: '/chauffeur-hire-service-melbourne/',
    title: 'Chauffeur Hire Service Melbourne',
    category: 'Insights',
    description:
      'Why chauffeur services have become a premium transport choice for Melbourne business travel, tourism, and special occasions.',
  },
  {
    path: '/premium-chauffeur-service-in-melbourne/',
    title: 'How to Get Affordable Premium Chauffeur Service in Melbourne?',
    category: 'Guides',
    description:
      'Practical guidance on finding a high-quality chauffeur service without sacrificing value, professionalism, or reliability.',
  },
  {
    path: '/wedding-car-hire-melbourne-prices/',
    title: 'Wedding Car Hire Melbourne Prices | 2026 Cost Guide',
    category: 'Wedding Planning',
    description:
      'A breakdown of popular wedding vehicle types, estimated price ranges, and what couples should factor into transport budgets.',
  },
];

export const legalPages: LegalPage[] = [
  {
    path: '/reservation-agreement/',
    title: 'Reservation Agreement',
    sections: [
      'All bookings are subject to vehicle availability, trip timing, and confirmation by Crown Prestige Limousines.',
      'Quoted pricing is based on the itinerary supplied at the time of booking and may change if the booking scope changes.',
      'Extra waiting time, route changes, damage, excessive cleaning, or unapproved overtime may attract additional charges.',
      'Passenger counts, luggage details, and contact information must be provided accurately to avoid service delays.',
    ],
  },
  {
    path: '/privacy-policy/',
    title: 'Privacy Policy',
    sections: [
      'Customer details are collected to provide quotations, confirm bookings, coordinate transport, and maintain service quality.',
      'Information may include names, contact details, pickup data, and travel preferences relevant to the booking.',
      'Crown Prestige Limousines treats booking data as confidential and only uses it to deliver services, support communication, and improve operations.',
      'For privacy enquiries or data update requests, contact the booking team directly via email or phone.',
    ],
  },
  {
    path: '/terms-and-conditions/',
    title: 'Terms and Conditions',
    sections: [
      'Pre-booked services operate according to the confirmed itinerary, agreed pricing, and vehicle class assigned to the reservation.',
      'Customers are responsible for providing correct pickup details, passenger numbers, and timing information.',
      'Alcohol, smoking, unsafe behaviour, or damage inside vehicles may lead to service refusal or additional charges.',
      'Cancellation timing, peak period availability, and special event reservations may be subject to separate conditions at the time of quote.',
    ],
  },
];

export const footerGroups = [
  {
    title: 'Core Pages',
    links: [
      { label: 'Services', to: '/services/' },
      { label: 'Our Fleet', to: '/our-fleet/' },
      { label: 'Book Now', to: '/book-now/' },
      { label: 'Blog', to: '/blog-2/' },
    ],
  },
  {
    title: 'Popular Services',
    links: serviceCards.map((service) => ({ label: service.title, to: service.path })),
  },
  {
    title: 'Locations',
    links: locationSummaries.map((location) => ({ label: location.title, to: location.path })),
  },
];
