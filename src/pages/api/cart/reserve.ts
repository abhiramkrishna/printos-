import type { APIRoute } from 'astro';
import { readDB, writeDB, cleanupExpiredReservations } from '../../../lib/api/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { product_id, quantity, session_id } = await request.json();

        if (!product_id || !quantity || !session_id) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        await cleanupExpiredReservations();
        const db = await readDB();

        const currentInventory = db.inventory[product_id] || 0;
        if (currentInventory < quantity) {
            return new Response(JSON.stringify({ error: "Insufficient stock" }), { status: 409 });
        }

        // Deduct stock temporarily
        db.inventory[product_id] -= quantity;

        // Create reservation (expires in 15 mins)
        const reserved_until = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        const reservation_id = `res_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        const newReservation = {
            reservation_id,
            product_id,
            quantity,
            session_id,
            reserved_until
        };

        db.reservations.push(newReservation);
        await writeDB(db);

        return new Response(JSON.stringify({ success: true, reservation: newReservation }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};
