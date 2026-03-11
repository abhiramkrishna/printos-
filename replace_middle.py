import sys
import re

with open('src/components/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace HomeServices and Features and BrandStory with the new layout sections
features_pattern = re.compile(r'function HomeServices\(\{ navigateTo, setActiveCategory \}: HomeServicesProps\) \{.*?\};\s*(?=function Contact)', re.DOTALL)

new_sections = """function HomeServices({ navigateTo, setActiveCategory }: HomeServicesProps) {
    // We will render Shop by Business Needs, Popular Categories, New Launches, Best Sellers, Customers Say, Trust Badges, Blog
    
    return (
        <div className="bg-white flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Shop By Business Needs */}
            <section className="mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shop By Business Needs</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop" alt="Startup Planning" className="w-full aspect-video object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Startup Planning</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=300&auto=format&fit=crop" alt="Event and Promotion" className="w-full aspect-video object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Event and Promotion</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=300&auto=format&fit=crop" alt="Cafe and Restaurant Essentials" className="w-full aspect-video object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Cafe and Restaurant Essentials</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=300&auto=format&fit=crop" alt="Employee Gifting" className="w-full aspect-video object-cover bg-gray-100 mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Employee Gifting</span>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Popular Categories</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group bg-gray-100/50 flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=300&auto=format&fit=crop" alt="Stationery" className="w-full aspect-[4/3] object-contain p-4 mix-blend-multiply mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8] pb-3">Stationery</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group bg-gray-100/50 flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop" alt="Photo Gifts" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8] pb-3">Photo Gifts</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group bg-gray-100/50 flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=300&auto=format&fit=crop" alt="Awards and Recognition" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8] pb-3">Awards and Recognition</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group bg-gray-100/50 flex flex-col items-center relative">
                        <span className="absolute top-0 right-0 bg-[#7e22ce] text-white text-[10px] font-bold px-2 py-1 z-10 uppercase tracking-widest">WINTER</span>
                        <img loading="lazy" src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop" alt="Sweatshirts and Hoodies" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8] pb-3">Sweatshirts and Hoodies</span>
                    </div>
                </div>
            </section>

            {/* New Launches */}
            <section className="mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">New Launches</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Banners placeholder - replacing with simple images */}
                    <img loading="lazy" src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" alt="Promo Banner" className="w-full h-24 object-cover cursor-pointer" />
                    <img loading="lazy" src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop" alt="Promo Banner" className="w-full h-24 object-cover cursor-pointer" />
                    <img loading="lazy" src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=400&auto=format&fit=crop" alt="Promo Banner" className="w-full h-24 object-cover cursor-pointer" />
                    <img loading="lazy" src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=400&auto=format&fit=crop" alt="Promo Banner" className="w-full h-24 object-cover cursor-pointer" />
                    <img loading="lazy" src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=400&auto=format&fit=crop" alt="Promo Banner" className="w-full h-24 object-cover cursor-pointer" />
                    <div className="w-full h-24 bg-blue-100 flex flex-col items-center justify-center cursor-pointer">
                        <span className="font-bold text-blue-900 mb-1">Find What's</span>
                        <span className="font-bold text-blue-900 mb-1">New for Your Brand!</span>
                        <span className="px-3 py-1 bg-[#f58634] text-white text-xs font-bold mt-1">Explore Now</span>
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Best Sellers</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop" alt="Apparel" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Apparel</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=300&auto=format&fit=crop" alt="Business Cards" className="w-full aspect-[4/3] object-contain bg-gray-100 mix-blend-multiply p-4 mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Business Cards</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop" alt="Booklets" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Booklets</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=300&auto=format&fit=crop" alt="Photo Frames" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Photo Frames</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop" alt="Stickers" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Stickers</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=300&auto=format&fit=crop" alt="Cards" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Cards</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=300&auto=format&fit=crop" alt="Drinkware" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Drinkware</span>
                    </div>
                    <div onClick={() => navigateTo('catalog')} className="cursor-pointer group flex flex-col items-center">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=300&auto=format&fit=crop" alt="Awards & Trophies" className="w-full aspect-[4/3] object-cover mb-3" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#2D9ED8]">Awards & Trophies</span>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mb-16 max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">What our Customers Say.</h2>
                <div className="flex justify-center text-[#7e22ce] mb-6">
                    <Star className="w-6 h-6 fill-current"/>
                    <Star className="w-6 h-6 fill-current"/>
                    <Star className="w-6 h-6 fill-current"/>
                    <Star className="w-6 h-6 fill-current"/>
                    <Star className="w-6 h-6 fill-current"/>
                </div>
                <p className="text-gray-600 font-medium mb-6">
                    I recently ordered my new visiting cards from Printos, and the quality is outstanding. The print is crisp, the card stock feels premium, and my logo looks fantastic. The process was smooth, and I picked them up from the store which was incredibly convenient.
                </p>
                <p className="text-gray-500 font-medium">- Amit J A</p>
                <div className="flex justify-center mt-4">
                    <div className="w-8 h-1 bg-[#7e22ce] rounded-full"></div>
                    <div className="w-2 h-1 bg-gray-300 rounded-full mx-1"></div>
                    <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </section>

            {/* Features (Trust Badges) */}
            <section className="mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
                        <Clock className="w-8 h-8 text-[#7e22ce] mb-4" />
                        <h4 className="font-bold text-gray-800 text-sm mb-2">Fast Turn<br/>Around</h4>
                        <p className="text-xs text-gray-500">Fast and on-time delivery<br/>of all handbooks</p>
                    </div>
                    <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
                        <ShoppingBag className="w-8 h-8 text-[#7e22ce] mb-4" />
                        <h4 className="font-bold text-gray-800 text-sm mb-2">Everything in print<br/>packaging</h4>
                        <p className="text-xs text-gray-500">Every kind of printing or<br/>packaging requirements, are<br/>made in one place!</p>
                    </div>
                    <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
                        <Image className="w-8 h-8 text-[#7e22ce] mb-4" />
                        <h4 className="font-bold text-gray-800 text-sm mb-2">In-House<br/>Machinery</h4>
                        <p className="text-xs text-gray-500">Quality checking is easy,<br/>all in-house!</p>
                    </div>
                    <div className="bg-gray-50/80 p-6 flex flex-col items-center text-center rounded-xl border border-gray-100">
                        <Package className="w-8 h-8 text-[#7e22ce] mb-4" />
                        <h4 className="font-bold text-gray-800 text-sm mb-2">Wide Product<br/>Range</h4>
                        <p className="text-xs text-gray-500">From caps to hoodies -<br/>we print it all.</p>
                    </div>
                </div>
            </section>

            {/* Trusted By */}
            <section className="mb-16 text-center">
                <h3 className="font-bold text-gray-800 mb-8">Trusted by over 350 Large Enterprises for Printing, Signage and Gifting needs.</h3>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70">
                    <span className="font-extrabold text-[#2D9ED8] text-xl">Paytm</span>
                    <span className="font-extrabold text-gray-800 text-xl">accenture</span>
                    <span className="font-extrabold text-red-600 text-xl">BOSCH</span>
                    <span className="font-extrabold text-blue-600 text-xl">hp</span>
                    <span className="font-extrabold text-red-600 text-xl">HONDA</span>
                    <span className="font-extrabold text-purple-600 text-xl">BYJU'S</span>
                    <span className="font-extrabold text-gray-800 text-xl">amazon</span>
                    <span className="font-extrabold text-orange-500 text-xl">FedEx</span>
                </div>
                <div className="mt-8 flex flex-col items-center gap-3">
                    <span className="font-bold text-sm text-gray-800">Need a Corporate Account?</span>
                    <button className="px-6 py-2 bg-[#f58634] text-white font-bold rounded hover:bg-orange-600 transition-colors">Get In Touch</button>
                </div>
            </section>

            {/* Blog */}
            <section className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-[#7e22ce] mb-4">From the blog.</h2>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            Explore ideas, tips and everything print. From choosing the right finish branding and visual identity, out blog is your go-to guide for all things print. Whether you're building a brand or just printing your favorites, some great sights to help you out.<br/>Read the blog <ArrowRight className="inline w-3 h-3"/>
                        </p>
                    </div>
                    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop" alt="Blog 1" className="w-full h-48 object-cover" />
                        <div className="p-4 bg-white">
                            <h4 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-[#2D9ED8]">Corporate Gifting vs Promotional Gifting: "What makes it a highly effective?"</h4>
                            <p className="text-xs text-gray-500 mb-3">Both are brand builders, let's explore the differences and setting objectives.</p>
                            <span className="text-xs font-bold text-gray-800 uppercase float-right group-hover:text-[#2D9ED8]">READ MORE</span>
                        </div>
                    </div>
                    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                        <img loading="lazy" src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=400&auto=format&fit=crop" alt="Blog 2" className="w-full h-48 object-cover" />
                        <div className="p-4 bg-white">
                            <h4 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-[#2D9ED8]">Whether you run a privilege in print, branding your brand or event explore matching campaigns to fit in right.</h4>
                            <span className="text-xs font-bold text-gray-800 uppercase float-right mt-3 group-hover:text-[#2D9ED8]">READ MORE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Ad Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img loading="lazy" src="https://images.unsplash.com/photo-1551044464-9d10e5ed5d87?q=80&w=600&auto=format&fit=crop" alt="App Banner" className="w-full h-24 object-cover cursor-pointer" />
                <img loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="Stores Banner" className="w-full h-24 object-cover cursor-pointer" />
            </div>

            {/* Printo Description */}
            <div className="mt-16 text-left border-b border-gray-200 pb-8">
                <h3 className="font-bold text-gray-800 mb-4">Printos - For You, Making Your Print Experience Hassle-Free</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Printos is one stop print solution provider. From individual customers seeking personalized gifts to businesses preparing for marketing campaigns, maintaining brand value, expanding your reach. Let us bring your ideas to life and give you nothing but the best!
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                    We expand our footprint with multiple outlets across the city and state. With a wide range of services and dedicated team of professionals to handle any print requirement. Check out our store locations to find a Printos center near you. <span className="text-blue-600 cursor-pointer">Read more</span>
                </p>
            </div>
        </div>
    );
};
"""

text = features_pattern.sub(new_sections, text)

# Add Image to the import list from lucide-react if not present. Wait, it is already mapped as ImageIcon, need to import just Image from lucide react if I'm using Image... wait let's use ImageIcon in the JSX instead of Image
text = text.replace('<Image className="w-8 h-8 text-[#7e22ce] mb-4" />', '<ImageIcon className="w-8 h-8 text-[#7e22ce] mb-4" />')

with open('src/components/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated middle sections using regex")
