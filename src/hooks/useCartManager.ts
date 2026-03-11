import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';

export interface CartItem {
    product_id: string;
    title: string;
    price: string;
    quantity: number;
    image: string;
}

const CART_STORAGE_KEY = 'printos_cart';
const SESSION_STORAGE_KEY = 'printos_session_id';

// Generate a persistable session ID
const getSessionId = () => {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
};

export function useCartManager() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [sessionId] = useState<string>(getSessionId());
    const [lastActivity, setLastActivity] = useState<number>(Date.now());

    // Initialize
    useEffect(() => {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart");
            }
        }
    }, []);

    // Save changes & update activity
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } else {
            localStorage.removeItem(CART_STORAGE_KEY);
        }
        setLastActivity(Date.now());
    }, [cartItems]);

    // Abandoned Cart Tracker (30 minutes)
    useEffect(() => {
        if (cartItems.length === 0) return;

        const interval = setInterval(async () => {
            const idleTime = Date.now() - lastActivity;
            if (idleTime > 30 * 60 * 1000) {
                try {
                    // Fire and forget abandonment logging
                    await fetch('/api/cart/abandoned', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ session_id: sessionId, items: cartItems })
                    });
                    // Avoid spamming the endpoint once logged
                    setLastActivity(Date.now());
                } catch (e) {
                    console.error(e);
                }
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [cartItems, lastActivity, sessionId]);

    const addToCart = async (product: Product, quantity: number = 1) => {
        try {
            // 1. Attempt to reserve inventory first
            const res = await fetch('/api/cart/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: product.id.toString(),
                    quantity,
                    session_id: sessionId
                })
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Failed to reserve inventory");
                return;
            }

            // 2. Add to local state
            setCartItems(prev => {
                const existing = prev.find(item => item.product_id === product.id.toString());
                if (existing) {
                    return prev.map(item =>
                        item.product_id === product.id.toString()
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                return [...prev, {
                    product_id: product.id.toString(),
                    title: product.name,
                    price: product.price,
                    quantity,
                    image: product.image
                }];
            });
        } catch (e) {
            alert("Network error reserving inventory");
        }
    };

    const updateQuantity = (product_id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            setCartItems(prev => prev.filter(item => item.product_id !== product_id));
        } else {
            setCartItems(prev => prev.map(item =>
                item.product_id === product_id
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    return {
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        subtotal,
        sessionId
    };
}
