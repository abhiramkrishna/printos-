import React, { useState, useEffect } from 'react';
import {
    Shirt,
    FileText,
    Gift,
    Monitor,
    Package,
    Image as ImageIcon,
    Layout,
    PenTool,
    ChevronDown,
    Menu,
    X,
    ArrowRight,
    Phone,
    Mail,
    MapPin,
    Send,
    Instagram,
    ChevronRight,
    Star,
    Award,
    Clock,
    Leaf,
    HeartHandshake,
    Search,
    Sparkles,
    TrendingUp,
    Percent,
    Minus,
    Plus,
    Heart,
    Share2,
    Truck,
    ShieldCheck,
    HeadphonesIcon,
    Filter,
    Loader2,
    CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
    {
        id: 'apparel', title: 'Apparel', icon: Shirt, desc: 'Custom T-Shirts, Hoodies & Polos', color: 'blue',
        hoverText: 'hover:text-blue-600', hoverBg: 'hover:bg-blue-50', text: 'text-blue-600', bg: 'bg-blue-100',
        subItems: ['Custom T-Shirts', 'Hoodies & Jackets', 'Polo Shirts']
    },
    {
        id: 'paper', title: 'Paper & Print', icon: FileText, desc: 'Business Cards, Flyers & Letterheads', color: 'purple',
        hoverText: 'hover:text-purple-600', hoverBg: 'hover:bg-purple-50', text: 'text-purple-600', bg: 'bg-purple-100',
        subItems: ['Business Cards', 'Flyers & Brochures', 'Letterheads']
    },
    {
        id: 'promo', title: 'Promo Gifts', icon: Gift, desc: 'Ceramic Mugs, Bottles & Keychains', color: 'pink',
        hoverText: 'hover:text-pink-600', hoverBg: 'hover:bg-pink-50', text: 'text-pink-600', bg: 'bg-pink-100',
        subItems: ['Ceramic Mugs', 'Water Bottles', 'Keychains & Totes']
    },
    {
        id: 'large', title: 'Large Format', icon: Monitor, desc: 'Vinyl Banners, Posters & Standees', color: 'orange',
        hoverText: 'hover:text-orange-600', hoverBg: 'hover:bg-orange-50', text: 'text-orange-600', bg: 'bg-orange-100',
        subItems: ['Vinyl Banners', 'Posters', 'Standees / Rollups']
    },
    {
        id: 'packaging', title: 'Packaging', icon: Package, desc: 'Custom Boxes, Mailers & Stickers', color: 'green',
        hoverText: 'hover:text-green-600', hoverBg: 'hover:bg-green-50', text: 'text-green-600', bg: 'bg-green-100',
        subItems: ['Custom Boxes', 'Mailers', 'Stickers & Labels']
    },
    {
        id: 'decor', title: 'Print & Decor', icon: ImageIcon, desc: 'Acrylic cutouts & Photo Prints', color: 'cyan',
        hoverText: 'hover:text-cyan-600', hoverBg: 'hover:bg-cyan-50', text: 'text-cyan-600', bg: 'bg-cyan-100',
        subItems: ['Acrylic Photo cutouts', 'Photo Prints', 'LED Photo Frames', 'Fridge Magnets']
    },
    {
        id: 'frames', title: 'Photo Frames', icon: Layout, desc: 'Heritage, Canvas & Collage frames', color: 'rose',
        hoverText: 'hover:text-rose-600', hoverBg: 'hover:bg-rose-50', text: 'text-rose-600', bg: 'bg-rose-100',
        subItems: ['Desktop Collage', 'Classic Photo Frames', 'Canvas Frames', 'Heritage Collection']
    },
];

const MOCK_PRODUCTS = [
    { id: 1, sku: 'PRT-APP-001', name: 'Premium Cotton T-Shirt', category: 'apparel', subCategory: 'Custom T-Shirts', price: '499', oldPrice: '699', rating: '5.0', reviews: '1.2k', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', badge: 'Apparel', tags: 'Clothing, Casual, Custom Print', colors: ['#111827', '#ffffff', '#ef4444', '#3b82f6'], description: 'High-quality 100% combed cotton t-shirt with double-stitched hems. Perfect for vibrant, long-lasting custom DTG printing. Available in multiple colors and standard sizing.' },
    { id: 2, sku: 'PRT-APP-002', name: 'Embroidered Zip Hoodie', category: 'apparel', subCategory: 'Hoodies & Jackets', price: '999', oldPrice: '1299', rating: '4.8', reviews: '850', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600', badge: 'Apparel', tags: 'Winterwear, Embroidery, Premium', colors: ['#1f2937', '#9ca3af', '#047857'], description: 'Heavyweight fleece zip hoodie featuring custom left-chest embroidery. Soft interior lining for maximum warmth and comfort.' },
    { id: 3, sku: 'PRT-PPR-001', name: 'Matte Business Cards', category: 'paper', subCategory: 'Business Cards', price: '499', oldPrice: '599', rating: '5.0', reviews: '2.4k', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600', badge: 'Print', tags: 'Stationery, Corporate, Networking', colors: [], description: 'Set of 500 premium 350gsm business cards with a silky smooth matte lamination. Sharp color reproduction and crisp text.' },
    { id: 4, sku: 'PRT-PPR-002', name: 'A5 Promotional Flyers', category: 'paper', subCategory: 'Flyers & Brochures', price: '1499', oldPrice: '1899', rating: '4.7', reviews: '620', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=600', badge: 'Print', tags: 'Marketing, Print, Glossy', colors: [], description: '1000 pieces of A5 promotional flyers printed on 130gsm glossy art paper. Excellent for mass marketing and event handouts.' },
    { id: 5, sku: 'PRT-GIF-001', name: 'Ceramic Magic Mug', category: 'promo', subCategory: 'Ceramic Mugs', price: '299', oldPrice: '399', rating: '4.9', reviews: '3.1k', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600', badge: 'Gifts', tags: 'Gift, Novelty, Drinkware', colors: ['#000000'], description: 'Heat-sensitive ceramic mug that reveals your custom printed design when filled with hot liquid. 330ml capacity.' },
    { id: 6, sku: 'PRT-GIF-002', name: 'Steel Water Bottle', category: 'promo', subCategory: 'Water Bottles', price: '399', oldPrice: '499', rating: '4.6', reviews: '410', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600', badge: 'Gifts', tags: 'Eco-Friendly, Drinkware, Gym', colors: ['#cbd5e1', '#000000', '#f43f5e'], description: '750ml stainless steel water bottle with spill-proof cap. Custom laser engraving available for corporate gifting.' },
    { id: 7, sku: 'PRT-LRG-001', name: 'Heavy Duty Vinyl Banner', category: 'large', subCategory: 'Vinyl Banners', price: '1299', oldPrice: '1500', rating: '5.0', reviews: '120', image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=600', badge: 'Format', tags: 'Outdoor, Advertising, Event', colors: [], description: 'Weather-resistant 6x3 ft vinyl banner with metal grommets for easy hanging. Printed with UV-resistant eco-solvent inks.' },
    { id: 8, sku: 'PRT-PKG-001', name: 'Custom Mailer Box', category: 'packaging', subCategory: 'Mailers', price: '45', oldPrice: '60', rating: '4.8', reviews: '1.8k', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600', badge: 'Packaging', tags: 'Shipping, E-commerce, Box', colors: ['#d1d5db', '#111827'], description: 'Corrugated mailer boxes customized with your brand logo inside and out. Durable enough for shipping directly to customers. Price per box (min order 100).' },
    { id: 9, sku: 'PRT-PKG-002', name: 'Die-Cut Stickers (100x)', category: 'packaging', subCategory: 'Stickers & Labels', price: '350', oldPrice: '450', rating: '4.9', reviews: '5k+', image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=600', badge: 'Packaging', tags: 'Stickers, Branding, Vinyl', colors: [], description: '100 premium waterproof vinyl stickers cut exactly to the shape of your logo. Scratch-resistant matte or gloss finish.' },
    { id: 10, sku: 'PRT-DEC-001', name: 'Acrylic Photo Plaque', category: 'decor', subCategory: 'Acrylic Photo cutouts', price: '599', oldPrice: '799', rating: '5.0', reviews: '890', image: 'https://images.unsplash.com/photo-1513118172236-00b7cc57e1fa?auto=format&fit=crop&q=80&w=600', badge: 'Decor', tags: 'Home Decor, Gift, Modern', colors: [], description: 'High-definition photo print mounted behind a 5mm thick clear acrylic glass block with polished edges for a 3D effect.' },
    { id: 11, sku: 'PRT-FRM-001', name: 'Classic Wood Frame', category: 'frames', subCategory: 'Classic Photo Frames', price: '899', oldPrice: '1100', rating: '4.7', reviews: '340', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', badge: 'Frames', tags: 'Wall Art, Photography, Wood', colors: ['#78350f', '#000000', '#ffffff'], description: '12x18 inch solid wood frame with premium matte photo print inside. Includes glass cover and mounting hardware.' },
    { id: 12, sku: 'PRT-FRM-002', name: 'Gallery Canvas Wrap', category: 'frames', subCategory: 'Canvas Frames', price: '1499', oldPrice: '1899', rating: '4.9', reviews: '1.1k', image: 'https://images.unsplash.com/photo-1579762593175-20226054cad0?auto=format&fit=crop&q=80&w=600', badge: 'Frames', tags: 'Canvas, Art, Premium', colors: [], description: 'Your photo stretched over a 1.5" thick wooden stretcher bar. Printed on museum-quality textured canvas for a fine-art look.' },
];

const HERO_SLIDES = [
    "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1513118172236-00b7cc57e1fa?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200"
];

const TESTIMONIALS = [
    { name: "Joseph S.", role: "Cafe Owner", text: "The quality of the business cards exceeded our expectations. The matte finish feels premium and the colors are spot on.", init: "JS" },
    { name: "Sarah K.", role: "Marketing Lead", text: "Printos handled our bulk hoodie order for the annual conference. Perfect embroidery and arrived two days early!", init: "SK" },
    { name: "Ahmed R.", role: "Artist", text: "The large format canvas prints are stunning. They managed to capture the fine details of my digital paintings perfectly.", init: "AR" }
];

const WhatsappIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <g transform="translate(6, 6) scale(0.5)">
            <path strokeWidth="4" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </g>
    </svg>
);

const PrintosLogo = ({ className = "w-10 h-10", color = "#2d9ed8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.26 150.6" className={className}>
        <path fill={color} d="M122.26,61.13c0,33.76-27.37,61.13-61.13,61.13-7.42,0-14.54-1.32-21.12-3.75v-57.38c0-11.65,9.47-21.13,21.12-21.13s21.13,9.48,21.13,21.13-9.48,21.13-21.13,21.13c-4.53,0-8.73-1.43-12.17-3.88v22.04c3.85,1.2,7.93,1.84,12.17,1.84,22.68,0,41.13-18.45,41.13-41.13s-18.45-41.13-41.13-41.13S20.01,38.45,20.01,61.13v45.23C7.72,95.18,0,79.06,0,61.13,0,27.37,27.37,0,61.13,0s61.13,27.37,61.13,61.13Z" />
        <polygon fill={color} points="20.01 106.36 40.01 118.51 40.01 150.6 20.01 150.6 20.01 106.36" />
    </svg>
);

const Navbar = ({ isMenuOpen, setIsMenuOpen, scrollPos, navigateTo, setActiveCategory, setActiveSubCategory, searchTerm, setSearchTerm }) => {
    const isScrolled = scrollPos > 20;

    const [query, setQuery] = useState(searchTerm || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false);
    const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

    useEffect(() => {
        setQuery(searchTerm);
    }, [searchTerm]);

    const handleCategoryClick = (e, catId, subItem = null) => {
        e.preventDefault();
        setActiveCategory(catId);
        setActiveSubCategory(subItem);
        setSearchTerm('');
        navigateTo('catalog');
    };

    const handleInputChange = (e, isMobile) => {
        const val = e.target.value;
        setQuery(val);
        if (val.trim()) {
            const matches = MOCK_PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(val.toLowerCase()) ||
                p.subCategory.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 5);
            setSuggestions(matches);
            if (isMobile) {
                setShowMobileSuggestions(true);
            } else {
                setShowDesktopSuggestions(true);
            }
        } else {
            setSuggestions([]);
            setShowDesktopSuggestions(false);
            setShowMobileSuggestions(false);
        }
    };

    const executeSearch = (searchVal) => {
        if (!searchVal.trim()) return;
        setSearchTerm(searchVal);
        setActiveCategory('All');
        setActiveSubCategory(null);
        setShowDesktopSuggestions(false);
        setShowMobileSuggestions(false);
        navigateTo('catalog');
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md' : 'bg-white/90 backdrop-blur-sm shadow-sm'
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-3 flex items-center justify-between gap-4">

                <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home', 'home'); }} className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg shrink-0 active:scale-95 transition-transform duration-200">
                    <PrintosLogo className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 transform md:group-hover:scale-105 transition-all duration-300" color="#2d9ed8" />
                    <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 md:group-hover:text-blue-600 transition-colors">
                        Printos
                    </span>
                </a>

                <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
                    <form
                        onSubmit={(e) => { e.preventDefault(); executeSearch(query); }}
                        className="w-full relative"
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleInputChange(e, false)}
                            onFocus={() => { if (query.trim()) setShowDesktopSuggestions(true); }}
                            onBlur={() => setTimeout(() => setShowDesktopSuggestions(false), 200)}
                            placeholder="Search products..."
                            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full py-2.5 pl-5 pr-12 text-sm transition-all outline-none"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition-colors active:scale-90">
                            <Search className="w-5 h-5" />
                        </button>

                        {showDesktopSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[60] animate-fade-in">
                                {suggestions.map(item => {
                                    const catData = CATEGORIES.find(c => c.id === item.category);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                                setShowDesktopSuggestions(false);
                                                navigateTo('product', null, item);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-4 border-b border-gray-50 last:border-0 focus:bg-gray-50 outline-none active:bg-gray-100"
                                        >
                                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                                                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider truncate">{catData?.title || item.category} • {item.subCategory}</p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </form>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('home', 'about'); }} className="hidden md:inline-flex px-4 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-full active:scale-95">
                        About Us
                    </a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }} className="hidden md:inline-flex px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 md:hover:-translate-y-0.5 active:scale-95">
                        Get a Quote
                    </a>
                    <button
                        className="lg:hidden p-2 text-gray-800 hover:bg-gray-200 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 active:scale-90"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
                    </button>
                </div>
            </div>

            <div className="hidden lg:block border-t border-gray-100">
                <nav className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex justify-center space-x-8 w-full relative">
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="relative group">
                            <button
                                onClick={(e) => handleCategoryClick(e, cat.id)}
                                className={`flex items-center gap-1 py-3 text-sm font-bold text-gray-700 ${cat.hoverText} transition-colors focus-visible:outline-none active:scale-95`}
                            >
                                {cat.title} <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white shadow-xl rounded-2xl border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="flex flex-col">
                                    {cat.subItems.map(item => (
                                        <a
                                            key={item}
                                            href="#catalog"
                                            onClick={(e) => handleCategoryClick(e, cat.id, item)}
                                            className={`px-5 py-2.5 text-sm font-medium text-gray-600 ${cat.hoverText} ${cat.hoverBg} transition-colors active:bg-gray-100`}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            <div className={`fixed top-[60px] sm:top-[70px] left-0 w-full h-[calc(100vh-60px)] bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl transition-all duration-300 lg:hidden overflow-y-auto ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                <div className="flex flex-col px-6 py-6 gap-4 pb-24">

                    <div className="relative mb-2">
                        <form onSubmit={(e) => { e.preventDefault(); executeSearch(query); }} className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => handleInputChange(e, true)}
                                onBlur={() => setTimeout(() => setShowMobileSuggestions(false), 200)}
                                placeholder="Search products..."
                                className="w-full bg-gray-100 border border-gray-200 focus:bg-white focus:border-blue-500 rounded-full py-3 pl-5 pr-12 text-base outline-none transition-colors"
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 active:scale-90 transition-transform">
                                <Search className="w-5 h-5 text-gray-400" />
                            </button>
                        </form>

                        {showMobileSuggestions && suggestions.length > 0 && (
                            <div className="mt-2 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                                {suggestions.map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            setShowMobileSuggestions(false);
                                            navigateTo('product', null, item);
                                        }}
                                        className="w-full text-left px-4 py-3 active:bg-gray-100 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                                    >
                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover bg-gray-100 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                                            <p className="text-[11px] text-gray-500 font-medium truncate">{item.subCategory}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={() => navigateTo('home', 'home')} className="text-left text-xl font-bold text-gray-800 active:text-blue-600 active:scale-[0.98] transition-all">Home</button>

                    <div className="h-px bg-gray-200 w-full my-2"></div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</p>

                    <div className="grid grid-cols-1 gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`w-full text-left text-base font-medium text-gray-700 active:text-blue-600 flex items-center gap-3 p-2 rounded-xl active:bg-gray-100 active:scale-[0.98] transition-all`}
                                onClick={(e) => handleCategoryClick(e, cat.id)}
                            >
                                <div className={`p-2 rounded-lg ${cat.bg} ${cat.text} shrink-0`}><cat.icon className="w-5 h-5" /></div>
                                {cat.title}
                            </button>
                        ))}
                    </div>

                    <div className="h-px bg-gray-200 w-full my-2"></div>
                    <button onClick={() => navigateTo('home', 'about')} className="text-left text-xl font-bold text-gray-800 active:text-blue-600 active:scale-[0.98] transition-all">About Us</button>
                    <button onClick={() => navigateTo('home', 'contact')} className="mt-4 w-full text-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform">
                        Get a Quote
                    </button>
                </div>
            </div>
        </header>
    );
};

const Footer = ({ navigateTo }) => {
    return (
        <footer className="bg-black text-gray-400 pt-8 pb-16 border-t border-gray-800 relative overflow-hidden">

            <div className="w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 mb-12 lg:mb-16 transform -skew-y-2 shadow-2xl z-20 border-y-4 border-gray-900">
                <div className="animate-marquee whitespace-nowrap font-extrabold text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase flex gap-4 sm:gap-8">
                    <span>PREMIUM QUALITY • FAST TURNAROUND • CUSTOM DESIGNS • 100% SATISFACTION • PRINTING REIMAGINED •</span>
                    <span>PREMIUM QUALITY • FAST TURNAROUND • CUSTOM DESIGNS • 100% SATISFACTION • PRINTING REIMAGINED •</span>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 relative z-10">
                <div className="sm:col-span-2 md:col-span-5">
                    <div className="flex items-center space-x-3 mb-6">
                        <PrintosLogo className="w-8 h-8 lg:w-10 lg:h-10" color="#ffffff" />
                        <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">Printos</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-sm font-light">
                        Printos is your trusted partner for premium custom printing solutions. Delivering precision, quality, and creativity to businesses and individuals alike.
                    </p>
                    <div className="flex space-x-4 mt-6">
                        <a href="https://www.instagram.com/printos.tvm/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 active:bg-pink-700 text-white md:hover:scale-110 active:scale-95 transition-all duration-300">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="https://wa.me/918139810721" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-green-500 active:bg-green-600 text-white md:hover:scale-110 active:scale-95 transition-all duration-300">
                            <WhatsappIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Quick Links</h3>
                    <ul className="space-y-3 text-sm font-light">
                        <li>
                            <button onClick={() => navigateTo('home', 'home')} className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center">
                                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />Home
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigateTo('catalog')} className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center">
                                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />Categories
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigateTo('home', 'about')} className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center">
                                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />About Us
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigateTo('home', 'contact')} className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center">
                                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />Contact
                            </button>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mt-12 lg:mt-16 pt-8 border-t border-gray-800 text-xs flex flex-col md:flex-row justify-between items-center text-center md:text-left font-light tracking-wide gap-4">
                <p>&copy; 2026 Printos. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[300px] sm:h-[450px] lg:h-[650px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] sm:border-[10px] border-white group">
            {HERO_SLIDES.map((slide, index) => (
                <img
                    key={index}
                    src={slide}
                    alt={`Printing showcase ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform md:group-hover:scale-105 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                />
            ))}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex justify-center gap-2 sm:gap-3">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${index === current ? 'bg-white w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80 w-2 sm:w-2.5'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Hero = ({ navigateTo }) => {
    return (
        <section id="home" className="relative pb-16 lg:pb-32 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-blue-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 lg:pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">

                    <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-bold mb-6 border border-blue-100 shadow-sm animate-bounce-slow">
                            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-500"></span>
                            </span>
                            <span>Innovating Print Solutions</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-4 sm:mb-6">
                            Bring your ideas to <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">life with print.</span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                            Premium custom printing services for businesses and individuals. From custom apparel to personalized photo frames and decor, we deliver vibrant, high-quality results.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                            <button onClick={() => navigateTo('catalog')} className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-blue-500/30 md:hover:-translate-y-1 focus:outline-none w-full sm:w-auto">
                                Explore Services <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button onClick={() => navigateTo('home', 'contact')} className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-full text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98] border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md md:hover:-translate-y-1 focus:outline-none w-full sm:w-auto">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    <div className="relative transform md:hover:scale-[1.02] transition-transform duration-500 w-full mt-4 lg:mt-0">
                        <HeroSlider />
                        <div className="absolute -bottom-6 sm:-bottom-10 -left-6 sm:-left-10 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-60 animate-pulse pointer-events-none" />
                        <div className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-60 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
                    </div>

                </div>
            </div>
        </section>
    );
};

const HomeServices = ({ navigateTo, setActiveCategory }) => {
    return (
        <section id="services" className="relative py-16 lg:py-24 bg-gray-50 overflow-hidden border-t border-gray-100">
            <div className="absolute top-0 left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-spin-slow pointer-events-none" />
            <div className="absolute bottom-0 right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />

            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20">
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase block mb-2 sm:mb-3">Our Capabilities</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-extrabold text-gray-900">
                        Everything you need, <br className="hidden sm:block" /><span className="font-light italic text-gray-500">printed perfectly.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveCategory(cat.id); navigateTo('catalog'); }}
                            className="text-left bg-white rounded-[1.5rem] shadow-md hover:shadow-xl md:hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 border border-gray-100 overflow-hidden group relative p-6 sm:p-8 flex flex-col items-start w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, var(--color-${cat.color}-600), var(--color-${cat.color}-400))` }} />

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${cat.bg} flex items-center justify-center mb-4 sm:mb-6 transform md:group-hover:-rotate-12 transition-transform duration-500 shadow-inner ${cat.text} shrink-0`}>
                                    <cat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{cat.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 sm:mb-6 leading-relaxed flex-1">
                                    {cat.desc}
                                </p>
                                <span className={`inline-flex items-center ${cat.text} font-bold ${cat.hoverText} transition-colors text-sm mt-auto`}>
                                    Order Now <ArrowRight className="ml-2 w-4 h-4 transform md:group-hover:translate-x-2 transition-transform" />
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

const About = ({ navigateTo }) => {
    return (
        <section id="about" className="py-16 lg:py-24 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    <div className="relative h-[300px] sm:h-[450px] lg:h-[650px] mb-12 lg:mb-0">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 transform md:rotate-3 scale-105 opacity-20 rounded-[2rem] lg:rounded-[40px]" />
                            <img
                                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1000"
                                alt="Vibrant printed color palettes"
                                className="absolute inset-0 w-full h-full object-cover shadow-2xl transform md:-rotate-2 hover:rotate-0 transition-transform duration-700 rounded-[2rem] lg:rounded-[40px]"
                            />
                        </div>

                        <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center space-x-3 sm:space-x-4 border border-gray-100 z-10">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-xl">10+</div>
                            <div>
                                <p className="font-bold text-gray-900 text-base sm:text-lg leading-tight">Years</p>
                                <p className="text-xs sm:text-sm text-gray-500">of Excellence</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-xs sm:text-sm font-bold tracking-widest text-purple-600 uppercase block mb-2 sm:mb-3">Why Printos?</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 lg:text-5xl mb-4 sm:mb-6 leading-tight">
                            Precision in every pixel, <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">quality in every drop.</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed font-light">
                            Your printed materials are a direct reflection of your brand. We fuse state-of-the-art technology with artisanal attention to detail to ensure your project stands out.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {[
                                { title: 'Premium Quality', desc: 'Top-tier materials & inks.', icon: Award, color: 'blue' },
                                { title: 'Fast Turnaround', desc: 'Deadlines met, guaranteed.', icon: Clock, color: 'purple' },
                                { title: 'Eco-Friendly', desc: 'Sustainable print options.', icon: Leaf, color: 'green' },
                                { title: '100% Satisfaction', desc: 'We aren\'t happy until you are.', icon: HeartHandshake, color: 'pink' }
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className={`bg-${feature.color}-100 text-${feature.color}-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0`}>
                                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{feature.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 sm:mt-12">
                            <button onClick={() => navigateTo('home', 'contact')} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-full text-white bg-gray-900 hover:bg-blue-600 active:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl md:hover:-translate-y-1 focus:outline-none">
                                Start Your Project
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: CATEGORIES[0].title,
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errorMessage) setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Please enter a valid email address formatting (e.g., name@example.com).');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('https://formsubmit.co/ajax/abhiramkrishna15@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Quote Request from ${formData.name}`,
                    Name: formData.name,
                    Email: formData.email,
                    Category: formData.category,
                    Details: formData.message,
                    _captcha: "false"
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', category: CATEGORIES[0].title, message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            setStatus('idle');
            setErrorMessage('Something went wrong. Please check your connection and try again.');
        }
    };

    return (
        <section id="contact" className="relative py-16 lg:py-24 bg-gray-900 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4">Reach out to Us</h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light">Get a custom quote or drop by our office.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    <div className="lg:col-span-5 flex flex-col space-y-6 md:space-y-8">
                        <div className="bg-gray-800/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-700 hover:border-gray-600 transition-colors">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Contact Details</h3>
                            <address className="space-y-5 sm:space-y-6 not-italic">
                                <div className="flex items-start">
                                    <div className="bg-blue-500/20 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4 text-blue-400 shrink-0"><Phone className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-semibold">Phone</p>
                                        <p className="text-base sm:text-lg font-medium text-white hover:text-blue-400 transition-colors"><a href="tel:+918139810721">+91 81398 10721</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-purple-500/20 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4 text-purple-400 shrink-0"><Mail className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-semibold">Email</p>
                                        <p className="text-base sm:text-lg font-medium text-white hover:text-purple-400 transition-colors break-all"><a href="mailto:printostvm@gmail.com">printostvm@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-pink-500/20 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4 text-pink-400 shrink-0"><MapPin className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-semibold">Address</p>
                                        <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                                            AKG Center, General Hospital Rd,<br /> Jai Vihar, Kunnukuzhy,<br />
                                            Thiruvananthapuram, Kerala 695035
                                        </p>
                                    </div>
                                </div>
                            </address>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-xl p-2 rounded-2xl sm:rounded-3xl border border-gray-700 overflow-hidden h-48 sm:h-64 shadow-xl">
                            <iframe
                                src="https://maps.google.com/maps?q=8.501022254586845,76.9467338232378+(Printos)&hl=en&z=15&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '1rem' }}
                                allowFullScreen=""
                                title="Google Maps Location"
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl text-gray-900 relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl sm:rounded-t-3xl" />

                            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Request a Free Quote</h3>
                            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none block p-3 sm:p-3.5 transition-shadow" placeholder="Type Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full bg-gray-50 border ${errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-2 block p-3 sm:p-3.5 transition-shadow`} placeholder="Type Your Email Address" />
                                        {errorMessage && <p className="text-red-500 text-xs font-bold mt-1.5">{errorMessage}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Select Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none block p-3 sm:p-3.5 transition-shadow cursor-pointer appearance-none">
                                        {CATEGORIES.map(cat => <option key={cat.id} value={cat.title}>{cat.title}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Project Details</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none block p-3 sm:p-3.5 transition-shadow resize-none" placeholder="Tell us about quantities, colors, timeline..."></textarea>
                                </div>

                                <button type="submit" disabled={status === 'loading' || status === 'success'} className="w-full flex justify-center items-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/40 transition-all transform md:hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed">
                                    {status === 'loading' ? (
                                        <><Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Sending...</>
                                    ) : status === 'success' ? (
                                        <><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Message Sent!</>
                                    ) : (
                                        <>Send Message <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProductCatalog = ({ activeCategory, setActiveCategory, activeSubCategory, setActiveSubCategory, navigateTo, searchTerm, setSearchTerm }) => {
    const [expandedCategories, setExpandedCategories] = useState(['apparel']);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        if (activeCategory !== 'All' && !expandedCategories.includes(activeCategory)) {
            setExpandedCategories(prev => [...prev, activeCategory]);
        }
    }, [activeCategory]);

    const handleCategoryClick = (catId) => {
        setActiveCategory(catId);
        setActiveSubCategory(null);
        setSearchTerm('');
        if (!expandedCategories.includes(catId)) {
            setExpandedCategories([...expandedCategories, catId]);
        } else {
            setExpandedCategories(expandedCategories.filter(id => id !== catId));
        }
    };

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchesCat = activeCategory === 'All' || product.category === activeCategory;
        const matchesSub = !activeSubCategory || product.subCategory === activeSubCategory;
        const matchesSearch = !searchTerm ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCat && matchesSub && matchesSearch;
    });

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-12 flex flex-col md:flex-row gap-6 md:gap-10">

            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="md:hidden flex items-center justify-between w-full bg-gray-100 px-4 py-3 rounded-xl font-bold text-gray-800 active:scale-[0.98] transition-transform"
            >
                <span className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters & Categories</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sidebar: Categories Navigation */}
            <div className={`w-full md:w-56 lg:w-64 shrink-0 font-poppins ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                <h2 className="hidden md:block text-[22px] font-extrabold text-gray-900 mb-6">Category</h2>

                <div className="space-y-1">
                    {/* "All Product" Base Item */}
                    <div className="mb-2">
                        <button
                            onClick={() => {
                                setActiveCategory('All');
                                setActiveSubCategory(null);
                                setSearchTerm('');
                                setExpandedCategories(['all']);
                                setIsMobileFilterOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 rounded-[14px] transition-colors active:scale-[0.98] ${activeCategory === 'All' ? 'bg-gray-100/80 font-bold text-gray-900' : 'hover:bg-gray-50 text-gray-600 font-medium'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-gray-500" />
                                <span className="text-sm sm:text-base">All Product</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeCategory === 'All' ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        <div className={`ml-3 sm:ml-4 mt-1 border-l-[1.5px] border-gray-200 pl-3 sm:pl-4 py-2 space-y-1 transition-all block`}>
                            {CATEGORIES.map(cat => {
                                const isExpanded = expandedCategories.includes(cat.id);
                                return (
                                    <div key={cat.id} className="relative">
                                        <div className="absolute w-3 sm:w-4 h-[1.5px] bg-gray-200 -left-3 sm:-left-4 top-[18px]"></div>

                                        <button
                                            onClick={() => handleCategoryClick(cat.id)}
                                            className={`w-full text-left py-2 px-2 sm:px-3 rounded-lg text-[13px] sm:text-sm transition-colors flex items-center justify-between active:scale-[0.98] ${activeCategory === cat.id && !activeSubCategory && !searchTerm ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-500 hover:text-gray-900 font-medium'
                                                }`}
                                        >
                                            <span className="flex items-center gap-2 truncate">
                                                <cat.icon className="w-4 h-4 opacity-60 shrink-0" />
                                                <span className="truncate">{cat.title}</span>
                                            </span>
                                            {cat.subItems.length > 0 && (
                                                <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                                            )}
                                        </button>

                                        {isExpanded && cat.subItems.length > 0 && (
                                            <div className="pl-4 sm:pl-5 pb-2 space-y-1 mt-1 animate-fade-in">
                                                {cat.subItems.map(sub => (
                                                    <button
                                                        key={sub}
                                                        onClick={() => {
                                                            setActiveCategory(cat.id);
                                                            setActiveSubCategory(sub);
                                                            setSearchTerm('');
                                                            setIsMobileFilterOpen(false);
                                                        }}
                                                        className={`w-full text-left py-1.5 px-2 rounded-md text-xs sm:text-[13px] transition-colors truncate active:scale-[0.98] ${activeSubCategory === sub && !searchTerm ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-500 hover:text-gray-900 font-medium'
                                                            }`}
                                                    >
                                                        {sub}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-200 my-4 sm:my-6 mx-2"></div>

                {/* Bottom Utility Links */}
                <div className="space-y-1">
                    <button className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors text-sm sm:text-base active:scale-[0.98]">
                        <span className="flex items-center gap-3"><Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> New Arrival</span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 -rotate-90" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors text-sm sm:text-base active:scale-[0.98]">
                        <span className="flex items-center gap-3"><TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> Best Seller</span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 -rotate-90" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors text-sm sm:text-base active:scale-[0.98]">
                        <span className="flex items-center gap-3"><Percent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> On Discount</span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 -rotate-90" />
                    </button>
                </div>
            </div>

            {/* Main Area: Product Grid & Breadcrumb */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Breadcrumb Navigation */}
                <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-medium flex-wrap">
                    <button onClick={() => navigateTo('home')} className="hover:text-blue-600 transition-colors shrink-0 py-1">Home</button>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                    <button
                        onClick={() => { setActiveSubCategory(null); setSearchTerm(''); }}
                        className={`hover:text-blue-600 transition-colors shrink-0 py-1 ${!activeSubCategory && activeCategory !== 'All' && !searchTerm ? 'text-gray-900 font-bold pointer-events-none' : ''}`}
                    >
                        {activeCategory === 'All' ? 'All Products' : CATEGORIES.find(c => c.id === activeCategory)?.title}
                    </button>

                    {activeSubCategory && (
                        <>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                            <span className={`shrink-0 py-1 ${!searchTerm ? 'text-gray-900 font-bold' : ''}`}>{activeSubCategory}</span>
                        </>
                    )}

                    {searchTerm && (
                        <>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                            <span className="text-gray-900 font-bold shrink-0 truncate py-1">Search</span>
                        </>
                    )}
                </nav>

                {/* Search Results Highlight Banner */}
                {searchTerm && (
                    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50/50 border border-blue-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl animate-fade-in gap-3">
                        <p className="text-xs sm:text-sm text-gray-600">Showing results for <strong className="text-gray-900 text-sm sm:text-base">"{searchTerm}"</strong></p>
                        <button
                            onClick={() => { setSearchTerm(''); }}
                            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 active:text-blue-900 transition-colors flex items-center gap-1 w-fit"
                        >
                            <X className="w-4 h-4" /> Clear Search
                        </button>
                    </div>
                )}

                {/* Animated Wrapper for grid items */}
                <div key={`${activeCategory}-${activeSubCategory}-${searchTerm}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in-up">
                    {filteredProducts.map(product => (
                        <button
                            key={product.id}
                            onClick={() => navigateTo('product', null, product)}
                            className="text-left bg-white rounded-3xl p-5 sm:p-6 flex flex-col h-full group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >

                            {/* Product Image Panel */}
                            <div className="bg-[#f4f5f7] rounded-2xl aspect-[4/3] mb-5 sm:mb-6 relative overflow-hidden flex items-center justify-center p-6 sm:p-8 w-full shrink-0">
                                {/* Badge */}
                                <span className="absolute top-4 right-4 bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-gray-700 border border-gray-200 shadow-sm z-10 tracking-wide">
                                    {product.badge}
                                </span>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col w-full">
                                <h3 className="font-bold font-poppins text-gray-900 text-lg sm:text-xl leading-tight mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>

                                <div className="mt-auto flex flex-col gap-5">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex items-center space-x-1.5">
                                            <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                                            <span className="text-sm font-bold text-gray-600">
                                                {product.rating} <span className="font-medium text-gray-400">({product.reviews})</span>
                                            </span>
                                        </div>
                                        <span className="font-black text-2xl text-gray-900">₹{product.price}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3 w-full">
                                        <div className="flex items-center justify-center border-2 border-gray-200 text-gray-800 font-bold text-[13px] sm:text-sm py-2.5 rounded-full group-hover:border-gray-800 hover:bg-gray-50 transition-colors w-full px-1 text-center">
                                            Add to Cart
                                        </div>
                                        <div className="flex items-center justify-center bg-[#1c1c1e] text-white font-bold text-[13px] sm:text-sm py-2.5 rounded-full hover:bg-black transition-colors w-full px-1 text-center">
                                            Buy Now
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-12 sm:py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-[20px] sm:rounded-[30px] px-4 text-center">
                            <Search className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-30" />
                            <p className="font-medium text-sm sm:text-lg text-gray-500">No products found matching your criteria.</p>
                            <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); setActiveSubCategory(null); }} className="mt-3 sm:mt-4 text-blue-600 font-bold hover:underline active:text-blue-800 text-sm sm:text-base">
                                View all products
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

const ProductDetails = ({ product, navigateTo, setActiveCategory, setActiveSubCategory }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    if (!product) return null;

    const categoryData = CATEGORIES.find(c => c.id === product.category);
    const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3); // Changed to slice(0,3) to fit 3 per row on desktop

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-12 animate-fade-in-up">

            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 font-medium flex-wrap">
                <button onClick={() => navigateTo('home')} className="hover:text-blue-600 transition-colors shrink-0 py-1">Home</button>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <button
                    onClick={() => { setActiveCategory(product.category); setActiveSubCategory(null); navigateTo('catalog'); }}
                    className="hover:text-blue-600 transition-colors shrink-0 py-1"
                >
                    {categoryData?.title}
                </button>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <button
                    onClick={() => { setActiveCategory(product.category); setActiveSubCategory(product.subCategory); navigateTo('catalog'); }}
                    className="hover:text-blue-600 transition-colors shrink-0 py-1"
                >
                    {product.subCategory}
                </button>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="text-gray-900 font-bold shrink-0 truncate py-1">{product.name}</span>
            </nav>

            {/* Main Product Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-20">

                {/* Left: Image Gallery */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="bg-[#f4f5f7] rounded-[1.5rem] sm:rounded-[32px] aspect-square flex items-center justify-center p-4 sm:p-8 relative overflow-hidden group">
                        <button className="absolute left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-800 hover:bg-gray-100 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-95"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" /></button>
                        <button className="absolute right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-800 hover:bg-gray-100 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-95"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>

                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 md:group-hover:scale-105" />
                    </div>
                    {/* Thumbnails */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-4">
                        {[product.image, product.image, product.image, product.image].map((img, idx) => (
                            <button key={idx} className={`bg-[#f4f5f7] rounded-xl sm:rounded-[16px] aspect-square p-1.5 sm:p-2 border-2 transition-all overflow-hidden active:scale-95 ${idx === 0 ? 'border-gray-900' : 'border-transparent hover:border-gray-300'}`}>
                                <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col pt-2 sm:pt-4">

                    <div className="mb-2">
                        <span className="bg-green-100 text-green-700 font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4 inline-block">In Stock</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">{product.name}</h1>

                    <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                        <div className="flex text-yellow-400">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-900">{product.rating}</span>
                        <span className="text-xs sm:text-sm text-gray-500 font-medium">({product.reviews} Reviews)</span>
                    </div>

                    <div className="flex items-end gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">₹{product.price}</span>
                        {product.oldPrice && (
                            <span className="text-lg sm:text-xl text-gray-400 line-through font-medium mb-0.5 sm:mb-1">₹{product.oldPrice}</span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                        {product.description}
                    </p>

                    {/* Color Variants */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="mb-6 sm:mb-8">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Color: <span className="font-normal text-gray-500">Selected</span></p>
                            <div className="flex space-x-2 sm:space-x-3">
                                {product.colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white ring-2 transition-all active:scale-90 ${idx === 0 ? 'ring-gray-900 scale-110' : 'ring-gray-200 hover:ring-gray-400'}`}
                                        style={{ backgroundColor: color }}
                                        aria-label={`Select color ${color}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Line */}
                    <div className="flex flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-10 w-full">
                        {/* Quantity */}
                        <div className="flex items-center justify-between border-2 border-gray-200 rounded-full w-28 sm:w-36 h-12 sm:h-[54px] px-1 sm:px-2 shrink-0">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 active:scale-90 transition-all"><Minus className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 active:scale-90 transition-all"><Plus className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                        </div>

                        <button className="flex-1 bg-[#1c1c1e] hover:bg-black text-white font-bold h-12 sm:h-[54px] rounded-full transition-colors flex items-center justify-center shadow-lg hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black text-sm sm:text-base">
                            Add To Cart
                        </button>
                        <button className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 active:scale-90 transition-all focus-visible:outline-none shrink-0">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 sm:h-[54px] rounded-full transition-all flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 sm:mb-8 active:scale-[0.98] text-sm sm:text-base">
                        Buy Now
                    </button>

                    {/* Meta Info */}
                    <div className="border-t border-gray-100 pt-5 sm:pt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <p className="flex"><span className="font-bold text-gray-900 w-16 shrink-0">SKU :</span> <span className="text-gray-500">{product.sku}</span></p>
                        <p className="flex"><span className="font-bold text-gray-900 w-16 shrink-0">Tags :</span> <span className="text-gray-500">{product.tags}</span></p>
                        <div className="flex items-center">
                            <span className="font-bold text-gray-900 w-16 shrink-0">Share :</span>
                            <div className="flex space-x-3 text-gray-400">
                                <a href="https://www.instagram.com/printos.tvm/" target="_blank" rel="noreferrer"><Instagram className="w-4 h-4 hover:text-pink-600 cursor-pointer active:scale-90 transition-all" /></a>
                                <a href="https://wa.me/918139810721" target="_blank" rel="noreferrer"><WhatsappIcon className="w-4 h-4 hover:text-green-500 cursor-pointer active:scale-90 transition-all" /></a>
                                <Share2 className="w-4 h-4 hover:text-gray-900 cursor-pointer active:scale-90 transition-all" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Product Tabs (Description, Additional Info, Reviews) */}
            <div className="mb-16 sm:mb-24">
                <div className="flex flex-wrap justify-start sm:justify-center border-b border-gray-200 gap-4 sm:gap-8 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-3 sm:pb-4 text-sm sm:text-lg font-bold transition-colors relative whitespace-nowrap active:scale-[0.98] ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Description
                        {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('additional')}
                        className={`pb-3 sm:pb-4 text-sm sm:text-lg font-bold transition-colors relative whitespace-nowrap active:scale-[0.98] ${activeTab === 'additional' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Additional Information
                        {activeTab === 'additional' && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-700 rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('review')}
                        className={`pb-3 sm:pb-4 text-sm sm:text-lg font-bold transition-colors relative whitespace-nowrap active:scale-[0.98] ${activeTab === 'review' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Review ({product.reviews})
                        {activeTab === 'review' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 rounded-t-full"></div>}
                    </button>
                </div>

                <div className="bg-gray-50/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-gray-100">
                    {activeTab === 'description' && (
                        <div className="prose max-w-none text-gray-600 animate-fade-in">
                            <p className="text-sm sm:text-lg leading-relaxed">{product.description}</p>
                            <p className="mt-3 sm:mt-4 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    )}
                    {activeTab === 'additional' && (
                        <div className="animate-fade-in w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-gray-200">
                            <table className="w-full text-left text-xs sm:text-sm min-w-[400px]">
                                <thead className="bg-yellow-400 text-gray-900 font-bold">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 sm:py-4 w-1/3">Feature</th>
                                        <th className="px-4 sm:px-6 py-3 sm:py-4">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr><td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-900">Material</td><td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">Premium quality specified base</td></tr>
                                    <tr className="bg-gray-50"><td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-900">Available Colors</td><td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">Refer to variant selector</td></tr>
                                    <tr><td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-900">Weight</td><td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">Varies per size</td></tr>
                                    <tr className="bg-gray-50"><td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-900">Dimensions</td><td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">Standard / Custom sizing</td></tr>
                                    <tr><td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-900">Brand</td><td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">Printos Internal</td></tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'review' && (
                        <div className="animate-fade-in text-center text-gray-500 py-6 sm:py-8">
                            <Star className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                            <p className="text-sm sm:text-lg font-medium">Customer reviews will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mb-12 sm:mb-24 pt-6 sm:pt-8 border-t border-gray-100">
                    <div className="text-center mb-8 sm:mb-12">
                        <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-400 uppercase flex items-center justify-center gap-3 sm:gap-4 before:h-px before:w-6 sm:before:w-8 before:bg-gray-300 after:h-px after:w-6 sm:after:w-8 after:bg-gray-300">Related Products</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 sm:mt-4">Explore <span className="text-green-700">Related Products</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {relatedProducts.map(relProduct => (
                            <button
                                key={relProduct.id}
                                onClick={() => navigateTo('product', null, relProduct)}
                                className="text-left bg-white rounded-3xl p-5 sm:p-6 flex flex-col h-full group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <div className="bg-[#f4f5f7] rounded-2xl aspect-[4/3] mb-5 sm:mb-6 relative overflow-hidden flex items-center justify-center p-6 sm:p-8 w-full shrink-0">
                                    <span className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 tracking-wide">10% off</span>
                                    <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase truncate pr-2">{relProduct.badge}</p>
                                    </div>
                                    <h3 className="font-bold font-poppins text-gray-900 text-lg sm:text-xl leading-tight mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {relProduct.name}
                                    </h3>
                                    <div className="mt-auto flex flex-col gap-5">
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex items-center space-x-1.5">
                                                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                                                <span className="text-sm font-bold text-gray-600">
                                                    {relProduct.rating} <span className="font-medium text-gray-400">({relProduct.reviews})</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {relProduct.oldPrice && <span className="text-sm text-gray-400 line-through">₹{relProduct.oldPrice}</span>}
                                                <span className="font-black text-2xl text-gray-900">₹{relProduct.price}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 w-full">
                                            <div className="flex items-center justify-center border-2 border-gray-200 text-gray-800 font-bold text-[13px] sm:text-sm py-2.5 rounded-full group-hover:border-gray-800 hover:bg-gray-50 transition-colors px-1 text-center">
                                                Add to Cart
                                            </div>
                                            <div className="flex items-center justify-center bg-[#1c1c1e] text-white font-bold text-[13px] sm:text-sm py-2.5 rounded-full hover:bg-black transition-colors w-full px-1 text-center">
                                                Buy Now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-8 sm:py-10 border-t border-b border-gray-100">
                <div className="flex flex-row sm:flex-col lg:flex-row items-center sm:text-center lg:text-left gap-4 p-3 sm:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Free Shipping</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Free shipping for order above ₹1500</p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col lg:flex-row items-center sm:text-center lg:text-left gap-4 p-3 sm:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Flexible Payment</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Multiple secure payment options</p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col lg:flex-row items-center sm:text-center lg:text-left gap-4 p-3 sm:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <HeadphonesIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">24x7 Support</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">We support online all days.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);

    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollPos(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });

        document.title = "Printos | Custom Printing Services";
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.26 150.6'%3E%3Cpath fill='%232d9ed8' d='M122.26,61.13c0,33.76-27.37,61.13-61.13,61.13-7.42,0-14.54-1.32-21.12-3.75v-57.38c0-11.65,9.47-21.13,21.12-21.13s21.13,9.48,21.13,21.13-9.48,21.13-21.13,21.13c-4.53,0-8.73-1.43-12.17-3.88v22.04c3.85,1.2,7.93,1.84,12.17,1.84,22.68,0,41.13-18.45,41.13-41.13s-18.45-41.13-41.13-41.13S20.01,38.45,20.01,61.13v45.23C7.72,95.18,0,79.06,0,61.13,0,27.37,27.37,0,61.13,0s61.13,27.37,61.13,61.13Z'/%3E%3Cpolygon fill='%232d9ed8' points='20.01 106.36 40.01 118.51 40.01 150.6 20.01 150.6 20.01 106.36'/%3E%3C/svg%3E`;

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateTo = (page, sectionId = null, product = null) => {
        setIsMenuOpen(false);

        if (currentPage !== page || product) {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentPage(page);
                if (product) setSelectedProduct(product);

                if (sectionId) {
                    setTimeout(() => {
                        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                } else {
                    window.scrollTo(0, 0);
                }

                setIsTransitioning(false);
            }, 300);

        } else {
            if (sectionId) {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-white font-poppins text-gray-800 selection:bg-blue-200 selection:text-blue-900 scroll-smooth flex flex-col touch-manipulation">
            <Navbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                scrollPos={scrollPos}
                navigateTo={navigateTo}
                setActiveCategory={setActiveCategory}
                setActiveSubCategory={setActiveSubCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <main className={`pt-[60px] sm:pt-[70px] lg:pt-[116px] bg-white flex-1 transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {currentPage === 'home' && (
                    <>
                        <Hero navigateTo={navigateTo} />
                        <HomeServices navigateTo={navigateTo} setActiveCategory={setActiveCategory} />
                        <About navigateTo={navigateTo} />

                        <section className="py-16 lg:py-24 bg-blue-50/50">
                            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 lg:mb-16 text-gray-900">What our clients say</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                    {TESTIMONIALS.map((t, i) => (
                                        <div key={i} className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-xl border border-blue-100 flex flex-col md:hover:-translate-y-2 transition-all duration-300">
                                            <div className="flex text-yellow-400 mb-4 sm:mb-6">
                                                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
                                            </div>
                                            <p className="italic text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 flex-grow leading-relaxed">"{t.text}"</p>
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                                    {t.init}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm sm:text-base">{t.name}</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">{t.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {currentPage === 'catalog' && (
                    <ProductCatalog
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        activeSubCategory={activeSubCategory}
                        setActiveSubCategory={setActiveSubCategory}
                        navigateTo={navigateTo}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                )}

                {currentPage === 'product' && selectedProduct && (
                    <ProductDetails
                        product={selectedProduct}
                        navigateTo={navigateTo}
                        setActiveCategory={setActiveCategory}
                        setActiveSubCategory={setActiveSubCategory}
                    />
                )}
            </main>

            <Contact />
            <Footer navigateTo={navigateTo} />

            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        .font-poppins {
            font-family: 'Poppins', sans-serif !important;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: slowSpin 25s linear infinite;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s infinite;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.5s ease-out forwards;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6; 
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}} />
        </div>
    );
}
