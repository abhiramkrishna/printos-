import React from 'react';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

interface Props {
    selected: string;
    onSelect: (method: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function PaymentMethod({ selected, onSelect, onNext, onBack }: Props) {
    const methods = [
        { id: 'UPI', title: 'UPI (GPay, PhonePe, Paytm)', icon: <Smartphone className="w-6 h-6" /> },
        { id: 'Card', title: 'Credit / Debit Card', icon: <CreditCard className="w-6 h-6" /> },
        { id: 'Cash on Delivery', title: 'Cash on Delivery', icon: <Banknote className="w-6 h-6" /> },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>

            <div className="space-y-3 mb-8">
                {methods.map((method) => (
                    <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selected === method.id ? 'border-[#2D9ED8] bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                            }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={selected === method.id}
                            onChange={() => onSelect(method.id)}
                            className="w-5 h-5 text-[#2D9ED8] focus:ring-[#2D9ED8]"
                        />
                        <div className={`p-2 rounded-full ${selected === method.id ? 'bg-[#2D9ED8] text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {method.icon}
                        </div>
                        <span className="font-semibold text-gray-800">{method.title}</span>
                    </label>
                ))}
            </div>

            <div className="flex gap-4 mt-8">
                <button
                    onClick={onBack}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!selected}
                    className="flex-1 bg-[#2D9ED8] text-white py-3 rounded-xl font-bold hover:bg-blue-600 disabled:opacity-50"
                >
                    Review Order
                </button>
            </div>
        </div>
    );
}
