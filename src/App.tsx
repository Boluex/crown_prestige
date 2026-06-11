import { useEffect, useMemo, useState, useRef } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ChevronDown,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  ShieldCheck,
  SunMedium,
  Users,
  X,
  PhoneCall,
  Star,
} from 'lucide-react';


import { FloatingPaths } from '@/components/ui/background-paths';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { Button } from '@/components/ui/button';
import { Gallery4 } from '@/components/ui/gallery4';
import { WelcomeScreen } from '@/components/ui/welcome-screen';
import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryImage,
  StoryOverlay,
  StoryTitle,
} from '@/components/ui/stories-carousel';

import {
  blogPosts,
  chauffeurPages,
  company,
  faqs,
  fleetCards,
  footerGroups,
  heroStats,
  legalPages,
  locationPages,
  locationSummaries,
  navItems,
  serviceCards,
  servicePages,
  testimonials,
  trustPoints,
  type BlogPost,
  type ContentPage,
  type LegalPage,
} from '@/data/site-data';

// ============================================================
// ANIMATION UTILITIES & INTERACTIVE COMPONENTS
// ============================================================

// Magnetic hover effect for primary buttons/CTAs
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Magnetic pull: pull up to 35% of offset distance
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// Mouse-following glow spotlight card (sharp corners)
function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-none border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(184, 150, 62, 0.08), transparent 85%)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

// Staggered word reveal for display titles
function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => (
        <motion.span
          variants={child}
          className="inline-block mr-[0.25em]"
          key={idx}
        >
          {word === 'Prestige.' ? (
            <em className="text-gold-gradient font-display italic not-transform font-normal animate-gold-shimmer">
              Prestige.
            </em>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Typewriter typing animation component
function Typewriter({ className = '' }: { className?: string }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 9000); // 9 seconds loop (2s typing, 7s reading pause)
    return () => clearInterval(interval);
  }, []);

  const segments = [
    { text: 'Arrive in ', style: '' },
    { text: 'Prestige.', style: 'text-gold-gradient font-display italic not-transform font-normal animate-gold-shimmer' },
    { text: '\nEvery Journey, Perfected.', style: '' }
  ];

  const chars = segments.flatMap((seg) =>
    seg.text.split('').map((char) => ({ char, style: seg.style }))
  );

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const charVariant = {
    hidden: { opacity: 0, display: 'none' },
    visible: {
      opacity: 1,
      display: 'inline',
    },
  };

  return (
    <motion.span
      key={key}
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {chars.map((item, idx) => {
        if (item.char === '\n') {
          return (
            <motion.span key={idx} variants={charVariant}>
              <br />
            </motion.span>
          );
        }
        return (
          <motion.span
            key={idx}
            variants={charVariant}
            className={item.style || undefined}
          >
            {item.char}
          </motion.span>
        );
      })}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 translate-y-[0.05em]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(2)' }}
      />
    </motion.span>
  );
}

// Fade up scroll reveal wrapper
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('crown-theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('crown-theme', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
}

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Lock scroll while welcome screen is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const allContentPages = useMemo(
    () => [...servicePages, ...chauffeurPages, ...locationPages],
    [],
  );

  return (
    <div className="min-h-screen bg-background text-foreground-body transition-colors duration-500">
      <AnimatePresence mode="wait">
        {loading && (
          <WelcomeScreen key="welcome" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <ScrollToTop />
      <SiteHeader theme={theme} toggleTheme={toggleTheme} />
      <main className="pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/" element={<ServicesHubPage />} />
          <Route path="/our-fleet/" element={<FleetPage />} />
          <Route path="/about-us/" element={<AboutPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/book-now/" element={<BookingPage />} />
          <Route path="/blog-2/" element={<BlogIndexPage />} />
          {allContentPages.map((page) => (
            <Route key={page.path} path={page.path} element={<DetailPage page={page} />} />
          ))}
          {legalPages.map((page) => (
            <Route key={page.path} path={page.path} element={<LegalContentPage page={page} />} />
          ))}
          {blogPosts.map((post) => (
            <Route key={post.path} path={post.path} element={<BlogPostPage post={post} />} />
          ))}
          <Route path="*" element={<NotFoundPage pathname={location.pathname} />} />
        </Routes>
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </div>
  );
}

// ============================================================
// SITE HEADER COMPONENT
// ============================================================
function SiteHeader({
  theme,
  toggleTheme,
}: {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setMobileExpandedItem(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isParentActive = (item: typeof navItems[0]) => {
    if (item.to && location.pathname === item.to) return true;
    if (item.children) {
      return item.children.some((child) => location.pathname === child.to);
    }
    return false;
  };

  const isHome = location.pathname === '/';

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-400 border-b',
        (scrolled || !isHome)
          ? 'bg-overlay-nav/95 backdrop-blur-xl border-b border-border/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link className="flex min-w-0 items-center gap-4 z-50" to="/">
          <img className="h-12 w-auto object-contain sm:h-14 transition duration-300 hover:scale-105" src={company.logo} alt={company.name} />
          <div className="min-w-0">
            <p className="text-lg font-display font-medium text-white leading-tight tracking-wide">{company.name}</p>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-primary uppercase mt-1 leading-none">Limousines</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const active = isParentActive(item);
            return (
              <div
                key={item.label}
                className="relative group py-2"
                onMouseEnter={() => {
                  if (hasChildren) setActiveDropdown(item.label);
                }}
                onMouseLeave={() => {
                  if (hasChildren) setActiveDropdown(null);
                }}
              >
                {item.to ? (
                  <NavLink
                    className={[
                      'text-[13px] font-medium tracking-wider transition py-1 hover:text-primary flex items-center gap-1.5 cursor-pointer',
                      active ? 'text-primary' : 'text-white/70',
                    ].join(' ')}
                    to={item.to}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 transition-transform duration-300',
                          activeDropdown === item.label ? 'rotate-180 text-primary' : 'opacity-65'
                        ].join(' ')}
                      />
                    )}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    className={[
                      'text-[13px] font-medium tracking-wider transition py-1 hover:text-primary flex items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none p-0',
                      active ? 'text-primary' : 'text-white/70',
                    ].join(' ')}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 transition-transform duration-300',
                          activeDropdown === item.label ? 'rotate-180 text-primary' : 'opacity-65'
                        ].join(' ')}
                      />
                    )}
                  </button>
                )}

                {hasChildren && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute left-0 top-full pt-3 w-64 z-50 pointer-events-auto"
                      >
                        <div className="bg-[#111111]/95 backdrop-blur-2xl border border-border/80 p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-none">
                          {item.to && (
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                [
                                  'block text-[11px] uppercase tracking-[0.15em] font-semibold py-2.5 px-4 border-b border-border/40 transition-all duration-300 rounded-none mb-1 text-primary hover:bg-white/5 hover:pl-5',
                                  isActive ? 'pl-5' : '',
                                ].join(' ')
                              }
                            >
                              View All {item.label}
                            </NavLink>
                          )}
                          {item.children!.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              className={({ isActive }) =>
                                [
                                  'block text-[11px] uppercase tracking-[0.15em] font-medium py-2.5 px-4 transition-all duration-300 rounded-none',
                                  isActive
                                    ? 'text-primary bg-white/5 pl-5 border-l border-primary/50'
                                    : 'text-white/75 hover:text-primary hover:bg-white/5 hover:pl-5',
                                ].join(' ')
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 z-50">
          {/* Theme Switcher Toggle */}
          <button
            className="theme-toggle relative w-11 h-6 rounded-full bg-white/10 border border-white/20 transition duration-400 overflow-hidden flex items-center px-1 cursor-pointer"
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle Theme"
          >
            <motion.div
              layout
              className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
              animate={{ x: theme === 'dark' ? 18 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              {theme === 'dark' ? (
                <Moon className="h-2.5 w-2.5 text-white" />
              ) : (
                <SunMedium className="h-2.5 w-2.5 text-white" />
              )}
            </motion.div>
          </button>

          <Magnetic>
            <Link
              className="hidden rounded-none bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition duration-350 hover:bg-primary-dark shadow-[0_4px_20px_rgba(184,150,62,0.25)] md:inline-flex btn-shimmer overflow-hidden relative"
              to="/book-now/"
            >
              Book Now
            </Link>
          </Magnetic>

          <button
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 justify-center items-center h-8 w-8 lg:hidden cursor-pointer"
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            <span className={['w-6 h-[1.5px] bg-white transition-transform duration-300', open ? 'rotate-45 translate-y-2' : ''].join(' ')} />
            <span className={['w-6 h-[1.5px] bg-white transition-opacity duration-300', open ? 'opacity-0' : ''].join(' ')} />
            <span className={['w-6 h-[1.5px] bg-white transition-transform duration-300', open ? '-rotate-45 -translate-y-2' : ''].join(' ')} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[68px] bottom-0 z-40 bg-overlay-nav/95 backdrop-blur-2xl border-t border-border lg:hidden overflow-y-auto py-8 px-6 flex flex-col items-center"
          >
            <div className="w-full max-w-sm flex flex-col gap-4">
              {navItems.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                const active = isParentActive(item);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    key={item.label}
                    className="w-full border-b border-white/10 pb-2"
                  >
                    {hasChildren ? (
                      <div className="w-full">
                        <button
                          type="button"
                          onClick={() => setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label)}
                          className="flex justify-between items-center w-full py-2.5 text-left bg-transparent border-none outline-none cursor-pointer"
                        >
                          <span className={[
                            'text-xl font-display font-light tracking-wide',
                            active ? 'text-primary' : 'text-white'
                          ].join(' ')}>
                            {item.label}
                          </span>
                          <ChevronDown className={[
                            'h-4 w-4 text-white/50 transition-transform duration-300',
                            mobileExpandedItem === item.label ? 'rotate-180 text-primary' : ''
                          ].join(' ')} />
                        </button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: mobileExpandedItem === item.label ? 'auto' : 0,
                            opacity: mobileExpandedItem === item.label ? 1 : 0,
                          }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden w-full"
                        >
                          <div className="flex flex-col gap-2.5 pl-4 py-2 mt-1 border-l border-primary/20 bg-white/[0.02]">
                            {item.to && (
                              <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                  [
                                    'text-[10px] font-semibold tracking-widest py-1.5 uppercase text-left block',
                                    isActive ? 'text-primary' : 'text-white/60 hover:text-primary',
                                  ].join(' ')
                                }
                              >
                                View All {item.label}
                              </NavLink>
                            )}
                            {item.children!.map((child) => (
                              <NavLink
                                key={child.to}
                                to={child.to}
                                className={({ isActive }) =>
                                  [
                                    'text-xs font-light tracking-wider py-1.5 text-left block uppercase',
                                    isActive ? 'text-primary font-medium' : 'text-white/70 hover:text-primary',
                                  ].join(' ')
                                }
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      item.to && (
                        <NavLink
                          className={({ isActive }) =>
                            [
                              'text-xl font-display font-light transition tracking-wide py-2.5 block text-left',
                              isActive ? 'text-primary' : 'text-white hover:text-primary',
                            ].join(' ')
                          }
                          to={item.to}
                        >
                          {item.label}
                        </NavLink>
                      )
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.04 }}
                className="w-full mt-4"
              >
                <Link
                  className="inline-flex justify-center w-full rounded-none bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(184,150,62,0.3)] btn-shimmer relative overflow-hidden text-center"
                  to="/book-now/"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ============================================================
// HOME PAGE COMPONENT
// ============================================================
function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);

  const statsData = [
    { value: "10k+", label: "Happy Clients" },
    { value: "450+", label: "Partner Fleet" },
    { value: "4.9", label: "Average Rating" },
  ];

  const mappedTestimonials = testimonials.map((t, idx) => {
    const avatars = [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
    ];
    const titles = [
      "Corporate Executive",
      "Wedding Coordinator",
      "Events Director"
    ];
    return {
      name: t.name,
      designation: titles[idx % titles.length],
      quote: t.quote,
      src: avatars[idx % avatars.length]
    };
  });

  const cityImages = [
    'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=500&auto=format&fit=crop&q=80', // Melbourne
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=80', // Sydney
    'https://images.unsplash.com/photo-1563824443004-4530c33d83b4?w=500&auto=format&fit=crop&q=80', // Adelaide
    'https://images.unsplash.com/photo-1554154847-ac2960337b73?w=500&auto=format&fit=crop&q=80', // Brisbane
    'https://images.unsplash.com/photo-1549651523-a178945cf45a?w=500&auto=format&fit=crop&q=80', // Gold Coast
  ];

  const serviceGalleryItems = useMemo(() => {
    return serviceCards.map((service) => ({
      id: service.path,
      title: service.title,
      description: `${service.price} · ${service.description}`,
      href: service.path,
      image: service.image,
    }));
  }, []);

  const fleetGalleryItems = useMemo(() => {
    return fleetCards.map((vehicle) => ({
      id: vehicle.title,
      title: vehicle.title,
      description: `${vehicle.price} · ${vehicle.passengers} · ${vehicle.luggage}`,
      href: '/our-fleet/',
      image: vehicle.image,
    }));
  }, []);

  return (
    <>
      {/* 3D Spline Background Hero Section (Matching crown-prestige.onrender.com layout) */}
      <section className="relative min-h-[92vh] flex items-center pt-10 pb-16 overflow-hidden">
        {/* Background Image of the Luxury Car at Night */}
        <div className="absolute inset-0 z-1 bg-black overflow-hidden">
          <motion.img
            src="/hero.jpg"
            alt="Luxury black limousine at night in Melbourne"
            style={{ y: heroY }}
            className="w-full h-full object-cover object-[center_60%] brightness-[0.35] scale-105"
          />
          {/* Floating animating SVG paths overlaying the background image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
        </div>

        {/* Cinematic dark/gold radial overlays to guarantee contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85 z-2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,97,0.12),transparent_40%)] z-2 pointer-events-none" />

        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 z-10 relative">
          <div className="space-y-6 max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-none border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Melbourne Chauffeur Service — Est. 1999
            </motion.span>
            
            <h1 className="font-display text-5xl leading-[1.08] text-white sm:text-7xl min-h-[2.4em]">
              <Typewriter />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-xl text-base leading-8 text-white/75 font-light"
            >
              Fixed-rate luxury chauffeur cars, wedding transport, airport transfers, and limousine hire across Melbourne, Sydney, Brisbane, Gold Coast & Adelaide. Fixed prices, no surcharges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Magnetic>
                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-none bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(184,150,62,0.3)] hover:bg-primary-dark transition duration-350 btn-shimmer overflow-hidden relative"
                  to="/book-now/"
                >
                  Get a Free Quote
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Magnetic>

              <Magnetic>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-none border border-white/20 bg-white/5 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
                  href={company.phoneHref}
                >
                  <PhoneCall className="h-3.5 w-3.5 text-primary" />
                  {company.phone}
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-6 grid gap-4 sm:grid-cols-2 max-w-lg"
            >
              {trustPoints.slice(0, 2).map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 font-semibold">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none hidden lg:flex z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <span className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent animate-scroll-line" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pt-8 md:grid-cols-4 md:px-8 pb-20">
        {heroStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="rounded-none border border-border bg-card/40 px-6 py-6"
            {...fadeUp}
            transition={{ delay: idx * 0.08 }}
          >
            <p className="text-3xl font-display font-light text-primary">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Services Section (Gallery4 Carousel) */}
      <div id="services" className="bg-background-secondary transition-colors duration-500 py-6">
        <Gallery4
          title="Luxury Services for Every Occasion"
          description="From seamless airport arrivals to show-stopping wedding motorcades, Crown Prestige Limousines delivers an experience — not just a ride."
          items={serviceGalleryItems}
        />
      </div>

      {/* Why Us Section (Stacking Cards Layout) */}
      <section className="py-24" id="why-us">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Sticky Title, Description & Metrics */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Why Crown Prestige"
              title="Why Melbourne Chooses Crown Prestige"
              description="When it comes to luxury chauffeur service in Melbourne, Crown Prestige Limousines sets the standard. Here is what sets us apart from every other provider."
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <MetricCard icon={<Users className="h-5 w-5" />} label="Capacity" value="4 to 57 pax" />
              <MetricCard icon={<CalendarDays className="h-5 w-5" />} label="Occasions" value="Airport to wedding" />
              <MetricCard icon={<Globe2 className="h-5 w-5" />} label="Coverage" value="Australia-wide" />
              <MetricCard icon={<ShieldCheck className="h-5 w-5" />} label="Presentation" value="Immaculate" />
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Link to="/contact/">
                <Button variant="outline" className="rounded-none border-border hover:border-primary text-xs uppercase tracking-wider font-semibold py-4 px-8 h-auto">Enquire Now</Button>
              </Link>
              <Link to="/book-now/">
                <Button className="rounded-none bg-primary hover:bg-primary-dark text-xs uppercase tracking-wider font-semibold text-white py-4 px-8 h-auto">Book Online</Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Stacking Cards Container */}
          <div className="relative flex flex-col gap-6" style={{ height: 'calc(100vh + 4 * 140px)' }}>
            {[
              {
                title: "Fixed Pricing",
                tagline: "GUARANTEED RATE",
                description: "Fixed rates with no hidden costs. No hidden fees, toll surcharges, or flight delay penalties.",
                icon: <ShieldCheck className="h-6 w-6 text-primary" />,
              },
              {
                title: "Accredited Drivers",
                tagline: "STV-ACCREDITED",
                description: "STV-accredited professional chauffeurs. No hidden fees, toll surcharges, or flight delay penalties.",
                icon: <Users className="h-6 w-6 text-primary" />,
              },
              {
                title: "Specialist Events",
                tagline: "BESPOKE SERVICE",
                description: "Airport, wedding, executive, and group specialists. No hidden fees, toll surcharges, or flight delay penalties.",
                icon: <CalendarDays className="h-6 w-6 text-primary" />,
              },
              {
                title: "Nationwide Reach",
                tagline: "AUSTRALIA-WIDE",
                description: "Nationwide coverage across Melbourne and major Australian cities. No hidden fees, toll surcharges, or flight delay penalties.",
                icon: <Globe2 className="h-6 w-6 text-primary" />,
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                className="sticky w-full"
                style={{ top: `${96 + index * 32}px` }}
              >
                <div className="p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col h-auto w-full bg-card border border-border transition-colors duration-500">
                  {/* Top section: Icon and Title */}
                  <div className="flex items-center gap-4">
                    <span className="w-14 h-14 rounded-none border border-border bg-primary/5 flex-shrink-0 flex items-center justify-center text-primary">
                      {card.icon}
                    </span>
                    <div className="flex-grow">
                      <p className="font-display font-medium text-lg text-foreground leading-snug">{card.title}</p>
                      <p className="text-xs uppercase tracking-wider text-primary font-semibold mt-0.5">{card.tagline}</p>
                    </div>
                  </div>

                  {/* Middle section: Rating/Standard */}
                  <div className="flex items-center gap-2 my-4">
                    <span className="font-bold text-sm text-foreground">5.0</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 text-primary fill-primary"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom section: Quote-style description */}
                  <p className="text-sm leading-7 text-foreground-body/95 font-light italic">&ldquo;{card.description}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Fleet Section (Gallery4 Carousel) */}
      <section className="bg-background-secondary transition-colors duration-500 py-6" id="fleet">
        <Gallery4
          title="The Right Vehicle for Every Occasion"
          description="450+ late-model vehicles — immaculately maintained, GPS-equipped, and driven by STV-accredited professional chauffeurs."
          items={fleetGalleryItems}
        />
        
        {/* Pricing Table */}
        <div className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-8 -mt-8">
          <div className="mt-16 overflow-hidden rounded-none border border-border bg-card/40 backdrop-blur-sm reveal">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm font-sans font-light">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/5">
                    <th className="py-5 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Vehicle</th>
                    <th className="py-5 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Passengers</th>
                    <th className="py-5 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Best For</th>
                    <th className="py-5 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary text-right">From</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-table-hover transition-colors">
                    <td className="py-4.5 px-6 font-medium text-foreground">Premium Chauffeur Sedan</td>
                    <td className="py-4.5 px-6">Up to 4</td>
                    <td className="py-4.5 px-6">Airport transfers, corporate travel</td>
                    <td className="py-4.5 px-6 text-right font-medium text-foreground">$95</td>
                  </tr>
                  <tr className="hover:bg-table-hover transition-colors">
                    <td className="py-4.5 px-6 font-medium text-foreground">European Prestige</td>
                    <td className="py-4.5 px-6">Up to 4</td>
                    <td className="py-4.5 px-6">Corporate, weddings, VIP arrivals</td>
                    <td className="py-4.5 px-6 text-right font-medium text-foreground">$150 (3h)</td>
                  </tr>
                  <tr className="hover:bg-table-hover transition-colors">
                    <td className="py-4.5 px-6 font-medium text-foreground">Mercedes V-Class</td>
                    <td className="py-4.5 px-6">4 to 7</td>
                    <td className="py-4.5 px-6">Group airport transfers, family travel</td>
                    <td className="py-4.5 px-6 text-right font-medium text-foreground">$100</td>
                  </tr>
                  <tr className="hover:bg-table-hover transition-colors">
                    <td className="py-4.5 px-6 font-medium text-foreground">Mercedes Sprinter</td>
                    <td className="py-4.5 px-6">8 to 18</td>
                    <td className="py-4.5 px-6">Corporate groups, winery tours, events</td>
                    <td className="py-4.5 px-6 text-right font-medium text-foreground">$150</td>
                  </tr>
                  <tr className="hover:bg-table-hover transition-colors">
                    <td className="py-4.5 px-6 font-medium text-foreground">Chrysler Stretch Limo</td>
                    <td className="py-4.5 px-6">10 to 12</td>
                    <td className="py-4.5 px-6">Wedelines, formals, celebrations</td>
                    <td className="py-4.5 px-6 text-right font-medium text-foreground">$350 (3h)</td>
                  </tr>
                  <tr className="hover:bg-table-hover transition-colors">
                    <td className="py-4.5 px-6 font-medium text-foreground">Hummer Limousine</td>
                    <td className="py-4.5 px-6">15 to 26</td>
                    <td className="py-4.5 px-6">Hens, birthdays, large VIP parties</td>
                    <td className="py-4.5 px-6 text-right font-medium text-foreground">$450 (3h)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section (Embla Stories Carousel) */}
      <section className="py-24" id="locations">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Locations"
            title="A Complete Route Structure Across Australia"
            description="Melbourne, Sydney, Adelaide, Brisbane, and Gold Coast are all served by our premium networks."
          />
          <div className="mt-14 overflow-visible">
            <Stories>
              <StoriesContent>
                {locationSummaries.map((location, idx) => (
                  <Link key={location.path} to={location.path} className="block group/story">
                    <Story className="aspect-[3/4.2] w-[220px]">
                      <StoryImage alt={location.title} src={cityImages[idx % cityImages.length]} />
                      <StoryOverlay side="top" />
                      <StoryOverlay side="bottom" />
                      <StoryTitle>
                        {location.title}
                      </StoryTitle>
                      
                      {/* City Service Summary in the center of the story (Visible on hover) */}
                      <div className="absolute inset-x-0 top-1/3 p-4 z-10 opacity-0 group-hover/story:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-xs text-white/95 leading-relaxed font-light line-clamp-3">
                          {location.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          View Services →
                        </span>
                      </div>

                      <StoryAuthor>
                        <StoryAuthorImage
                          name="CP"
                          src={company.logo}
                        />
                        <StoryAuthorName>EST. 1999</StoryAuthorName>
                      </StoryAuthor>
                    </Story>
                  </Link>
                ))}
              </StoriesContent>
            </Stories>
          </div>
        </div>
      </section>

      {/* Testimonials (Circular Testimonials) */}
      <section className="bg-background-secondary transition-colors duration-500 py-24" id="testimonials">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Client Reviews"
            title="What Our Clients Say"
            description="Don't just take our word for it. See why thousands of corporate partners, wedding couples, and private travel clients trust Crown Prestige Limousines Melbourne."
          />
          <div className="mt-14 flex justify-center">
            <CircularTestimonials
              testimonials={mappedTestimonials}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear Information Before You Book"
          description="We make planning premium transfers straightforward. If your question is not listed, contact us directly."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <motion.article
              key={faq.question}
              className="rounded-none border border-border bg-card/30 p-7"
              {...fadeUp}
            >
              <h3 className="text-xl font-display font-light text-foreground">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground-body/80 font-light">{faq.answer}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

// ============================================================
// OTHER PAGE ROUTE COMPONENTS (SHARP CORNERS)
// ============================================================
function ServicesHubPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <PageFrame
      eyebrow="Services"
      title="Luxury transport for every occasion."
      description="This hub keeps the original Crown Prestige service offering visible while presenting it through a refined and consistent design system."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {serviceCards.map((service) => (
          <motion.div key={service.path} variants={cardVariants}>
            <Link to={service.path} className="group rounded-none block">
              <div className="group relative w-full min-h-[27rem] overflow-hidden rounded-none border border-border bg-card transition-all duration-500 hover:shadow-2xl md:aspect-[5/4] lg:aspect-[16/9]">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Shadow overlay matching our editorial aesthetic */}
                <div className="absolute inset-0 h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent z-1 pointer-events-none" />
                <div className="absolute inset-[1px] bg-[radial-gradient(circle_at_bottom_left,rgba(201,169,97,0.15),transparent_60%)] z-2 pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white z-10 md:p-8">
                  <div className="mb-2 pt-4 text-xl font-display font-light text-white leading-snug md:mb-3 md:pt-4 lg:pt-4">
                    {service.title}
                  </div>
                  <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9 text-xs leading-relaxed text-white/75 font-light">
                    {service.price} · {service.description}
                  </div>
                  <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-primary group-hover:text-primary-light transition-colors duration-300">
                    Explore{" "}
                    <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </PageFrame>
  );
}

function FleetPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } },
  };

  return (
    <PageFrame
      eyebrow="Our Fleet"
      title="From executive sedans to Hummer stretch limousines and coaches."
      description="Every vehicle category from the original business is represented here with cleaner merchandising and capacity details."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {fleetCards.map((vehicle) => (
          <motion.article
            key={vehicle.title}
            variants={cardVariants}
            className="overflow-hidden rounded-none border border-border bg-card group"
          >
            <div className="overflow-hidden aspect-[4/3]">
              <img className="w-full h-full object-cover transition duration-700 group-hover:scale-105" src={vehicle.image} alt={vehicle.title} />
            </div>
            <div className="space-y-3 p-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {vehicle.price}
              </span>
              <h3 className="text-2xl font-display font-light text-foreground">{vehicle.title}</h3>
              <p className="text-sm text-foreground-body/80 font-light">{vehicle.passengers}</p>
              <p className="text-sm text-foreground-body/80 font-light">{vehicle.luggage}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </PageFrame>
  );
}

function AboutPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <PageFrame
      eyebrow="About"
      title="A long-established premium transport brand with national reach."
      description="Crown Prestige Limousines was established in 1999 and has grown into a respected chauffeured car and limousine provider with broad fleet access and a strong service culture."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        <motion.div variants={cardVariants}>
          <InfoCard
            title="Mission"
            body="Provide best-value premium chauffeured cars, limousine hire, and professional service that goes beyond expectations."
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <InfoCard
            title="Operational Standard"
            body="The business combines experienced chauffeurs, modern booking systems, GPS-supported dispatch, and meticulous fleet presentation to create a smoother customer experience."
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <InfoCard
            title="Head Office"
            body={`${company.address}\n${company.phone}\n${company.mobile}\n${company.email}`}
            preserveBreaks
          />
        </motion.div>
      </motion.div>
    </PageFrame>
  );
}

function ContactPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <PageFrame
      eyebrow="Contact"
      title="Talk to the booking team directly."
      description="For immediate help with pricing, availability, fleet advice, or custom transport planning, contact Crown Prestige Limousines using the details below."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        <motion.div variants={cardVariants}>
          <InfoCard title="Office" body={`${company.address}\n${company.hours}`} preserveBreaks />
        </motion.div>
        <motion.div variants={cardVariants}>
          <InfoCard title="Phone" body={`${company.phone}\n${company.mobile}`} preserveBreaks />
        </motion.div>
        <motion.div variants={cardVariants}>
          <InfoCard title="Email" body={company.email} />
        </motion.div>
      </motion.div>
      <CtaBand compact />
    </PageFrame>
  );
}

function BookingPage() {
  return (
    <PageFrame
      eyebrow="Book Now"
      title="Start a premium quote request."
      description="This page keeps the booking-first structure of the original site while making the enquiry process clearer and more premium."
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <QuoteForm />
      </motion.div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <InfoCard
            title="Popular Booking Types"
            body="Airport transfers\nWedding transport\nCorporate chauffeur service\nStretch limousine hire\nPeople mover and minibus hire"
            preserveBreaks
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <InfoCard
            title="What Affects Pricing"
            body="Vehicle type and passenger count\nTransfer distance or booking duration\nPickup time and waiting requirements\nSpecial event inclusions or multi-stop routes"
            preserveBreaks
          />
        </motion.div>
      </div>
    </PageFrame>
  );
}

function BlogIndexPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <PageFrame
      eyebrow="Blog"
      title="Guides and booking insights."
      description="The original site includes pricing and planning articles. They are preserved here with a cleaner article listing and stronger readability."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.path}
            variants={cardVariants}
            className="rounded-none border border-border bg-card p-7 flex flex-col justify-between group hover:border-primary/25 transition duration-300"
          >
            <div className="space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {post.category}
              </span>
              <h3 className="text-2xl font-display font-light text-foreground">{post.title}</h3>
              <p className="text-sm leading-7 text-foreground-body/80 font-light">{post.description}</p>
            </div>
            <div className="pt-6">
              <Link
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary group/post"
                to={post.path}
              >
                Read Article
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/post:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </PageFrame>
  );
}

function DetailPage({ page }: { page: ContentPage }) {
  const pointsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const pointItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <PageFrame eyebrow={page.eyebrow} title={page.title} description={page.description}>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-none border border-border bg-card group"
        >
          <div className="overflow-hidden h-[420px] w-full">
            <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103" src={page.image} alt={page.title} />
          </div>
          <div className="space-y-5 p-8">
            <h3 className="text-3xl font-display font-light text-foreground">Service Overview</h3>
            <p className="text-sm leading-8 text-foreground-body/80 font-light">{page.description}</p>
            
            <motion.ul
              variants={pointsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-4 pt-2"
            >
              {page.points.map((point) => (
                <motion.li key={point} variants={pointItem} className="flex items-start gap-3 text-sm leading-7 text-foreground-body/80 font-light">
                  <Check className="mt-1 h-4.5 w-4.5 text-primary shrink-0" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.article>

        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-none border border-border bg-card p-7 lg:sticky lg:top-32 hover:border-primary/25 transition duration-300"
          >
            <h3 className="text-2xl font-display font-light text-foreground">Direct Booking</h3>
            <p className="mt-4 text-sm leading-7 text-foreground-body/80 font-light">
              Speak with the Crown Prestige team for pricing, vehicle advice, and immediate availability.
            </p>
            <div className="mt-6 grid gap-3">
              <Magnetic>
                <a
                  className="inline-flex items-center justify-center rounded-none bg-primary px-5 py-3 w-full text-xs font-semibold uppercase tracking-wider text-white hover:bg-primary-dark transition duration-305 text-center btn-shimmer relative overflow-hidden"
                  href={company.phoneHref}
                >
                  Call {company.phone}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  className="inline-flex items-center justify-center rounded-none border border-border bg-card px-5 py-3 w-full text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary/50 transition duration-300 text-center"
                  href={company.emailHref}
                >
                  Email Booking Team
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </aside>
      </div>
    </PageFrame>
  );
}

function LegalContentPage({ page }: { page: LegalPage }) {
  return (
    <PageFrame
      eyebrow="Policies"
      title={page.title}
      description="Key information presented in a clearer structure for customers reviewing booking and privacy expectations."
    >
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-none border border-border bg-card p-8"
      >
        <ol className="grid gap-6 pl-5 list-decimal text-sm leading-8 text-foreground-body/80 font-light">
          {page.sections.map((section) => (
            <li key={section} className="pl-2">{section}</li>
          ))}
        </ol>
      </motion.article>
    </PageFrame>
  );
}

function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <PageFrame eyebrow={post.category} title={post.title} description={post.description}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-none border border-border bg-card p-8 space-y-4"
      >
        <p className="text-sm leading-8 text-foreground-body/80 font-light">
          This route keeps the original article structure in place while moving the presentation into a cleaner editorial system.
        </p>
        <p className="text-sm leading-8 text-foreground-body/80 font-light">
          For Crown Prestige, the key win is that pricing and planning content is no longer buried or visually inconsistent with the rest of the site. The articles can now support SEO, enquiries, and trust-building in a way that feels aligned with the premium service offering.
        </p>
      </motion.article>
    </PageFrame>
  );
}

function NotFoundPage({ pathname }: { pathname: string }) {
  return (
    <PageFrame
      eyebrow="Page Not Found"
      title="This route has not been mapped yet."
      description={`The requested path ${pathname} does not currently exist in the redesign.`}
    >
      <div className="rounded-none border border-border bg-card p-8 text-center">
        <Magnetic>
          <Link
            className="inline-flex rounded-none bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(184,150,62,0.3)] btn-shimmer relative overflow-hidden"
            to="/"
          >
            Return Home
          </Link>
        </Magnetic>
      </div>
    </PageFrame>
  );
}

// ============================================================
// FORM COMPONENTS (SHARP CORNERS)
// ============================================================
function QuoteForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    passengers: '',
    details: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Quote Request - ${formState.service || 'Luxury Transport'}`);
    const body = encodeURIComponent(
      [
        `Name: ${formState.name}`,
        `Email: ${formState.email}`,
        `Phone: ${formState.phone}`,
        `Date: ${formState.date}`,
        `Service: ${formState.service}`,
        `Passengers: ${formState.passengers}`,
        `Details: ${formState.details}`,
      ].join('\n'),
    );

    window.location.href = `${company.emailHref}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      className="rounded-none border border-border bg-card p-6 sm:p-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Name">
          <input
            className="field"
            onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
            placeholder="Your full name"
            required
            type="text"
            value={formState.name}
          />
        </FormField>
        <FormField label="Email">
          <input
            className="field"
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            placeholder="you@example.com"
            required
            type="email"
            value={formState.email}
          />
        </FormField>
        <FormField label="Phone">
          <input
            className="field"
            onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
            placeholder="Best contact number"
            required
            type="tel"
            value={formState.phone}
          />
        </FormField>
        <FormField label="Date">
          <input
            className="field text-foreground/85"
            onChange={(event) => setFormState((current) => ({ ...current, date: event.target.value }))}
            required
            type="date"
            value={formState.date}
          />
        </FormField>
        <FormField label="Service">
          <select
            className="field text-foreground/85"
            onChange={(event) => setFormState((current) => ({ ...current, service: event.target.value }))}
            required
            value={formState.service}
          >
            <option value="" className="text-foreground/85 bg-card">Select a service</option>
            {serviceCards.map((service) => (
              <option key={service.title} value={service.title} className="text-foreground/85 bg-card">
                {service.title}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Passengers">
          <input
            className="field"
            onChange={(event) => setFormState((current) => ({ ...current, passengers: event.target.value }))}
            placeholder="Number of passengers"
            required
            type="text"
            value={formState.passengers}
          />
        </FormField>
      </div>

      <FormField label="Booking details">
        <textarea
          className="field min-h-36 resize-y"
          onChange={(event) => setFormState((current) => ({ ...current, details: event.target.value }))}
          placeholder="Pickup, destination, luggage, occasion, and any timing notes"
          value={formState.details}
        />
      </FormField>

      <div className="pt-2 flex flex-col gap-4 sm:flex-row">
        <Magnetic>
          <button
            className="inline-flex items-center justify-center rounded-none bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(184,150,62,0.3)] hover:bg-primary-dark transition duration-350 btn-shimmer overflow-hidden relative cursor-pointer"
            type="submit"
          >
            Send Quote Request
          </button>
        </Magnetic>
        <Magnetic>
          <a
            className="inline-flex items-center justify-center rounded-none border border-border bg-card px-7 py-4 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary/50 transition duration-300"
            href={company.phoneHref}
          >
            Call Instead
          </a>
        </Magnetic>
      </div>
    </form>
  );
}

// ============================================================
// HELPER PRESENTATIONAL COMPONENTS
// ============================================================
function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-body">
      {label}
      {children}
    </label>
  );
}

function PageFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const wordsToHighlight = [
    'Melbourne', 'Sydney', 'Adelaide', 'Brisbane', 'Gold', 'Coast',
    'Airport', 'Transfers', 'Transfer', 'Wedding', 'Limo', 'Limousine',
    'Limousines', 'Fleet', 'Chauffeur', 'Service', 'Chauffeurs', 'History',
    'History.', 'Quote', 'Agreement', 'Conditions', 'Policy'
  ];

  const formattedTitle = title.split(' ').map((word, idx) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const shouldHighlight = wordsToHighlight.includes(cleanWord);
    return (
      <span key={idx} className="mr-[0.25em] inline-block">
        {shouldHighlight ? (
          <em className="text-gold-gradient font-display italic not-transform font-normal animate-gold-shimmer">{word}</em>
        ) : (
          word
        )}
      </span>
    );
  });

  return (
    <div className="overflow-hidden">
      {/* Premium Banner Section */}
      <section className="relative bg-[#0d0d0d] pt-32 pb-20 border-b border-border/60 overflow-hidden">
        {/* Subtle background glow/spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,150,62,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.01),transparent_70%)] pointer-events-none" />
        
        {/* Animated Floating Paths in the sub-page header background (low opacity) */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <FloatingPaths position={1} />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="max-w-4xl space-y-4"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
            >
              {eyebrow}
            </motion.p>
            
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
              }}
              className="font-display text-4xl leading-[1.08] text-white sm:text-5xl"
            >
              {formattedTitle}
            </motion.h1>
            
            <motion.div
              variants={{
                hidden: { width: 0 },
                visible: { width: 56, transition: { duration: 0.6, ease: 'easeOut' } }
              }}
              className="h-[1px] bg-primary mt-5 mb-2"
            />
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="max-w-3xl text-sm leading-8 text-white/70 font-light pt-2"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Wrapper Section */}
      <section className="bg-background transition-colors duration-500 py-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div className="max-w-4xl" {...fadeUp}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-[1.08] text-foreground sm:text-5xl">
        {title.split(' ').map((word, idx) => (
          <span key={idx} className="mr-[0.25em] inline-block">
            {word === 'Every' || word === 'Say' || word === 'Crown' ? (
              <em className="text-gold-gradient font-display italic not-transform font-normal animate-gold-shimmer">{word}</em>
            ) : (
              word
            )}
          </span>
        ))}
      </h2>
      <div className="w-14 h-[1px] bg-primary mt-4 mb-5" />
      <p className="text-base leading-8 text-foreground-body/80 font-light">{description}</p>
    </motion.div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-none border border-border bg-card/40 p-5 hover:border-primary/25 transition duration-300">
      <div className="text-primary">{icon}</div>
      <p className="mt-4 text-xl font-display font-light text-foreground">{value}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{label}</p>
    </div>
  );
}

function InfoCard({
  title,
  body,
  preserveBreaks = false,
}: {
  title: string;
  body: string;
  preserveBreaks?: boolean;
}) {
  return (
    <article className="rounded-none border border-border bg-card p-7 hover:border-primary/20 transition duration-300">
      <h3 className="text-2xl font-display font-light text-foreground">{title}</h3>
      <p
        className={[
          'mt-4 text-sm leading-8 text-foreground-body/80 font-light',
          preserveBreaks ? 'whitespace-pre-line' : '',
        ].join(' ')}
      >
        {body}
      </p>
    </article>
  );
}

function CtaBand({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? 'mt-10' : 'mx-auto w-full max-w-7xl px-5 py-20 md:px-8'}>
      <div className="rounded-none border border-border bg-card px-7 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:flex md:items-center md:justify-between md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-2xl relative z-10 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Ready to Book
          </p>
          <h2 className="font-display text-3xl leading-[1.08] text-foreground sm:text-4xl">
            Need pricing, vehicle advice, or <em className="text-gold-gradient font-display italic not-transform font-normal">immediate availability?</em>
          </h2>
          <p className="text-sm leading-7 text-foreground-body/80 font-light pt-2">
            Speak directly with the team to arrange airport transfers, wedding transport, chauffeur bookings, limo hire, or group vehicle planning.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 md:mt-0 md:flex-row relative z-10">
          <Magnetic>
            <a
              className="inline-flex items-center justify-center rounded-none bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-primary-dark transition duration-350 btn-shimmer overflow-hidden relative shadow-[0_4px_24px_rgba(184,150,62,0.3)] text-center"
              href={company.phoneHref}
            >
              Call {company.phone}
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              className="inline-flex items-center justify-center rounded-none border border-border bg-card px-7 py-4 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary/50 transition duration-300 text-center"
              to="/book-now/"
            >
              Request a Quote
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-md transition-colors duration-500">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img className="h-14 w-auto" src={company.logo} alt={company.name} />
            <div>
              <p className="text-lg font-display font-medium text-white leading-tight">{company.name}</p>
              <p className="text-[8px] font-semibold tracking-[0.2em] text-primary uppercase mt-0.5">Limousines</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-foreground-body/80 font-light">
            Premium chauffeured cars, luxury limousine hire, airport transfers, winery tours, and group transport across Australia.
          </p>
          <div className="grid gap-3 text-sm text-foreground-body/90 font-light">
            <a className="inline-flex items-center gap-3 hover:text-primary transition" href={company.phoneHref}>
              <Phone className="h-4 w-4 text-primary shrink-0" />
              Freecall: {company.phone}
            </a>
            <a className="inline-flex items-center gap-3 hover:text-primary transition" href="tel:+61407776706">
              <Globe2 className="h-4 w-4 text-primary shrink-0" />
              Worldwide: +61 407 776 706
            </a>
            <a className="inline-flex items-center gap-3 hover:text-primary transition" href={company.emailHref}>
              <Mail className="h-4 w-4 text-primary shrink-0" />
              {company.email}
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              {company.address}
            </span>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">{group.title}</h3>
            <div className="mt-6 grid gap-3.5 text-sm text-foreground-body/85 font-light">
              {group.links.map((link) => (
                <Link key={`${group.title}-${link.to}`} className="hover:text-primary transition-all duration-300 hover:translate-x-1" to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-border px-5 py-8 text-xs text-foreground-muted md:flex-row md:items-center md:justify-between md:px-8 font-medium">
        <p>Copyright &copy; 2026 Crown Prestige Limousines Pty Ltd · ABN 82 161 475 243</p>
        <div className="flex flex-wrap gap-5">
          <Link className="hover:text-primary transition" to="/about-us/">About Us</Link>
          <Link className="hover:text-primary transition" to="/privacy-policy/">Privacy Policy</Link>
          <Link className="hover:text-primary transition" to="/terms-and-conditions/">Terms and Conditions</Link>
          <Link className="hover:text-primary transition" to="/reservation-agreement/">Reservation Agreement</Link>
        </div>
      </div>
    </footer>
  );
}

// Mobile persistent sticky bottom CTA (Sharp corners)
function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-primary/20 px-5 py-3 md:hidden">
      <div className="flex items-center justify-between gap-3">
        <a
          href={company.phoneHref}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-none border border-border bg-card py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground"
        >
          <Phone className="h-3.5 w-3.5 text-primary" />
          Call Now
        </a>
        <Link
          to="/book-now/"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-none bg-primary py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(184,150,62,0.3)]"
        >
          Book Online
        </Link>
      </div>
    </div>
  );
}
