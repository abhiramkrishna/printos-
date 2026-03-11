import React, { useState } from 'react';
import { AlertTriangle, Loader2, Minus, Plus } from 'lucide-react';
import type { FulfillmentData } from './FulfillmentComponents';
import type { CartItem } from '../../hooks/useCartManager';

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    paymentMethod: string;
    fulfillment: FulfillmentData;
    sessionId: string;
    userId: string | null;
    onSuccess: (orderId: string) => void;
    onBack: () => void;
    updateQuantity: (id: string, qty: number) => void;
}

export function OrderReview({ cartItems, subtotal, paymentMethod, fulfillment, sessionId, userId, onSuccess, onBack, updateQuantity }: Props) {
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState('');
    const [fraudWarning, setFraudWarning] = useState('');

    const shippingCost = fulfillment.type === 'delivery' ? 50 : 0;
    const total = subtotal + shippingCost;

    const handlePlaceOrder = async () => {
        setPlacing(true);
        setError('');
        setFraudWarning('');

        try {
            // 1. Validate Fraud
            const fraudRes = await fetch('/api/checkout/validate-fraud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    total_price: total,
                    items: cartItems,
                    session_id: sessionId
                })
            });

            if (!fraudRes.ok) {
                const fraudData = await fraudRes.json();
                setFraudWarning(`Order flagged for review. Reasons: ${fraudData.error}`);
                setPlacing(false);
                return; // Halt placement
            }

            // 2. Place Order
            const orderRes = await fetch('/api/checkout/place-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    user_id: userId,
                    items: cartItems,
                    total_price: total,
                    payment_method: paymentMethod,
                    fulfillment_type: fulfillment.type,
                    pickup_store_id: fulfillment.storeId,
                    pickup_date: fulfillment.date,
                    pickup_slot: fulfillment.slot,
                    shipping_address: fulfillment.address
                })
            });

            if (!orderRes.ok) {
                const errorData = await orderRes.json();
                throw new Error(errorData.error || "Failed to place order");
            }

            const orderData = await orderRes.json();

            // Success!
            onSuccess(orderData.order_id);

        } catch (err: any) {
            setError(err.message || 'Failed to place order');
            setPlacing(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
            <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

            {fraudWarning && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-200">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{fraudWarning}</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>
            )}

            <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                    <div key={item.product_id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-3 pb-3 border-b border-gray-50 last:border-0">
                        <div className="flex gap-3 items-center">
                            <img src={item.image} className="w-12 h-12 object-cover rounded-lg bg-gray-50 shrink-0" alt={item.title} />
                            <div className="flex flex-col">
                                <span className="text-gray-800 font-medium line-clamp-1 truncate w-48 sm:w-64">{item.title}</span>
                                <span className="text-gray-500 font-medium text-xs mt-1">₹{item.price} each</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            <div className="flex items-center gap-3 bg-gray-100/80 rounded-full px-2 py-1">
                                <button
                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-blue-500 transition-colors"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                            <span className="text-gray-900 font-bold min-w-[70px] text-right">₹{(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 py-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping ({fulfillment.type})</span>
                    <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Payment</span>
                    <span>{paymentMethod}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-8">
                <span className="text-lg font-extrabold text-gray-900">Total</span>
                <span className="text-2xl font-black text-[#2D9ED8]">₹{total.toFixed(2)}</span>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    disabled={placing}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    onClick={handlePlaceOrder}
                    disabled={placing || !!fraudWarning}
                    className="flex-[2] bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 disabled:opacity-50 flex justify-center items-center shadow-lg shadow-green-500/25"
                >
                    {placing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : 'Place Order'}
                </button>
            </div>
        </div>
    );
}
