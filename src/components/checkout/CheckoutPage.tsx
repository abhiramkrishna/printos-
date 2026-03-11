import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { OTPVerification } from './OTPVerification';
import { FulfillmentComponents, type FulfillmentData } from './FulfillmentComponents';
import { PaymentMethod } from './PaymentMethod';
import { OrderReview } from './OrderReview';
import { OrderConfirmation } from './OrderConfirmation';
import type { CartItem } from '../../hooks/useCartManager';

type CheckoutStep = 'AUTH' | 'FULFILLMENT' | 'PAYMENT' | 'REVIEW' | 'CONFIRMATION';

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    sessionId: string;
    onHome: () => void;
    clearCart: () => void;
    updateQuantity: (id: string, qty: number) => void;
}

export function CheckoutPage({ cartItems, subtotal, sessionId, onHome, clearCart, updateQuantity }: Props) {
    const [step, setStep] = useState<CheckoutStep>('AUTH');

    // State from steps
    const [userId, setUserId] = useState<string | null>(null);
    const [fulfillment, setFulfillment] = useState<FulfillmentData | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [orderId, setOrderId] = useState<string>('');

    if (cartItems.length === 0 && step !== 'CONFIRMATION') {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <button onClick={onHome} className="bg-[#2D9ED8] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
                    Return to Shop
                </button>
            </div>
        );
    }

    const handleOrderSuccess = (id: string) => {
        setOrderId(id);
        setStep('CONFIRMATION');
        clearCart(); // Wipe the local storage cart
    };

    const steps = [
        { id: 'AUTH', label: 'Login' },
        { id: 'FULFILLMENT', label: 'Shipping' },
        { id: 'PAYMENT', label: 'Payment' },
        { id: 'REVIEW', label: 'Review' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">

                {step !== 'CONFIRMATION' && (
                    <>
                        <button onClick={onHome} className="flex items-center text-gray-500 hover:text-gray-900 mb-8 font-medium transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-1" />
                            Back to Cart
                        </button>

                        {/* Stepper */}
                        <div className="flex justify-between items-center mb-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>

                            {steps.map((s, idx) => {
                                const isActive = step === s.id;
                                const isPast = steps.findIndex(x => x.id === step) > idx;

                                return (
                                    <div key={s.id} className="flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${isActive || isPast ? 'bg-[#2D9ED8] text-white border-[#2D9ED8]' : 'bg-white text-gray-400 border-gray-200'
                                            }`}>
                                            {idx + 1}
                                        </div>
                                        <span className={`text-xs sm:text-sm font-bold ${isActive || isPast ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Step Content */}
                {step === 'AUTH' && (
                    <OTPVerification
                        onSuccess={(uid) => { setUserId(uid); setStep('FULFILLMENT'); }}
                        onSkip={() => setStep('FULFILLMENT')}
                    />
                )}

                {step === 'FULFILLMENT' && (
                    <FulfillmentComponents
                        onNext={(data) => { setFulfillment(data); setStep('PAYMENT'); }}
                        onBack={() => setStep('AUTH')}
                    />
                )}

                {step === 'PAYMENT' && (
                    <PaymentMethod
                        selected={paymentMethod}
                        onSelect={setPaymentMethod}
                        onNext={() => setStep('REVIEW')}
                        onBack={() => setStep('FULFILLMENT')}
                    />
                )}

                {step === 'REVIEW' && fulfillment && (
                    <OrderReview
                        cartItems={cartItems}
                        subtotal={subtotal}
                        paymentMethod={paymentMethod}
                        fulfillment={fulfillment}
                        sessionId={sessionId}
                        userId={userId}
                        onSuccess={handleOrderSuccess}
                        onBack={() => setStep('PAYMENT')}
                        updateQuantity={updateQuantity}
                    />
                )}

                {step === 'CONFIRMATION' && (
                    <OrderConfirmation
                        orderId={orderId}
                        onHome={onHome}
                    />
                )}

            </div>
        </div>
    );
}
