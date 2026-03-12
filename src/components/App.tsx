import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  ShoppingBag,
  Type,
  Moon,
  Sun,
  Settings2,
  User,
} from "lucide-react";
import {
  CATEGORIES,
  MOCK_PRODUCTS,
  HERO_SLIDES,
  CAROUSEL_SLIDES,
  TESTIMONIALS,
  GOOGLE_REVIEWS,
  STARTUP_SECTIONS,
} from "../data/constants";
import { executeSearchFlow } from "../lib/search/SearchPipeline";
import { useCartManager } from "../hooks/useCartManager";
import { CheckoutPage } from "./checkout/CheckoutPage";
import type { Category, Product, Testimonial } from "../types";
interface IconProps {
  className?: string;
  color?: string;
}
function WhatsappIcon({ className }: IconProps) {
  return (
    <svg
      width="auto"
      height="auto"
      viewBox="0 0 24 24"
      version="1.1"
      id="svg8"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="path4"
        fill="currentColor"
        d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"
      />
    </svg>
  );
}
function PrintosLogo({
  className = "w-10 h-10",
  color = "#2D9ED8",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.26 150.6"
      className={className}
    >
      {" "}
      <path
        fill={color}
        d="M122.26,61.13c0,33.76-27.37,61.13-61.13,61.13-7.42,0-14.54-1.32-21.12-3.75v-57.38c0-11.65,9.47-21.13,21.12-21.13s21.13,9.48,21.13,21.13-9.48,21.13-21.13,21.13c-4.53,0-8.73-1.43-12.17-3.88v22.04c3.85,1.2,7.93,1.84,12.17,1.84,22.68,0,41.13-18.45,41.13-41.13s-18.45-41.13-41.13-41.13S20.01,38.45,20.01,61.13v45.23C7.72,95.18,0,79.06,0,61.13,0,27.37,27.37,0,61.13,0s61.13,27.37,61.13,61.13Z"
      />{" "}
      <polygon
        fill={color}
        points="20.01 106.36 40.01 118.51 40.01 150.6 20.01 150.6 20.01 106.36"
      />{" "}
    </svg>
  );
}
interface NavbarProps {
  cartCount: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollPos: number;
  currentPage: string;
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (sub: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
function Navbar({
  cartCount,
  isMenuOpen,
  setIsMenuOpen,
  scrollPos,
  currentPage,
  navigateTo,
  setActiveCategory,
  setActiveSubCategory,
  searchTerm,
  setSearchTerm,
}: NavbarProps) {
  const isScrolled = scrollPos > 20 || currentPage !== "home";
  const [query, setQuery] = useState(searchTerm || "");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

  const handleCategoryClick = (
    e: React.MouseEvent,
    catId: string,
    subItem: string | null = null,
  ) => {
    e.preventDefault();
    setActiveCategory(catId);
    setActiveSubCategory(subItem);
    setSearchTerm("");
    navigateTo("catalog");
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMobile: boolean,
  ) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      const matches = executeSearchFlow(val, MOCK_PRODUCTS).slice(0, 5);
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
  const executeSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    setSearchTerm(searchVal);
    setQuery("");
    setActiveCategory("All");
    setActiveSubCategory(null);
    setShowDesktopSuggestions(false);
    setShowMobileSuggestions(false);
    navigateTo("catalog");
  };
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-2" : "bg-white pt-4 pb-2 border-b border-gray-100"} text-gray-900`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4">
        {/* Logo (Far Left) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("home", "home");
          }}
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D9ED8] rounded-lg shrink-0 active:scale-95 transition-transform duration-200"
        >
          <PrintosLogo
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] transform md:group-hover:scale-105 transition-all duration-300"
            color="#2D9ED8"
          />
          <span
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors text-gray-900 md:group-hover:text-[#2D9ED8]`}
          >
            Printos
          </span>
        </a>

        {/* Categories (Center) */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-4 flex-1 justify-center">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="relative group h-full">
              <button
                onClick={(e) => handleCategoryClick(e as React.MouseEvent, cat.id)}
                className="px-3 py-6 text-[13px] font-bold text-gray-800 hover:text-[#2D9ED8] uppercase tracking-wider transition-colors border-b-4 border-transparent hover:border-[#2D9ED8]/50"
              >
                {cat.title}
              </button>
              {/* Dropdown */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 z-[70] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-3 min-w-[220px]">
                  {cat.subItems.map((sub) => (
                    <button
                      key={sub}
                      onClick={(e) =>
                        handleCategoryClick(e as React.MouseEvent, cat.id, sub)
                      }
                      className="w-full text-left px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-[#2D9ED8] hover:bg-blue-50 transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Search & Icons (Far Right) */}
        <div className="flex items-center justify-end gap-4 sm:gap-6 xl:w-[400px]">
          {/* Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeSearch(query);
            }}
            className="relative hidden md:block w-full max-w-[240px]"
          >
            <div className="relative group w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#2D9ED8] transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e, false)}
                onFocus={() => {
                  if (query.trim()) setShowDesktopSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowDesktopSuggestions(false), 200)}
                placeholder="Search products..."
                className="w-full bg-gray-100 text-sm font-medium rounded-md py-2.5 pl-9 pr-4 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-200 focus:border-gray-200 border border-transparent transition-all"
              />
            </div>
            {/* Desktop Suggestions */}
            {showDesktopSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[60] animate-fade-in">
                {suggestions.map((item) => {
                  const catData = CATEGORIES.find(c => c.id === item.category);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setShowDesktopSuggestions(false);
                        setQuery("");
                        navigateTo("product", null, item);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 rounded shrink-0 object-cover bg-gray-100"
                      />
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider truncate">
                          {catData?.title} • {item.subCategory}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </form>

          {/* User & Cart Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigateTo('login')}
              className="flex flex-col items-center gap-1 text-gray-800 hover:text-[#2D9ED8] transition-colors group"
            >
              <User className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] group-hover:scale-105 transition-transform" />
              <span className="text-[10px] sm:text-xs font-bold leading-none hidden xl:block">Login</span>
            </button>
            <button
              onClick={() => navigateTo('cart')}
              className="relative flex flex-col items-center gap-1 text-gray-800 hover:text-[#2D9ED8] transition-colors group"
            >
              <ShoppingBag className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] group-hover:scale-105 transition-transform" />
              <span className="text-[10px] sm:text-xs font-bold leading-none hidden xl:block">Cart</span>
              <span className="absolute -top-1.5 -right-1 sm:-right-2 bg-[#2D9ED8] text-white text-[10px] font-bold w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full flex items-center justify-center border-2 border-white">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 -mr-2 rounded-full transition-colors active:scale-90 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-[56px] sm:top-[64px] md:top-[66px] left-0 w-full h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] md:h-[calc(100vh-66px)] bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 xl:hidden overflow-y-auto ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}
      >
        <div className="flex flex-col px-6 py-6 gap-4 pb-24">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeSearch(query);
              setIsMenuOpen(false);
            }}
            className="relative mb-4"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e, true)}
              placeholder="Search..."
              className="w-full bg-gray-100 text-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          <div className="border-t border-gray-100 pt-4 font-bold text-gray-800 text-lg uppercase tracking-wider mb-2">
            Categories
          </div>
          <ul className="flex flex-col gap-3 pl-2">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={(e) => handleCategoryClick(e as React.MouseEvent, cat.id)}
                  className="text-left text-base font-medium text-gray-700 active:text-[#2D9ED8] active:scale-[0.98] transition-all"
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
interface FooterProps {
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
}
function GlobalTrustBadges() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-200">
      {" "}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 text-center mb-8">
        {" "}
        <h2 className="text-2xl font-medium text-gray-900">
          Why Choose Printos
        </h2>{" "}
      </div>{" "}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {" "}
        <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-3xl shadow-sm hover:-translate-y-1 hover:bg-[#2D9ED8]/10 hover:backdrop-blur-md hover:border-[#2D9ED8]/30 border border-transparent hover:shadow-lg transition-all duration-300">
          {" "}
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            {" "}
            <Truck className="w-7 h-7" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h4 className="font-medium text-gray-900 text-lg">
              Fast & Free Shipping
            </h4>{" "}
            <p className="text-sm text-gray-500 mt-2">
              On orders over ₹1500
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-3xl shadow-sm hover:-translate-y-1 hover:bg-[#2D9ED8]/10 hover:backdrop-blur-md hover:border-[#2D9ED8]/30 border border-transparent hover:shadow-lg transition-all duration-300">
          {" "}
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            {" "}
            <ShieldCheck className="w-7 h-7" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h4 className="font-medium text-gray-900 text-lg">
              Secure Payments
            </h4>{" "}
            <p className="text-sm text-gray-500 mt-2">
              100% SECURE checkout
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-3xl shadow-sm hover:-translate-y-1 hover:bg-[#2D9ED8]/10 hover:backdrop-blur-md hover:border-[#2D9ED8]/30 border border-transparent hover:shadow-lg transition-all duration-300">
          {" "}
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            {" "}
            <HeadphonesIcon className="w-7 h-7" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h4 className="font-medium text-gray-900 text-lg">
              24/7 Support
            </h4>{" "}
            <p className="text-sm text-gray-500 mt-2">
              Always here to help you
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-black text-gray-400 pt-8 pb-16 border-t border-gray-800 relative overflow-hidden">
      {" "}
      <div className="w-full overflow-hidden bg-gradient-to-r from-blue-600 via-[#2D9ED8] to-blue-400 text-white py-4 mb-12 lg:mb-16 transform -skew-y-2 shadow-2xl z-20 border-y-4 border-gray-900">
        {" "}
        <div className="animate-marquee whitespace-nowrap font-extrabold text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase flex gap-4 sm:gap-8">
          {" "}
          <span>
            PREMIUM QUALITY • FAST TURNAROUND • CUSTOM DESIGNS • 100%
            SATISFACTION • PRINTING REIMAGINED •
          </span>{" "}
          <span>
            PREMIUM QUALITY • FAST TURNAROUND • CUSTOM DESIGNS • 100%
            SATISFACTION • PRINTING REIMAGINED •
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 relative z-10">
        {" "}
        <div className="sm:col-span-2 md:col-span-5">
          {" "}
          <div className="flex items-center space-x-3 mb-6">
            {" "}
            <PrintosLogo
              className="w-8 h-8 lg:w-10 lg:h-10"
              color="#ffffff"
            />{" "}
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Printos
            </span>{" "}
          </div>{" "}
          <p className="text-sm leading-relaxed max-w-sm font-light">
            {" "}
            Printos is your trusted partner for premium custom printing
            solutions. Delivering precision, quality, and creativity to
            businesses and individuals alike.{" "}
          </p>{" "}
          <div className="flex space-x-4 mt-6">
            {" "}
            <a
              href="https://www.instagram.com/printos.tvm/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 active:bg-pink-700 text-white md:hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {" "}
              <Instagram className="w-4 h-4" />{" "}
            </a>{" "}
            <a
              href="https://wa.me/918139810721"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-green-500 active:bg-green-600 text-white md:hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {" "}
              <WhatsappIcon className="w-4 h-4" />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="md:col-span-3">
          {" "}
          <h3 className="text-white font-medium mb-6 text-sm tracking-widest uppercase">
            Quick Links
          </h3>{" "}
          <ul className="space-y-3 text-sm font-light">
            {" "}
            <li>
              {" "}
              <button
                onClick={() => navigateTo("home", "home")}
                className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center"
              >
                {" "}
                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />
                Home{" "}
              </button>{" "}
            </li>{" "}
            <li>
              {" "}
              <button
                onClick={() => navigateTo("catalog")}
                className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center"
              >
                {" "}
                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />
                Categories{" "}
              </button>{" "}
            </li>{" "}
            <li>
              {" "}
              <button
                onClick={() => navigateTo("home", "about")}
                className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center"
              >
                {" "}
                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />
                About Us{" "}
              </button>{" "}
            </li>{" "}
            <li>
              {" "}
              <button
                onClick={() => navigateTo("home", "contact")}
                className="hover:text-blue-400 active:text-blue-500 md:hover:translate-x-2 transition-all duration-300 flex items-center"
              >
                {" "}
                <ChevronRight className="w-3 h-3 mr-2 shrink-0" />
                Contact{" "}
              </button>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mt-12 lg:mt-16 pt-8 border-t border-gray-800 text-xs flex flex-col md:flex-row justify-between items-center text-center md:text-left font-light tracking-wide gap-4">
        {" "}
        <p>&copy; 2026 Printos. All rights reserved.</p>{" "}
        <div className="flex space-x-6">
          {" "}
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>{" "}
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative h-[300px] sm:h-[450px] lg:h-[650px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] sm:border-[10px] border-white group">
      {" "}
      {HERO_SLIDES.map((slide, index) => (
        <img
          loading="lazy"
          key={index}
          src={slide}
          alt={`Printing showcase ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform md:group-hover:scale-105 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        />
      ))}{" "}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex justify-center gap-2 sm:gap-3">
        {" "}
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${index === current ? "bg-[#2D9ED8] w-6 sm:w-8" : "bg-white hover:bg-[#2D9ED8] w-2 sm:w-2.5 shadow-sm"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
}
interface HeroProps {
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
}
function Hero({ navigateTo }: HeroProps) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % CAROUSEL_SLIDES.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="w-full relative bg-gray-50 flex flex-col pt-[80px] lg:pt-[116px]"
    >
      <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden bg-black">
        {CAROUSEL_SLIDES.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === slide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              loading={idx === 0 ? "eager" : "lazy"}
              src={item.image}
              alt={item.heading}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 z-20 max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center">
              <div
                className={`max-w-xl text-white transition-all duration-1000 transform ${idx === slide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                  {item.heading}
                </h1>
                <p className="text-lg sm:text-xl font-medium mb-8 text-gray-200">
                  {item.subheading}
                </p>
                <button
                  onClick={() => navigateTo("catalog")}
                  className="px-8 py-3 bg-[#f58634] text-white font-medium rounded-lg hover:bg-orange-600 transition-all text-lg shadow-lg"
                >
                  {item.cta}
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === slide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80 w-2.5"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
interface HomeServicesProps {
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (sub: string | null) => void;
}
function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-gray-100 dark:border-gray-800">
      {" "}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 text-center">
        {" "}
        <h2 className="text-3xl lg:text-5xl font-extrabold text-blue-600 mb-6">
          Our Story
        </h2>{" "}
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>{" "}
        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
          {" "}
          At Printos, we believe that every brand deserves to stand out. From
          humble beginnings, we evolved into a premium custom printing agency
          dedicated to transforming your ideas into tangible, high-quality
          products. Our team combines state-of-the-art technology with an
          obsessive attention to detail, ensuring your message leaves a lasting
          impression.{" "}
        </p>{" "}
        <div className="mt-12 flex justify-center gap-6 text-gray-400 dark:text-gray-500">
          {" "}
          <Award className="w-10 h-10" /> <Star className="w-10 h-10" />{" "}
          <HeartHandshake className="w-10 h-10" />{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
function HomeServices({ navigateTo, setActiveCategory, setActiveSubCategory }: HomeServicesProps) {
  // Compute highest-rated product per category for Popular Categories
  const topPerCategory = CATEGORIES.map((cat) => {
    const products = MOCK_PRODUCTS.filter((p) => p.category === cat.id);
    if (products.length === 0) return null;
    const best = products.reduce((a, b) =>
      parseFloat(a.rating) >= parseFloat(b.rating) ? a : b
    );
    return { cat, best };
  }).filter(Boolean) as { cat: typeof CATEGORIES[0]; best: typeof MOCK_PRODUCTS[0] }[];

  // Last 6 products added (by id desc) for New Launches
  const newLaunches = [...MOCK_PRODUCTS].sort((a, b) => b.id - a.id).slice(0, 6);

  const goToCategory = (catId: string, sub?: string) => {
    setActiveCategory(catId);
    setActiveSubCategory(sub ?? null);
    navigateTo("catalog");
  };

  return (
    <div className="bg-white flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Shop By Business Needs */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800">
            Shop By Business Needs
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div
            onClick={() => navigateTo("startup")}
            className="cursor-pointer group flex flex-col items-center"
          >
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop"
              alt="Startup Planning"
              className="w-full aspect-video object-cover mb-3"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">
              Startup Planning
            </span>
          </div>
          <div
            onClick={() => navigateTo("catalog")}
            className="cursor-pointer group flex flex-col items-center"
          >
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=300&auto=format&fit=crop"
              alt="Event and Promotion"
              className="w-full aspect-video object-cover mb-3"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">
              Event and Promotion
            </span>
          </div>
          <div
            onClick={() => navigateTo("catalog")}
            className="cursor-pointer group flex flex-col items-center"
          >
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=300&auto=format&fit=crop"
              alt="Cafe and Restaurant Essentials"
              className="w-full aspect-video object-cover mb-3"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">
              Cafe and Restaurant Essentials
            </span>
          </div>
          <div
            onClick={() => navigateTo("catalog")}
            className="cursor-pointer group flex flex-col items-center"
          >
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=300&auto=format&fit=crop"
              alt="Employee Gifting"
              className="w-full aspect-video object-cover bg-gray-100 mb-3"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">
              Employee Gifting
            </span>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800">
            Popular Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {topPerCategory.map(({ cat, best }) => (
            <div
              key={cat.id}
              onClick={() => goToCategory(cat.id)}
              className="cursor-pointer group bg-gray-50 hover:bg-gray-100 flex flex-col items-center rounded-2xl overflow-hidden border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  loading="lazy"
                  src={best.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5">
                  <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                  <span className="text-[11px] font-medium text-gray-800">{best.rating}</span>
                </div>
              </div>
              <div className="px-3 py-3 w-full">
                <p className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-[#2D9ED8] transition-colors truncate">{cat.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{best.subCategory}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Launches */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800">New Launches</h2>
          <button
            onClick={() => goToCategory("All")}
            className="text-xs sm:text-sm font-semibold text-[#2D9ED8] hover:underline flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {newLaunches.map((product, idx) => {
            const catData = CATEGORIES.find(c => c.id === product.category);
            return (
              <button
                key={product.id}
                onClick={() => navigateTo("product", null, product)}
                className="w-full flex items-center gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-blue-50/60 transition-colors group text-left"
              >
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-medium flex items-center justify-center shrink-0 group-hover:bg-[#2D9ED8] group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#2D9ED8] truncate transition-colors">{product.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); goToCategory(product.category, product.subCategory); }}
                      className="text-[11px] sm:text-xs text-[#2D9ED8] font-semibold hover:underline"
                    >
                      {catData?.title}
                    </button>
                    <span className="text-gray-200">•</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); goToCategory(product.category, product.subCategory); }}
                      className="text-[11px] sm:text-xs text-gray-400 font-medium hover:underline"
                    >
                      {product.subCategory}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-sm font-extrabold text-gray-900">₹{product.price}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                    <span className="text-[11px] text-gray-500">{product.rating}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2D9ED8] shrink-0 transition-colors" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews reviews={GOOGLE_REVIEWS} />

      {/* Features (Trust Badges) */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
            <Clock className="w-8 h-8 text-[#7e22ce] mb-4" />
            <h4 className="font-medium text-gray-800 text-sm mb-2">
              Fast Turn
              <br />
              Around
            </h4>
            <p className="text-xs text-gray-500">
              Fast and on-time delivery
              <br />
              of all handbooks
            </p>
          </div>
          <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
            <ShoppingBag className="w-8 h-8 text-[#7e22ce] mb-4" />
            <h4 className="font-medium text-gray-800 text-sm mb-2">
              Everything in print
              <br />
              packaging
            </h4>
            <p className="text-xs text-gray-500">
              Every kind of printing or
              <br />
              packaging requirements, are
              <br />
              made in one place!
            </p>
          </div>
          <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
            <ImageIcon className="w-8 h-8 text-[#7e22ce] mb-4" />
            <h4 className="font-medium text-gray-800 text-sm mb-2">
              In-House
              <br />
              Machinery
            </h4>
            <p className="text-xs text-gray-500">
              Quality checking is easy,
              <br />
              all in-house!
            </p>
          </div>
          <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
            <Package className="w-8 h-8 text-[#7e22ce] mb-4" />
            <h4 className="font-medium text-gray-800 text-sm mb-2">
              Wide Product
              <br />
              Range
            </h4>
            <p className="text-xs text-gray-500">
              From caps to hoodies -<br />
              we print it all.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Ad Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=600&auto=format&fit=crop"
          alt="App Banner"
          className="w-full h-24 object-cover cursor-pointer"
        />
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=600&auto=format&fit=crop"
          alt="Stores Banner"
          className="w-full h-24 object-cover cursor-pointer"
        />
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: CATEGORIES[0].title,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        "Please enter a valid email address formatting (e.g., name@example.com).",
      );
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/abhiramkrishna11550@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Quote Request from ${formData.name}`,
            Name: formData.name,
            Email: formData.email,
            Category: formData.category,
            Details: formData.message,
            _captcha: "false",
          }),
        },
      );
      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          category: CATEGORIES[0].title,
          message: "",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus("idle");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  };
  return (
    <section
      id="contact"
      className="relative py-16 lg:py-24 bg-white text-gray-900 overflow-hidden"
    >
      {" "}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {" "}
          <div className="lg:col-span-7 xl:col-span-8">
            {" "}
            <div className="bg-[#FAFAFA] p-8 sm:p-10 lg:p-12 rounded-[2rem] shadow-sm relative w-full h-full">
              {" "}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-gray-900 mt-2">
                Contact Us
              </h2>{" "}
              <p className="text-base sm:text-lg text-gray-500 font-normal mb-10 max-w-2xl leading-relaxed">
                {" "}
                We are deeply committed to delivering unparalleled service and
                unwavering support to ensure your experience exceeds
                expectations.{" "}
              </p>{" "}
              <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                {" "}
                <div className="mb-6 sm:mb-8">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>{" "}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none block p-4 transition-shadow"
                      placeholder="Full Name"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>{" "}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border ${errorMessage ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-indigo-500"} text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-2 block p-4 transition-shadow`}
                      placeholder="Email"
                    />{" "}
                    {errorMessage && (
                      <p className="text-red-500 text-xs font-medium mt-1.5">
                        {errorMessage}
                      </p>
                    )}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>{" "}
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none block p-4 transition-shadow cursor-pointer appearance-none"
                    >
                      {" "}
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.title}>
                          {cat.title}
                        </option>
                      ))}{" "}
                    </select>{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>{" "}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full bg-transparent border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none block p-4 transition-shadow resize-none"
                    placeholder="Message"
                  ></textarea>{" "}
                </div>{" "}
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full flex justify-center items-center px-8 py-4 sm:py-5 rounded-xl text-base font-semibold text-white bg-[#2D9ED8] hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {" "}
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />{" "}
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" /> Message Sent!
                    </>
                  ) : (
                    <>Submit</>
                  )}{" "}
                </button>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-4">
            {/* Address Card */}
            <div
              className="group p-8 rounded-[1.5rem] flex items-start gap-5 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer border bg-white text-gray-900 hover:bg-gradient-to-br hover:from-blue-500 hover:to-[#2D9ED8] hover:text-white border-gray-50"
            >
              <div className="p-2 rounded-full border shrink-0 mt-1 transition-colors border-gray-300 text-gray-700 group-hover:border-white/30 group-hover:text-white">
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Address</h4>
                <p className="text-sm font-light leading-relaxed text-gray-500 group-hover:text-white/90">
                  AKG Center, General Hospital Rd,
                  <br /> Jai Vihar, Kunnukuzhy,
                  <br /> Thiruvananthapuram, Kerala 695035
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div
              className="group p-8 rounded-[1.5rem] flex items-start gap-5 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer border bg-white text-gray-900 hover:bg-gradient-to-br hover:from-blue-500 hover:to-[#2D9ED8] hover:text-white border-gray-50"
            >
              <div className="p-2 rounded-full border shrink-0 mt-1 transition-colors border-gray-300 text-gray-700 group-hover:border-white/30 group-hover:text-white">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Contact</h4>
                <p className="text-sm font-normal leading-relaxed mb-1 text-gray-500 group-hover:text-white/90">
                  Talk to us and see how we can work
                </p>
                <a
                  href="tel:+918139810721"
                  className="text-sm font-medium transition-colors text-gray-700 group-hover:text-white hover:text-blue-500 group-hover:hover:text-blue-100"
                >
                  +91 81398 10721
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div
              className="group p-8 rounded-[1.5rem] flex items-start gap-5 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer border bg-white text-gray-900 hover:bg-gradient-to-br hover:from-blue-500 hover:to-[#2D9ED8] hover:text-white border-gray-50"
            >
              <div className="p-2 rounded-full border shrink-0 mt-1 transition-colors border-gray-300 text-gray-700 group-hover:border-white/30 group-hover:text-white">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Email</h4>
                <p className="text-sm font-normal leading-relaxed mb-1 text-gray-500 group-hover:text-white/90">
                  We're usually replying within 24 hours
                </p>
                <a
                  href="mailto:printostvm@gmail.com"
                  className="text-sm font-medium transition-colors break-all text-gray-700 group-hover:text-white hover:text-blue-500 group-hover:hover:text-blue-100"
                >
                  printostvm@gmail.com
                </a>
              </div>
            </div>

            {/* Working Hours Card */}
            <div
              className="group p-8 rounded-[1.5rem] flex items-start gap-5 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer border bg-white text-gray-900 hover:bg-gradient-to-br hover:from-blue-500 hover:to-[#2D9ED8] hover:text-white border-gray-50"
            >
              <div className="p-2 rounded-full border shrink-0 mt-1 transition-colors border-gray-300 text-gray-700 group-hover:border-white/30 group-hover:text-white">
                <Clock className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Working Hours</h4>
                <p className="text-sm font-normal leading-relaxed text-gray-500 group-hover:text-white/90">
                  Mon To Sat - 9:30 am To 8:00 pm
                  <br /> Sunday - Closed
                </p>
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
interface ProductCatalogProps {
  addToCart: (p: Product) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeSubCategory: string | null;
  setActiveSubCategory: (sub: string | null) => void;
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
function ProductCatalog({
  addToCart,
  activeCategory,
  setActiveCategory,
  activeSubCategory,
  setActiveSubCategory,
  navigateTo,
  searchTerm,
  setSearchTerm,
}: ProductCatalogProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "apparel",
  ]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeSpecialFilter, setActiveSpecialFilter] = useState<
    null | "new" | "best" | "discount"
  >(null);
  useEffect(() => {
    if (
      activeCategory !== "All" &&
      !expandedCategories.includes(activeCategory)
    ) {
      setExpandedCategories((prev) => [...prev, activeCategory]);
    }
  }, [activeCategory]);
  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubCategory(null);
    setSearchTerm("");
    setActiveSpecialFilter(null);
    if (!expandedCategories.includes(catId)) {
      setExpandedCategories([...expandedCategories, catId]);
    } else {
      setExpandedCategories(expandedCategories.filter((id) => id !== catId));
    }
  };
  const handleSpecialFilterClick = (filter: "new" | "best" | "discount") => {
    setActiveSpecialFilter(filter === activeSpecialFilter ? null : filter);
    setActiveCategory("All");
    setActiveSubCategory(null);
    setSearchTerm("");
  };
  const filteredProducts = executeSearchFlow(searchTerm || "", MOCK_PRODUCTS).filter((product) => {
    // Special filters take precedence or can be combined with search
    if (activeSpecialFilter) {
      if (activeSpecialFilter === "new") {
        // Show last 10 added products (assuming MOCK_PRODUCTS is ordered)
        const lastTenIds = MOCK_PRODUCTS.slice(-10).map((p) => p.id);
        return lastTenIds.includes(product.id);
      }
      if (activeSpecialFilter === "best") {
        return parseFloat(product.rating) >= 4.8;
      }
      if (activeSpecialFilter === "discount") {
        return (
          product.oldPrice &&
          parseInt(product.oldPrice) > parseInt(product.price)
        );
      }
    }

    const matchesCat =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSub =
      !activeSubCategory || product.subCategory === activeSubCategory;
    return matchesCat && matchesSub;
  });
  return (
    <div className="relative pt-4 sm:pt-6 pb-12 md:pl-[150px]">
      {/* Back Button */}
      <button
        onClick={() => navigateTo("back")}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#2D9ED8] transition-colors group w-fit"
      >
        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        className="md:hidden flex items-center justify-between w-full bg-gray-100 px-4 py-3 rounded-xl font-medium text-gray-800 active:scale-[0.98] transition-transform mb-4 mx-4"
      >
        <span className="flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters &amp; Categories
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`}
        />
      </button>
      {/* Layout wrapper: stable grid for sidebar + content */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-10 min-h-screen pr-4 sm:pr-8 lg:pr-12">
        {" "}
        {/* Sidebar: Categories Navigation — scrolls naturally with page */}
        <div
          className={`font-poppins
            ${isMobileFilterOpen ? "block" : "hidden md:block"}
            w-full md:w-[240px]
          `}
        >
          {" "}
          <h2 className="hidden md:block text-[22px] font-extrabold text-gray-900 mb-6">
            Category
          </h2>{" "}
          <div className="space-y-1">
            {" "}
            {/* "All Product" Base Item */}{" "}
            <div className="mb-2">
              {" "}
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveSubCategory(null);
                  setSearchTerm("");
                  setExpandedCategories(["all"]);
                  setIsMobileFilterOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 rounded-[14px] transition-colors active:scale-[0.98] ${activeCategory === "All" ? "bg-blue-50 font-medium text-blue-600" : "hover:bg-gray-50 text-gray-600 font-medium"}`}
              >
                {" "}
                <div className="flex items-center gap-3">
                  {" "}
                  <Package
                    className={`w-5 h-5 ${activeCategory === "All" ? "text-blue-600" : "text-gray-500"}`}
                  />{" "}
                  <span className="text-sm sm:text-base">All Product</span>{" "}
                </div>{" "}
                <div className="flex items-center gap-2">
                  {" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeCategory === "All" ? "rotate-180 text-blue-600" : "text-gray-400"}`}
                  />{" "}
                </div>{" "}
              </button>{" "}
              <div
                className={`ml-3 sm:ml-4 mt-1 border-l-[1.5px] border-gray-200 pl-3 sm:pl-4 py-2 space-y-1 transition-all block`}
              >
                {" "}
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedCategories.includes(cat.id);
                  return (
                    <div key={cat.id} className="relative">
                      {" "}
                      <div className="absolute w-3 sm:w-4 h-[1.5px] bg-gray-200 -left-3 sm:-left-4 top-[18px]"></div>{" "}
                      <button
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full text-left py-2 px-2 sm:px-3 rounded-lg text-[13px] sm:text-sm transition-colors flex items-center justify-between active:scale-[0.98] ${activeCategory === cat.id && !activeSubCategory && !searchTerm ? "text-gray-900 font-medium bg-blue-50" : "text-gray-500 hover:text-gray-900 font-medium"}`}
                      >
                        {" "}
                        <span className="flex items-center gap-2 truncate">
                          {" "}
                          <cat.icon className="w-4 h-4 opacity-60 shrink-0" />{" "}
                          <span className="truncate">{cat.title}</span>{" "}
                        </span>{" "}
                        {cat.subItems.length > 0 && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        )}{" "}
                      </button>{" "}
                      {isExpanded && cat.subItems.length > 0 && (
                        <div className="pl-4 sm:pl-5 pb-2 space-y-1 mt-1 animate-fade-in">
                          {" "}
                          {cat.subItems.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setActiveCategory(cat.id);
                                setActiveSubCategory(sub);
                                setSearchTerm("");
                                setActiveSpecialFilter(null);
                                setIsMobileFilterOpen(false);
                              }}
                              className={`w-full text-left py-1.5 px-2 rounded-md text-xs sm:text-[13px] transition-colors truncate active:scale-[0.98] ${activeSubCategory === sub && !searchTerm ? "text-blue-600 font-medium bg-blue-50/50" : "text-gray-500 hover:text-gray-900 font-medium"}`}
                            >
                              {" "}
                              {sub}{" "}
                            </button>
                          ))}{" "}
                        </div>
                      )}{" "}
                    </div>
                  );
                })}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="h-px bg-gray-200 my-4 sm:my-6 mx-2"></div>{" "}
          {/* Bottom Utility Links */}{" "}
          <div className="space-y-1">
            {" "}
            <button
              onClick={() => handleSpecialFilterClick("new")}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base active:scale-[0.98] ${activeSpecialFilter === "new" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 font-medium"}`}
            >
              {" "}
              <span className="flex items-center gap-3">
                <Sparkles
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${activeSpecialFilter === "new" ? "text-blue-600" : "text-gray-400"}`}
                />{" "}
                New Arrival
              </span>{" "}
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 -rotate-90" />{" "}
            </button>{" "}
            <button
              onClick={() => handleSpecialFilterClick("best")}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base active:scale-[0.98] ${activeSpecialFilter === "best" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 font-medium"}`}
            >
              {" "}
              <span className="flex items-center gap-3">
                <TrendingUp
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${activeSpecialFilter === "best" ? "text-blue-600" : "text-gray-400"}`}
                />{" "}
                Best Seller
              </span>{" "}
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 -rotate-90" />{" "}
            </button>{" "}
            <button
              onClick={() => handleSpecialFilterClick("discount")}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base active:scale-[0.98] ${activeSpecialFilter === "discount" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 font-medium"}`}
            >
              {" "}
              <span className="flex items-center gap-3">
                <Percent
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${activeSpecialFilter === "discount" ? "text-blue-600" : "text-gray-400"}`}
                />{" "}
                On Discount
              </span>{" "}
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 -rotate-90" />{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        {/* Main Area: Product Grid & Breadcrumb */}{" "}
        <div className="flex flex-col min-h-[600px]">
          {" "}
          {/* Breadcrumb Navigation */}{" "}
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-medium flex-wrap">
            {" "}
            <button
              onClick={() => {
                navigateTo("home");
                setActiveSpecialFilter(null);
              }}
              className="hover:text-blue-600 transition-colors shrink-0 py-1"
            >
              Home
            </button>{" "}
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />{" "}
            <button
              onClick={() => {
                setActiveSubCategory(null);
                setSearchTerm("");
              }}
              className={`hover:text-blue-600 transition-colors shrink-0 py-1 ${!activeSubCategory && activeCategory !== "All" && !searchTerm ? "text-gray-900 font-medium pointer-events-none" : ""}`}
            >
              {" "}
              {activeCategory === "All"
                ? activeSpecialFilter
                  ? activeSpecialFilter === "new"
                    ? "New Arrivals"
                    : activeSpecialFilter === "best"
                      ? "Best Sellers"
                      : "On Discount"
                  : "All Products"
                : CATEGORIES.find((c) => c.id === activeCategory)?.title}{" "}
            </button>{" "}
            {activeSubCategory && (
              <>
                {" "}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />{" "}
                <span
                  className={`shrink-0 py-1 ${!searchTerm ? "text-gray-900 font-medium" : ""}`}
                >
                  {activeSubCategory}
                </span>{" "}
              </>
            )}{" "}
            {searchTerm && (
              <>
                {" "}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />{" "}
                <span className="text-gray-900 font-medium shrink-0 truncate py-1">
                  Search
                </span>{" "}
              </>
            )}{" "}
          </nav>{" "}
          {/* Search Results Highlight Banner */}{" "}
          {searchTerm && (
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50/50 border border-blue-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl animate-fade-in gap-3">
              {" "}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Showing results for{" "}
                <strong className="text-gray-900 text-sm sm:text-base">
                  "{searchTerm}"
                </strong>
              </p>{" "}
              <button
                onClick={() => {
                  setSearchTerm("");
                }}
                className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 active:text-blue-900 transition-colors flex items-center gap-1 w-fit"
              >
                {" "}
                <X className="w-4 h-4" /> Clear Search{" "}
              </button>{" "}
            </div>
          )}{" "}
          {/* Animated Wrapper for grid items */}{" "}
          {filteredProducts.length > 0 ? (
            <div
              key={`${activeCategory}-${activeSubCategory}-${searchTerm}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in-up content-start"
            >
              {" "}
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => navigateTo("product", null, product)}
                  className="text-left bg-white rounded-3xl p-5 sm:p-6 flex flex-col h-full group transition-all duration-300 md:hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {" "}
                  {/* Product Image Panel */}{" "}
                  <div className="bg-[#f4f5f7] rounded-2xl aspect-[4/3] mb-5 sm:mb-6 relative overflow-hidden flex items-center justify-center p-6 sm:p-8 w-full shrink-0">
                    {" "}
                    {/* Badge */}{" "}
                    <span className="absolute top-4 right-4 bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-gray-700 border border-gray-200 shadow-sm z-10 tracking-wide">
                      {" "}
                      {product.badge}{" "}
                    </span>{" "}
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500"
                    />{" "}
                  </div>{" "}
                  {/* Product Details */}{" "}
                  <div className="flex-1 flex flex-col w-full">
                    {" "}
                    <h3 className="font-medium font-poppins text-gray-900 text-lg sm:text-xl leading-tight mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {" "}
                      {product.name}{" "}
                    </h3>{" "}
                    <div className="mt-auto flex flex-col gap-5">
                      {" "}
                      <div className="flex flex-row items-center justify-between">
                        {" "}
                        <div className="flex items-center space-x-1.5">
                          {" "}
                          <Star className="w-5 h-5 fill-orange-400 text-orange-400" />{" "}
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {" "}
                            {product.rating}{" "}
                            <span className="font-medium text-gray-400">
                              ({product.reviews})
                            </span>{" "}
                          </span>{" "}
                        </div>{" "}
                        <span className="font-bold text-2xl text-gray-900">
                          ₹{product.price}
                        </span>{" "}
                      </div>{" "}
                      {/* Actions */}{" "}
                      <div className="grid grid-cols-2 gap-3 w-full">
                        {" "}
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} className="flex items-center justify-center border-2 border-gray-200 text-gray-800 font-medium text-[13px] sm:text-sm py-2.5 rounded-full group-hover:border-gray-800 hover:bg-gray-50 transition-colors w-full px-1 text-center">
                          {" "}
                          Add to Cart{" "}
                        </button>{" "}
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); navigateTo('cart'); }} className="flex items-center justify-center bg-[#1c1c1e] text-white font-medium text-[13px] sm:text-sm py-2.5 rounded-full hover:bg-black transition-colors w-full px-1 text-center">
                          {" "}
                          Buy Now{" "}
                        </button>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </button>
              ))}{" "}
            </div>
          ) : (
            <div
              key={`empty-${activeCategory}-${activeSubCategory}-${searchTerm}`}
              className="flex-1 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-[20px] sm:rounded-[30px] px-4 text-center animate-fade-in"
            >
              <Search className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-30" />{" "}
              <p className="font-medium text-sm sm:text-lg text-gray-500">
                No products found matching your criteria.
              </p>{" "}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                  setActiveSubCategory(null);
                }}
                className="mt-3 sm:mt-4 text-blue-600 font-medium hover:underline active:text-blue-800 text-sm sm:text-base"
              >
                {" "}
                View all products{" "}
              </button>{" "}
            </div>
          )}{" "}
        </div>{" "}

      </div>
    </div>
  );
}

interface ProductDetailsProps {
  addToCart: (p: Product, qty: number) => void;
  product: Product | null;
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (sub: string | null) => void;
}
function ProductDetails({
  addToCart,
  product,
  navigateTo,
  setActiveCategory,
  setActiveSubCategory,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(product?.image || "");
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
    }
  }, [product]);
  if (!product) return null;
  const categoryData = CATEGORIES.find((c) => c.id === product.category);
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);
  const handleCopyLink = () => {
    const dummyUrl = `https://printos.tvm/product/${product.id}`;
    const currentUrl =
      window.location.href.includes("localhost") ||
        window.location.href.includes("preview")
        ? dummyUrl
        : window.location.href;
    const textArea = document.createElement("textarea");
    textArea.value = `Check out ${product.name} at Printos: ${currentUrl}`;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
    document.body.removeChild(textArea);
  };
  const handleNativeShare = () => {
    const dummyUrl = `https://printos.tvm/product/${product.id}`;
    const currentUrl =
      window.location.href.includes("localhost") ||
        window.location.href.includes("preview")
        ? dummyUrl
        : window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out ${product.name} at Printos!`,
          url: currentUrl,
        })
        .catch((err) => console.log("Error sharing", err));
    } else {
      handleCopyLink();
    }
  };
  const getWhatsappShareLink = () => {
    const dummyUrl = `https://printos.tvm/product/${product.id}`;
    const currentUrl =
      window.location.href.includes("localhost") ||
        window.location.href.includes("preview")
        ? dummyUrl
        : window.location.href;
    return `https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} at Printos! ${currentUrl}`)}`;
  };
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-12 animate-fade-in-up">
      {" "}
      {/* Back Button */}
      <button
        onClick={() => navigateTo("back")}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#2D9ED8] transition-colors group mb-4"
      >
        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>
      {/* Breadcrumbs */}{" "}
      <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 font-medium flex-wrap">
        {" "}
        <button
          onClick={() => navigateTo("home")}
          className="hover:text-blue-600 transition-colors shrink-0 py-1"
        >
          Home
        </button>{" "}
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />{" "}
        <button
          onClick={() => {
            setActiveCategory(product.category);
            setActiveSubCategory(null);
            navigateTo("catalog");
          }}
          className="hover:text-blue-600 transition-colors shrink-0 py-1"
        >
          {" "}
          {categoryData?.title}{" "}
        </button>{" "}
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />{" "}
        <button
          onClick={() => {
            setActiveCategory(product.category);
            setActiveSubCategory(product.subCategory);
            navigateTo("catalog");
          }}
          className="hover:text-blue-600 transition-colors shrink-0 py-1"
        >
          {" "}
          {product.subCategory}{" "}
        </button>{" "}
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />{" "}
        <span className="text-gray-900 font-medium shrink-0 truncate py-1">
          {product.name}
        </span>{" "}
      </nav>{" "}
      {/* Main Product Layout */}{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-20">
        {" "}
        {/* Left: Image Gallery */}{" "}
        <div className="space-y-3 sm:space-y-4">
          {" "}
          <div className="bg-[#f4f5f7] rounded-[1.5rem] sm:rounded-[32px] aspect-square flex items-center justify-center p-4 sm:p-8 relative overflow-hidden group">
            {" "}
            <button className="absolute left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-800 hover:bg-gray-100 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-95">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            </button>{" "}
            <button className="absolute right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-800 hover:bg-gray-100 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-95">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>{" "}
            <img
              loading="lazy"
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 md:group-hover:scale-105"
            />{" "}
          </div>{" "}
          {/* Thumbnails */}{" "}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {" "}
            {[
              product.image,
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
            ].map(
              (img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`bg-[#f4f5f7] rounded-xl sm:rounded-[16px] aspect-square p-1.5 sm:p-2 border-2 transition-all overflow-hidden active:scale-95 ${activeImage === img ? "border-gray-900" : "border-transparent hover:border-gray-300 dark:border-gray-600"}`}
                >
                  {" "}
                  <img
                    loading="lazy"
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />{" "}
                </button>
              ),
            )}{" "}
          </div>{" "}
        </div>{" "}
        {/* Right: Product Details */}{" "}
        <div className="flex flex-col pt-2 sm:pt-4">
          {" "}
          <div className="mb-2">
            {" "}
            <span className="bg-green-100 text-green-700 font-medium text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4 inline-block">
              In Stock
            </span>{" "}
          </div>{" "}
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {product.name}
          </h1>{" "}
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            {" "}
            <div className="flex text-yellow-400">
              {" "}
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />{" "}
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />{" "}
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />{" "}
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />{" "}
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />{" "}
            </div>{" "}
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {product.rating}
            </span>{" "}
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              ({product.reviews} Reviews)
            </span>{" "}
          </div>{" "}
          <div className="flex items-end gap-3 sm:gap-4 mb-4 sm:mb-6">
            {" "}
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>{" "}
            {product.oldPrice && (
              <span className="text-lg sm:text-xl text-gray-400 line-through font-medium mb-0.5 sm:mb-1">
                ₹{product.oldPrice}
              </span>
            )}{" "}
          </div>{" "}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
            {" "}
            {product.description}{" "}
          </p>{" "}
          {/* Color Variants */}{" "}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6 sm:mb-8">
              {" "}
              <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                Color:{" "}
                <span className="font-normal text-gray-500 dark:text-gray-400">
                  Selected
                </span>
              </p>{" "}
              <div className="flex space-x-2 sm:space-x-3">
                {" "}
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white ring-2 transition-all active:scale-90 ${idx === 0 ? "ring-gray-900 scale-110" : "ring-gray-200 hover:ring-gray-400"}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}{" "}
              </div>{" "}
            </div>
          )}{" "}
          {/* Add to Cart Line */}{" "}
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-10 w-full">
            {" "}
            {/* Quantity */}{" "}
            <div className="flex items-center justify-between border-2 border-gray-200 rounded-full w-28 sm:w-36 h-12 sm:h-[54px] px-1 sm:px-2 shrink-0">
              {" "}
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 active:scale-90 transition-all"
              >
                <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>{" "}
              <span className="font-medium text-gray-900 text-sm sm:text-base">
                {quantity}
              </span>{" "}
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 active:scale-90 transition-all"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>{" "}
            </div>{" "}
            <button onClick={() => addToCart(product, quantity)} className="flex-1 bg-[#1c1c1e] hover:bg-black text-white font-medium h-12 sm:h-[54px] rounded-full transition-colors flex items-center justify-center shadow-lg hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black text-sm sm:text-base">
              {" "}
              Add To Cart{" "}
            </button>{" "}
            <button className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 active:scale-90 transition-all focus-visible:outline-none shrink-0">
              {" "}
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />{" "}
            </button>{" "}
          </div>{" "}
          <button onClick={() => { addToCart(product, quantity); navigateTo('cart'); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 sm:h-[54px] rounded-full transition-all flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 sm:mb-8 active:scale-[0.98] text-sm sm:text-base">
            {" "}
            Buy Now{" "}
          </button>{" "}
          {/* Meta Info */}{" "}
          <div className="border-t border-gray-100 pt-5 sm:pt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
            {" "}
            <p className="flex">
              <span className="font-medium text-gray-900 w-16 shrink-0">
                SKU :
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {product.sku}
              </span>
            </p>{" "}
            <p className="flex">
              <span className="font-medium text-gray-900 w-16 shrink-0">
                Tags :
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {product.tags}
              </span>
            </p>{" "}
            <div className="flex items-center">
              {" "}
              <span className="font-medium text-gray-900 w-16 shrink-0">
                Share :
              </span>{" "}
              <div className="flex space-x-4 text-gray-400 relative">
                {" "}
                <button
                  type="button"
                  onClick={handleNativeShare}
                  aria-label="Share on Instagram"
                >
                  {" "}
                  <Instagram className="w-4 h-4 hover:text-pink-600 cursor-pointer active:scale-90 transition-all" />{" "}
                </button>{" "}
                <a
                  href={getWhatsappShareLink()}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  {" "}
                  <WhatsappIcon className="w-4 h-4 hover:text-green-500 cursor-pointer active:scale-90 transition-all" />{" "}
                </a>{" "}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="relative"
                  aria-label="Copy link"
                >
                  {" "}
                  <Share2 className="w-4 h-4 hover:text-gray-900 cursor-pointer active:scale-90 transition-all" />{" "}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                      {" "}
                      Copied!{" "}
                    </span>
                  )}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Product Tabs (Description, Additional Info, Reviews) */}{" "}
      <div className="mb-16 sm:mb-24">
        {" "}
        <div className="flex flex-wrap justify-start sm:justify-center border-b border-gray-200 gap-4 sm:gap-8 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
          {" "}
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 sm:pb-4 text-sm sm:text-lg font-medium transition-colors relative whitespace-nowrap active:scale-[0.98] ${activeTab === "description" ? "text-gray-900 dark:text-gray-50" : "text-gray-400 hover:text-gray-600 dark:text-gray-400"}`}
          >
            {" "}
            Description{" "}
            {activeTab === "description" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 rounded-t-full"></div>
            )}{" "}
          </button>{" "}
          <button
            onClick={() => setActiveTab("additional")}
            className={`pb-3 sm:pb-4 text-sm sm:text-lg font-medium transition-colors relative whitespace-nowrap active:scale-[0.98] ${activeTab === "additional" ? "text-green-700" : "text-gray-400 hover:text-gray-600 dark:text-gray-400"}`}
          >
            {" "}
            Additional Information{" "}
            {activeTab === "additional" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-700 rounded-t-full"></div>
            )}{" "}
          </button>{" "}
          <button
            onClick={() => setActiveTab("review")}
            className={`pb-3 sm:pb-4 text-sm sm:text-lg font-medium transition-colors relative whitespace-nowrap active:scale-[0.98] ${activeTab === "review" ? "text-gray-900 dark:text-gray-50" : "text-gray-400 hover:text-gray-600 dark:text-gray-400"}`}
          >
            {" "}
            Review ({product.reviews}){" "}
            {activeTab === "review" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 rounded-t-full"></div>
            )}{" "}
          </button>{" "}
        </div>{" "}
        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-gray-100 dark:border-gray-800">
          {" "}
          {activeTab === "description" && (
            <div className="prose max-w-none text-gray-600 animate-fade-in">
              {" "}
              <p className="text-sm sm:text-lg leading-relaxed">
                {product.description}
              </p>{" "}
              <p className="mt-3 sm:mt-4 text-sm sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>{" "}
            </div>
          )}{" "}
          {activeTab === "additional" && (
            <div className="animate-fade-in w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700">
              {" "}
              <table className="w-full text-left text-xs sm:text-sm min-w-[400px]">
                {" "}
                <thead className="bg-yellow-400 text-gray-900 font-medium">
                  {" "}
                  <tr>
                    {" "}
                    <th className="px-4 sm:px-6 py-3 sm:py-4 w-1/3">
                      Feature
                    </th>{" "}
                    <th className="px-4 sm:px-6 py-3 sm:py-4">
                      Description
                    </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900">
                  {" "}
                  <tr>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-gray-50">
                      Material
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-400">
                      Premium quality specified base
                    </td>
                  </tr>{" "}
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-gray-50">
                      Available Colors
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-400">
                      Refer to variant selector
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-gray-50">
                      Weight
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-400">
                      Varies per size
                    </td>
                  </tr>{" "}
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-gray-50">
                      Dimensions
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-400">
                      Standard / Custom sizing
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-gray-50">
                      Brand
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-400">
                      Printos Internal
                    </td>
                  </tr>{" "}
                </tbody>{" "}
              </table>{" "}
            </div>
          )}{" "}
          {activeTab === "review" && (
            <div className="animate-fade-in text-center text-gray-500 py-6 sm:py-8">
              {" "}
              <Star className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />{" "}
              <p className="text-sm sm:text-lg font-medium">
                Customer reviews will appear here.
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {/* Related Products */}{" "}
      {relatedProducts.length > 0 && (
        <div className="mb-12 sm:mb-24 pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-800">
          {" "}
          <div className="text-center mb-8 sm:mb-12">
            {" "}
            <span className="text-xs sm:text-sm font-medium tracking-widest text-gray-400 uppercase flex items-center justify-center gap-3 sm:gap-4 before:h-px before:w-6 sm:before:w-8 before:bg-gray-300 after:h-px after:w-6 sm:after:w-8 after:bg-gray-300">
              Related Products
            </span>{" "}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 sm:mt-4">
              Explore <span className="text-green-700">Related Products</span>
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {" "}
            {relatedProducts.map((relProduct) => (
              <button
                key={relProduct.id}
                onClick={() => navigateTo("product", null, relProduct)}
                className="text-left bg-white rounded-3xl p-5 sm:p-6 flex flex-col h-full group transition-all duration-300 md:hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {" "}
                <div className="bg-[#f4f5f7] rounded-2xl aspect-[4/3] mb-5 sm:mb-6 relative overflow-hidden flex items-center justify-center p-6 w-full shrink-0">
                  {" "}
                  <span className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-medium z-10 tracking-wide">
                    10% off
                  </span>{" "}
                  <img
                    loading="lazy"
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-contain mix-blend-multiply md:group-hover:scale-105 transition-transform duration-500"
                  />{" "}
                </div>{" "}
                <div className="flex-1 flex flex-col w-full">
                  {" "}
                  <div className="flex justify-between items-start mb-2">
                    {" "}
                    <p className="text-xs font-medium text-gray-400 uppercase truncate pr-2">
                      {relProduct.badge}
                    </p>{" "}
                  </div>{" "}
                  <h3 className="font-medium font-poppins text-gray-900 text-lg sm:text-xl leading-tight mb-3 line-clamp-1 md:group-hover:text-blue-600 transition-colors">
                    {" "}
                    {relProduct.name}{" "}
                  </h3>{" "}
                  <div className="mt-auto flex flex-col gap-5">
                    {" "}
                    <div className="flex flex-row items-center justify-between">
                      {" "}
                      <div className="flex items-center space-x-1.5">
                        {" "}
                        <Star className="w-5 h-5 fill-orange-400 text-orange-400" />{" "}
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {" "}
                          {relProduct.rating}{" "}
                          <span className="font-medium text-gray-400">
                            ({relProduct.reviews})
                          </span>{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        {relProduct.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{relProduct.oldPrice}
                          </span>
                        )}{" "}
                        <span className="font-bold text-2xl text-gray-900">
                          ₹{relProduct.price}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {" "}
                      <div className="flex items-center justify-center border-2 border-gray-200 text-gray-800 font-medium text-[13px] sm:text-sm py-2.5 rounded-full group-hover:border-gray-800 hover:bg-gray-50 transition-colors px-1 text-center">
                        {" "}
                        Add to Cart{" "}
                      </div>{" "}
                      <div className="flex items-center justify-center bg-[#1c1c1e] text-white font-medium text-[13px] sm:text-sm py-2.5 rounded-full hover:bg-black transition-colors w-full px-1 text-center">
                        {" "}
                        Buy Now{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </button>
            ))}{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
interface FeaturedProductsProps {
  navigateTo: (
    page: string,
    sectionId?: string | null,
    product?: Product | null,
  ) => void;
}
function FeaturedProducts({ navigateTo }: FeaturedProductsProps) {
  const featuredList = MOCK_PRODUCTS.slice(0, 8); // Grab 8 products
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      {" "}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="text-center mb-12 sm:mb-16">
          {" "}
          <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {" "}
            Featured <span className="text-[#2D9ED8]">Products</span>{" "}
          </h2>{" "}
          <div className="flex items-center justify-center gap-2">
            {" "}
            <div className="h-[2px] w-8 bg-[#2D9ED8]/30"></div>{" "}
            <div className="w-1.5 h-1.5 rounded-full bg-[#2D9ED8]"></div>{" "}
            <div className="w-2.5 h-2.5 rounded-full bg-[#2D9ED8]"></div>{" "}
            <div className="w-1.5 h-1.5 rounded-full bg-[#2D9ED8]"></div>{" "}
            <div className="h-[2px] w-8 bg-[#2D9ED8]/30"></div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {" "}
          {featuredList.map((product, idx) => (
            <div
              key={product.id}
              onClick={() => navigateTo("product", null, product)}
              className="group relative flex flex-col justify-end bg-[#f4f5f7] rounded-3xl shadow-sm hover:shadow-xl hover:shadow-[#2D9ED8]/10 transition-all duration-500 cursor-pointer overflow-hidden aspect-[4/5] sm:aspect-[3/4] border border-transparent hover:border-[#2D9ED8]/20"
            >
              {" "}
              <img
                loading="lazy"
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
              />{" "}
              {/* Badges */}{" "}
              {idx === 0 && (
                <span className="absolute top-5 left-5 bg-[#2D9ED8] text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-sm z-20 shadow-[#2D9ED8]/30 tracking-wide uppercase">
                  20% Off
                </span>
              )}{" "}
              {idx === 2 && (
                <span className="absolute top-5 left-5 bg-gray-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-sm z-20 tracking-wide uppercase">
                  Hot
                </span>
              )}{" "}
              {idx === 3 && (
                <span className="absolute top-5 left-5 bg-green-500 text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-sm z-20 tracking-wide uppercase">
                  New
                </span>
              )}{" "}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>{" "}
              <div className="relative z-20 p-5 sm:p-6 text-white translate-y-6 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 flex flex-col h-full justify-end">
                {" "}
                <h4 className="font-medium text-xl sm:text-2xl leading-tight mb-2 drop-shadow-md">
                  {product.name}
                </h4>{" "}
                <p className="text-base sm:text-lg font-medium text-[#2D9ED8] mb-4 drop-shadow-md">
                  ₹{Number(product.price).toFixed(2)}
                </p>{" "}
                <button className="w-full bg-white text-gray-900 text-sm font-medium px-6 py-3 rounded-full hover:bg-[#2D9ED8] hover:text-white transition-colors duration-300 shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  {" "}
                  Quick View <ArrowRight className="w-4 h-4" />{" "}
                </button>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  ); // Sync React state if dark mode is changed externally

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleFontSize = (change: number) => {
    const newSize =
      change === 0 ? 16 : Math.max(12, Math.min(24, fontSize + change));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <div className="fixed left-4 bottom-4 z-50 font-poppins">
      {" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Options"
        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        {" "}
        <Settings2 className="w-6 h-6" />{" "}
      </button>{" "}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white border border-gray-200 p-4 rounded-xl shadow-2xl flex flex-col gap-4 w-52 animate-fade-in-up origin-bottom-left">
          {" "}
          <h4 className="font-medium text-gray-900 text-sm border-b border-gray-100 pb-2 flex justify-between items-center">
            {" "}
            Accessibility{" "}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>{" "}
          </h4>{" "}
          <div className="flex flex-col gap-2">
            {" "}
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Text Size
            </span>{" "}
            <div className="flex gap-2">
              {" "}
              <button
                aria-label="Decrease font size"
                onClick={() => handleFontSize(-2)}
                className="flex-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent focus:border-blue-500 rounded text-sm font-medium text-gray-900 transition-colors"
              >
                A-
              </button>{" "}
              <button
                aria-label="Default font size"
                onClick={() => handleFontSize(0)}
                className="flex-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent focus:border-blue-500 rounded text-sm font-medium text-gray-900 transition-colors"
              >
                A
              </button>{" "}
              <button
                aria-label="Increase font size"
                onClick={() => handleFontSize(2)}
                className="flex-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent focus:border-blue-500 rounded text-sm font-medium text-gray-900 transition-colors"
              >
                A+
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-col gap-2">
            {" "}
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Contrast Theme
            </span>{" "}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent focus:border-blue-500 rounded text-sm font-medium text-gray-900 transition-colors w-full"
            >
              {" "}
              <span className="flex items-center gap-2">
                {" "}
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}{" "}
                {isDark ? "Light Mode" : "Dark Mode"}{" "}
              </span>{" "}
              <div
                className={`w-8 h-4 rounded-full bg-gray-300 relative transition-colors`}
              >
                {" "}
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 ${isDark ? "left-[18px]" : "left-0.5"}`}
                ></div>{" "}
              </div>{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
interface StartupPlanningProps {
  navigateTo: (page: string, sectionId?: string | null, product?: Product | null) => void;
}

function StartupPlanning({ navigateTo }: StartupPlanningProps) {
  const [activeTab, setActiveTab] = useState(STARTUP_SECTIONS[0].id);

  const handleProductClick = (item: any) => {
    const dummyProduct: Product = {
      id: Math.floor(Math.random() * 10000),
      sku: `PRT-STP-${Math.floor(Math.random() * 1000)}`,
      name: item.name,
      category: "startup",
      subCategory: item.name,
      price: "499",
      oldPrice: "599",
      rating: "4.8",
      reviews: "120",
      image: item.image,
      badge: "Startup",
      tags: "Startup, Corporate, Planning",
      colors: [],
      description: `Premium ${item.name} for your business needs. ${item.desc1}. ${item.desc2}.`
    };
    navigateTo("product", null, dummyProduct);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Back Button */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-4 pb-2">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#2D9ED8] transition-colors group"
        >
          <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>
      <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000"
          alt="Startup Planning"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl p-8 sm:p-12 max-w-xl shadow-2xl relative overflow-hidden">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#7e22ce] mb-3 tracking-tight">
              Print Smarter, Grow Faster!
            </h1>
            <p className="text-gray-700 text-base sm:text-lg font-medium mb-8">
              Solutions tailored for every Business stage.
            </p>
            <button
              onClick={() => navigateTo('home', 'contact')}
              className="bg-[#f58634] hover:bg-orange-600 text-white font-medium py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-[56px] sm:top-[64px] md:top-[66px] xl:top-[84px] z-40 bg-white shadow-sm border-b border-gray-100 py-4 px-4 overflow-x-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto flex gap-3 sm:gap-4 md:justify-center">
          {STARTUP_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm border ${activeTab === section.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20">
        {STARTUP_SECTIONS.map((section) => (
          <div key={section.id} id={`section-${section.id}`} className="scroll-mt-[136px] xl:scroll-mt-[154px]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12">
              {section.title}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 bg-white">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleProductClick(item)}
                  className="bg-transparent hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-[#f8fafc] overflow-hidden relative p-0 flex items-center justify-center rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-4 pb-2 px-1 flex-1 flex flex-col">
                    <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-2 leading-tight">{item.name}</h3>
                    <ul className="space-y-1.5 flex-1">
                      <li className="flex items-start text-xs sm:text-sm text-gray-500 font-medium">
                        <span className="text-gray-400 font-bold mr-2">•</span>
                        <span className="leading-snug">{item.desc1}</span>
                      </li>
                      <li className="flex items-start text-xs sm:text-sm text-gray-500 font-medium">
                        <span className="text-gray-400 font-bold mr-2">•</span>
                        <span className="leading-snug">{item.desc2}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const { cartItems, addToCart, updateQuantity: updateCartItemQuantity, clearCart, subtotal, sessionId } = useCartManager();

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.title = "Printos";

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.26 150.6'%3E%3Cpath fill='%232d9ed8' d='M122.26,61.13c0,33.76-27.37,61.13-61.13,61.13-7.42,0-14.54-1.32-21.12-3.75v-57.38c0-11.65,9.47-21.13,21.12-21.13s21.13,9.48,21.13,21.13-9.48,21.13-21.13,21.13c-4.53,0-8.73-1.43-12.17-3.88v22.04c3.85,1.2,7.93,1.84,12.17,1.84,22.68,0,41.13-18.45,41.13-41.13s-18.45-41.13-41.13-41.13S20.01,38.45,20.01,61.13v45.23C7.72,95.18,0,79.06,0,61.13,0,27.37,27.37,0,61.13,0s61.13,27.37,61.13,61.13Z'/%3E%3Cpolygon fill='%232d9ed8' points='20.01 106.36 40.01 118.51 40.01 150.6 20.01 150.6 20.01 106.36'/%3E%3C/svg%3E`;

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (
    page: string,
    sectionId: string | null = null,
    product: Product | null = null,
  ) => {
    setIsMenuOpen(false);

    if (page === "back") {
      if (history.length > 0) {
        setIsTransitioning(true);
        const lastState = history[history.length - 1];
        setHistory((prev) => prev.slice(0, -1));
        setTimeout(() => {
          setCurrentPage(lastState.page);
          if (lastState.product !== undefined) setSelectedProduct(lastState.product);
          if (lastState.category !== undefined) setActiveCategory(lastState.category);
          if (lastState.subCategory !== undefined) setActiveSubCategory(lastState.subCategory);
          if (lastState.searchTerm !== undefined) setSearchTerm(lastState.searchTerm);
          window.scrollTo({ top: lastState.scrollY || 0, behavior: "instant" as ScrollBehavior });
          setIsTransitioning(false);
        }, 300);
      } else {
        setCurrentPage("home");
        setSelectedProduct(null);
        setSearchTerm("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (currentPage !== page || product) {
      setHistory((prev) => [
        ...prev,
        {
          page: currentPage,
          product: selectedProduct,
          category: activeCategory,
          subCategory: activeSubCategory,
          searchTerm: searchTerm,
          scrollY: window.scrollY,
        },
      ]);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        if (product) setSelectedProduct(product);
        if (page === "home" || page === "startup" || page === "login" || page === "cart") {
          setSearchTerm("");
        }
        if (sectionId) {
          setTimeout(() => {
            document
              .getElementById(sectionId)
              ?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        } else {
          window.scrollTo(0, 0);
        }
        setIsTransitioning(false);
      }, 300);
    } else {
      if (sectionId) {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-gray-800 selection:bg-blue-200 selection:text-blue-900 scroll-smooth flex flex-col touch-manipulation">
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollPos={scrollPos}
        currentPage={currentPage}
        navigateTo={navigateTo}
        setActiveCategory={setActiveCategory}
        setActiveSubCategory={setActiveSubCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main
        id="main-content"
        className={`${currentPage === "home" ? "" : "pt-[56px] sm:pt-[64px] md:pt-[66px] xl:pt-[84px]"} bg-white flex-1 transition-opacity duration-300 ease-in-out flex flex-col ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        {currentPage === "home" && (
          <>
            <Hero navigateTo={navigateTo} />
            <HomeServices
              navigateTo={navigateTo}
              setActiveCategory={setActiveCategory}
              setActiveSubCategory={setActiveSubCategory}
            />
          </>
        )}

        {currentPage === "startup" && (
          <StartupPlanning navigateTo={navigateTo} />
        )}

        {currentPage === "catalog" && (
          <ProductCatalog
            addToCart={addToCart}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeSubCategory={activeSubCategory}
            setActiveSubCategory={setActiveSubCategory}
            navigateTo={navigateTo}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {currentPage === "product" && selectedProduct && (
          <ProductDetails
            addToCart={addToCart}
            product={selectedProduct}
            navigateTo={navigateTo}
            setActiveCategory={setActiveCategory}
            setActiveSubCategory={setActiveSubCategory}
          />
        )}

        {currentPage === 'cart' && (
          <CheckoutPage
            cartItems={cartItems}
            subtotal={subtotal}
            sessionId={sessionId}
            clearCart={clearCart}
            updateQuantity={updateCartItemQuantity}
            onHome={() => navigateTo('home')}
          />
        )}
      </main>

      <AccessibilityWidget />
      <GlobalTrustBadges />
      <Contact />
      <Footer navigateTo={navigateTo} />

      <style
        dangerouslySetInnerHTML={{
          __html: ` @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap'); .font-poppins { font-family: 'Poppins', sans-serif !important; } @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; } @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin-slow { animation: slowSpin 25s linear infinite; } @keyframes bounceSlow { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } } .animate-bounce-slow { animation: bounceSlow 3s infinite; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; } @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.5s ease-out forwards; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f3f4f6; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; } ::-webkit-scrollbar-thumb:hover { background: #94a3b8; } `,
        }}
      />
    </div>
  );
}

function GoogleReviews({
  reviews,
}: {
  reviews: Array<{ name: string; text: string }>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (!reviews || reviews.length === 0) return null;
  const review = reviews[currentIndex];

  return (
    <section className="mb-16 max-w-3xl mx-auto text-center px-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 font-poppins">
        What our Customers Say.
      </h2>
      <div className="flex justify-center text-[#7e22ce] mb-6 gap-1">
        <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-current" strokeWidth={0} />
        <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-current" strokeWidth={0} />
        <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-current" strokeWidth={0} />
        <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-current" strokeWidth={0} />
        <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-current" strokeWidth={0} />
      </div>

      <div className="grid items-center justify-center relative w-full overflow-hidden">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className={`col-start-1 row-start-1 w-full flex flex-col items-center transition-all duration-700 ease-in-out ${idx === currentIndex
              ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
              : idx < currentIndex
                ? "opacity-0 -translate-x-12 z-0 pointer-events-none"
                : "opacity-0 translate-x-12 z-0 pointer-events-none"
              }`}
          >
            <p className="text-gray-600 font-medium mb-6 text-sm sm:text-base leading-relaxed px-2 sm:px-8 max-w-2xl">
              {r.text}
            </p>
            <p className="text-gray-500 font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span className="text-[#7e22ce] font-bold opacity-80">-</span>{" "}
              {r.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 sm:mt-10 items-center gap-1.5 cursor-pointer">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to review ${idx + 1}`}
            className={`transition-all duration-300 rounded-full bg-gray-300 ${idx === currentIndex
              ? "w-8 h-[3px] sm:h-1 bg-[#7e22ce]"
              : "w-2 sm:w-2.5 h-[3px] sm:h-1 hover:bg-gray-400"
              }`}
          />
        ))}
      </div>
    </section>
  );
}


