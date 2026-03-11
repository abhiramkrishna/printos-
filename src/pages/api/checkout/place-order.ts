import type { APIRoute } from 'astro';
import { readDB, writeDB, type Order } from '../../../lib/api/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const {
            session_id,
            user_id,
            items,
            total_price,
            payment_method,
            fulfillment_type,
            pickup_store_id,
            pickup_date,
            pickup_slot,
            shipping_address
        } = data;

        if (!session_id || !items || !items.length || !total_price || !payment_method || !fulfillment_type) {
            return new Response(JSON.stringify({ error: "Missing required order fields" }), { status: 400 });
        }

        const db = await readDB();

        // 1. Finalize stock deduction & remove reservations
        // (Assuming reservations were made; for items without reservation, we deduct directly to simplify)
        for (const orderItem of items) {
            // Find and remove matching reservation
            const resIndex = db.reservations.findIndex(
                r => r.session_id === session_id && r.product_id === orderItem.product_id
            );

            if (resIndex !== -1) {
                db.reservations.splice(resIndex, 1);
            } else {
                // Fallback: If no reservation was found (maybe it expired right as they clicked checkout), 
                // try to deduct directly
                if ((db.inventory[orderItem.product_id] || 0) < orderItem.quantity) {
                    return new Response(JSON.stringify({
                        error: `Insufficient stock for product ${orderItem.product_id}`
                    }), { status: 409 });
                }
                db.inventory[orderItem.product_id] -= orderItem.quantity;
            }
        }

        // 2. Generate Order ID
        const order_id = `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        const newOrder: Order = {
            order_id,
            user_id: user_id || session_id,
            items,
            total_price,
            payment_method,
            fulfillment_type,
            ...(fulfillment_type === 'pickup' && { pickup_store_id, pickup_date, pickup_slot }),
            ...(fulfillment_type === 'delivery' && { shipping_address }),
            order_status: payment_method === 'Cash on Delivery' ? 'PENDING' : 'CONFIRMED',
            created_at: new Date().toISOString()
        };

        // 3. Save Order
        db.orders.push(newOrder);

        // 4. Cleanup abandoned cart history if this session converted
        const abandonedIndex = db.abandoned_carts.findIndex(ac => ac.session_id === session_id);
        if (abandonedIndex !== -1) {
            db.abandoned_carts.splice(abandonedIndex, 1);
        }

        await writeDB(db);

        return new Response(JSON.stringify({
            success: true,
            order_id,
            message: "Order placed successfully"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Place order failed", error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};
