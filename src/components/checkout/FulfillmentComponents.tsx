import React, { useState } from 'react';
import { Truck, Store } from 'lucide-react';

export interface FulfillmentData {
    type: 'delivery' | 'pickup';
    address?: string;
    storeId?: string;
    date?: string;
    slot?: string;
}

interface Props {
    onNext: (data: FulfillmentData) => void;
    onBack: () => void;
}

export function FulfillmentComponents({ onNext, onBack }: Props) {
    const [type, setType] = useState<'delivery' | 'pickup'>('delivery');
    const [address, setAddress] = useState('');
    const [storeId, setStoreId] = useState('');
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');

    const handleNext = () => {
        if (type === 'delivery' && !address) return alert('Please enter delivery address');
        if (type === 'pickup' && (!storeId || !date || !slot)) return alert('Please fill pickup details');

        onNext({
            type,
            ...(type === 'delivery' && { address }),
            ...(type === 'pickup' && { storeId, date, slot }),
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
            <h2 className="text-xl font-bold mb-6">Select Fulfillment Method</h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => setType('delivery')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${type === 'delivery' ? 'border-[#2D9ED8] bg-blue-50 text-[#2D9ED8]' : 'border-gray-100 hover:border-blue-200 text-gray-500'
                        }`}
                >
                    <Truck className="w-8 h-8 mb-3" />
                    <span className="font-bold">Home Delivery</span>
                </button>
                <button
                    onClick={() => setType('pickup')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${type === 'pickup' ? 'border-[#2D9ED8] bg-blue-50 text-[#2D9ED8]' : 'border-gray-100 hover:border-blue-200 text-gray-500'
                        }`}
                >
                    <Store className="w-8 h-8 mb-3" />
                    <span className="font-bold">Store Pickup</span>
                </button>
            </div>

            {type === 'delivery' && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Complete Shipping Address</label>
                        <textarea
                            rows={3}
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="123 Main St&#10;City, State, PIN"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] focus:border-transparent outline-none resize-none"
                        />
                    </div>
                </div>
            )}

            {type === 'pickup' && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Select Store</label>
                        <select
                            value={storeId}
                            onChange={e => setStoreId(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] outline-none"
                        >
                            <option value="">Choose a store location</option>
                            <option value="store_tvm_01">Printos TVM - General Hospital Rd</option>
                            <option value="store_tvm_02">Printos TVM - Kazhakkoottam</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Time Slot</label>
                            <select
                                value={slot}
                                onChange={e => setSlot(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] outline-none"
                            >
                                <option value="">Select a slot</option>
                                <option value="10AM-12PM">10AM - 12PM</option>
                                <option value="12PM-2PM">12AM - 2PM</option>
                                <option value="3PM-5PM">3PM - 5PM</option>
                                <option value="5PM-7PM">5PM - 7PM</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex gap-4 mt-8">
                <button
                    onClick={onBack}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="flex-1 bg-[#2D9ED8] text-white py-3 rounded-xl font-bold hover:bg-blue-600"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
