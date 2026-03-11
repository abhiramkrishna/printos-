import sys
import re

with open('src/components/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace Hero
hero_pattern = re.compile(r'function Hero\(\{ navigateTo \}: HeroProps\) \{.*?\};\s*(?=interface HomeServicesProps)', re.DOTALL)

new_hero = """function Hero({ navigateTo }: HeroProps) {
    const [current, setCurrent] = useState(0); 
    useEffect(() => { const timer = setInterval(() => { setCurrent((prev) => (prev + 1) % HERO_SLIDES.length); }, 5000); return () => clearInterval(timer); }, []);
    const [showSale, setShowSale] = useState(true);
    return (
        <section id="home" className="w-full relative bg-gray-50 flex flex-col pt-[80px] lg:pt-[116px]">
            <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden">
                {HERO_SLIDES.map((slide, index) => (
                    <img loading="lazy" key={index} src={slide} alt={`Slide ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} />
                ))}
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="absolute inset-0 z-20 max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center">
                    <div className="max-w-xl text-white">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">India Jersey. Adidas Style.</h1>
                        <p className="text-lg sm:text-xl font-medium mb-8 text-gray-200">Personalized Jerseys for Every Match Day</p>
                        <button onClick={() => navigateTo('catalog')} className="px-8 py-3 bg-[#f58634] text-white font-bold rounded-lg hover:bg-orange-600 transition-all text-lg shadow-lg">Order Now</button>
                    </div>
                </div>
                {showSale && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-12 lg:right-24 z-30 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl rounded-sm border border-gray-100 w-[300px] sm:w-[350px]">
                        <button onClick={() => setShowSale(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"><X className="w-5 h-5"/></button>
                        <p className="text-center font-bold text-xs text-gray-800 tracking-widest uppercase mb-1">UPGRADE YOUR BRAND</p>
                        <p className="text-center font-black text-xl text-[#f58634] mb-2 uppercase">45% OFF</p>
                        <h3 className="text-center font-extrabold text-[#7e22ce] text-xl sm:text-2xl mb-6 uppercase">END OF SEASON<br/>SALE</h3>
                        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                            <div className="bg-[#1f2937] text-white p-2 flex flex-col items-center justify-center min-h-[60px]"><span className="font-bold text-lg">21</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Days</span></div>
                            <div className="bg-[#1f2937] text-white p-2 flex flex-col items-center justify-center min-h-[60px]"><span className="font-bold text-lg">09</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Hours</span></div>
                            <div className="bg-[#1f2937] text-white p-2 flex flex-col items-center justify-center min-h-[60px]"><span className="font-bold text-lg">21</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Min</span></div>
                            <div className="bg-[#1f2937] text-white p-2 flex flex-col items-center justify-center min-h-[60px]"><span className="font-bold text-lg">49</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Sec</span></div>
                        </div>
                        <button onClick={() => navigateTo('catalog')} className="w-full py-3 bg-[#f59e0b] text-white font-extrabold rounded hover:bg-yellow-500 transition-colors uppercase tracking-wider">SHOP DISCOUNT</button>
                    </div>
                )}
                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                    {HERO_SLIDES.map((_, index) => (
                        <button key={index} onClick={() => setCurrent(index)} aria-label={`Go to slide ${index + 1}`} className={`h-2.5 rounded-full transition-all duration-300 ${index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80 w-2.5'}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};
"""

text = hero_pattern.sub(new_hero, text)

with open('src/components/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Hero component")
