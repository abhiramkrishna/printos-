import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
    orderId: string;
    onHome: () => void;
}

export function OrderConfirmation({ orderId, onHome }: Props) {
    return (
        <div className="bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-xl text-center animate-fade-in max-w-xl mx-auto mt-12 md:mt-24">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounceSlow_3s_ease-in-out_infinite]">
                <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Order Confirmed!</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Thank you for shopping with Printos. Your order has been placed successfully and is now being processed.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Order ID</p>
                <p className="text-2xl font-mono font-bold text-[#2D9ED8] tracking-widest bg-white py-3 rounded-xl border border-blue-50">
                    {orderId}
                </p>
            </div>

            <button
                onClick={onHome}
                className="w-full bg-[#1c1c1e] text-white py-4 rounded-full font-bold hover:bg-black transition-transform active:scale-95 flex justify-center items-center group shadow-lg shadow-black/10"
            >
                Continue Shopping
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
