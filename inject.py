import sys

path = 'c:/Users/abhir/Downloads/Printos Website/dangerous-doppler/src/components/App.tsx'
with open(path, 'r', encoding='utf-8') as f:
    t = f.read()

# 1. Update NavbarProps
t = t.replace('interface NavbarProps {', 'interface NavbarProps {\\n  cartCount: number;')

# 2. Update Navbar render for cart badge tracking
t = t.replace('Navbar({\\n  isMenuOpen,', 'Navbar({\\n  cartCount,\\n  isMenuOpen,')
t = t.replace('<span className="absolute -top-1.5 -right-1 sm:-right-2 bg-[#2D9ED8] text-white text-[10px] font-bold w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full flex items-center justify-center border-2 border-white">\\n                0\\n              </span>', '<span className="absolute -top-1.5 -right-1 sm:-right-2 bg-[#2D9ED8] text-white text-[10px] font-bold w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full flex items-center justify-center border-2 border-white">\\n                {cartCount}\\n              </span>')
t = t.replace('<span className="absolute -top-1.5 -right-1 sm:-right-2 bg-[#2D9ED8] text-white text-[10px] font-bold w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full flex items-center justify-center border-2 border-white">\\r\\n                0\\r\\n              </span>', '<span className="absolute -top-1.5 -right-1 sm:-right-2 bg-[#2D9ED8] text-white text-[10px] font-bold w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full flex items-center justify-center border-2 border-white">\\n                {cartCount}\\n              </span>')
t = t.replace('>0</span>', '>{cartCount}</span>')

# 3. Add cart state to App
state_injection = """
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };
  const updateCartItemQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));
    }
  };
"""
t = t.replace('const [history, setHistory] = useState<any[]>([]);', 'const [history, setHistory] = useState<any[]>([]);' + state_injection)

# 4. Pass cartCount to Navbar
t = t.replace('<Navbar\\n        isMenuOpen={isMenuOpen}', '<Navbar\\n        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}\\n        isMenuOpen={isMenuOpen}')
t = t.replace('<Navbar\\r\\n        isMenuOpen={isMenuOpen}', '<Navbar\\n        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}\\n        isMenuOpen={isMenuOpen}')

# 5. Add Cart and Login components rendering in Main
main_injection = """
        {currentPage === 'cart' && (
          <CartPage cartItems={cartItems} updateQuantity={updateCartItemQuantity} navigateTo={navigateTo} />
        )}
        {currentPage === 'login' && (
          <OnboardingPage navigateTo={navigateTo} />
        )}
"""
t = t.replace('</main>', main_injection + '</main>')

# 6. Pass addToCart to ProductCatalog and ProductDetails
t = t.replace('interface ProductCatalogProps {', 'interface ProductCatalogProps {\\n  addToCart: (p: Product) => void;')
t = t.replace('ProductCatalog({\\n  activeCategory,', 'ProductCatalog({\\n  addToCart,\\n  activeCategory,')
t = t.replace('ProductCatalog({\\r\\n  activeCategory,', 'ProductCatalog({\\n  addToCart,\\n  activeCategory,')
t = t.replace('<ProductCatalog\\n            activeCategory', '<ProductCatalog\\n            addToCart={addToCart}\\n            activeCategory')
t = t.replace('<ProductCatalog\\r\\n            activeCategory', '<ProductCatalog\\n            addToCart={addToCart}\\n            activeCategory')

# For ProductDetails
t = t.replace('interface ProductDetailsProps {', 'interface ProductDetailsProps {\\n  addToCart: (p: Product, qty: number) => void;')
t = t.replace('ProductDetails({\\n  product,', 'ProductDetails({\\n  addToCart,\\n  product,')
t = t.replace('ProductDetails({\\r\\n  product,', 'ProductDetails({\\n  addToCart,\\n  product,')
t = t.replace('<ProductDetails\\n            product', '<ProductDetails\\n            addToCart={addToCart}\\n            product')
t = t.replace('<ProductDetails\\r\\n            product', '<ProductDetails\\n            addToCart={addToCart}\\n            product')

# Add to Cart onClick bindings
# In ProductCatalog
t = t.replace('<button className=\"bg-[#1c1c1e] hover:bg-black text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors active:scale-95\">', '<button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className=\"bg-[#1c1c1e] hover:bg-black text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors active:scale-95\">')

# In ProductDetails
t = t.replace('<button className=\"flex-1 bg-[#1c1c1e] hover:bg-black text-white font-medium h-12 sm:h-[54px] rounded-full transition-colors flex items-center justify-center shadow-lg hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black text-sm sm:text-base\">\\n              {" "}\\n              Add To Cart{" "}\\n            </button>', '<button onClick={() => addToCart(product, quantity)} className=\"flex-1 bg-[#1c1c1e] hover:bg-black text-white font-medium h-12 sm:h-[54px] rounded-full transition-colors flex items-center justify-center shadow-lg hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black text-sm sm:text-base\">\\n              {" "}\\n              Add To Cart{" "}\\n            </button>')

# 7. Add components at end of file
new_components = """

function CartPage({ cartItems, updateQuantity, navigateTo }: any) {
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (parseFloat(item.product.price) * item.quantity), 0);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 md:py-24 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigateTo('back')} className="text-gray-500 hover:text-gray-900"><ChevronRight className="w-5 h-5 rotate-180"/></button>
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigateTo('catalog')} className="bg-[#2D9ED8] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">Start Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <img src={item.product.image} className="w-24 h-24 object-cover rounded-xl bg-gray-50" alt={item.product.name} />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">₹{item.product.price}</p>
                  <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-full px-2 py-1">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600"><Minus className="w-3 h-3"/></button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600"><Plus className="w-3 h-3"/></button>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="font-bold text-gray-900 text-lg">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                  <button onClick={() => updateQuantity(item.product.id, 0)} className="text-xs text-red-500 font-medium hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl h-fit border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-600"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between mb-4 text-gray-600"><span>Shipping</span><span>Free</span></div>
            <div className="border-t border-gray-200 pt-4 flex justify-between mb-6">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-[#2D9ED8] text-xl">₹{subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#1c1c1e] text-white py-4 rounded-full font-bold hover:bg-black transition-transform active:scale-95 shadow-lg">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

function OnboardingPage({ navigateTo }: any) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = (e: any) => {
    e.preventDefault();
    if (step === 1 && mobile.length >= 10) setStep(2);
    else if (step === 2 && email.includes('@')) {
      alert('Logged in successfully!');
      navigateTo('home');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-[32px] shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-[#2D9ED8] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{step === 1 ? 'Welcome to Printos' : 'Almost there'}</h2>
          <p className="text-gray-500 text-sm">{step === 1 ? 'Enter your mobile number to get started' : 'We need your email for order updates'}</p>
        </div>
        <form onSubmit={handleNext} className="space-y-6">
          {step === 1 ? (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                <input type="tel" required value={mobile} onChange={e => setMobile(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 pl-12 py-4 focus:ring-2 focus:ring-[#2D9ED8] focus:border-transparent outline-none transition-all" placeholder="98765 43210" />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 pl-12 py-4 focus:ring-2 focus:ring-[#2D9ED8] focus:border-transparent outline-none transition-all" placeholder="you@example.com" />
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-[#2D9ED8] text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25">
            {step === 1 ? 'Continue' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}
"""

if "CartPage" not in t:
    t += new_components

with open(path, 'w', encoding='utf-8') as f:
    f.write(t)
print("Inject success")
