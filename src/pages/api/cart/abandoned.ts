import type { APIRoute } from 'astro';
import { readDB, writeDB } from '../../../lib/api/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { session_id, items } = await request.json();

        if (!session_id || !items || items.length === 0) {
            return new Response(JSON.stringify({ error: "Missing session or empty cart" }), { status: 400 });
        }

        const db = await readDB();

        // Check if an abandoned cart entry already exists for this session
        const existingIndex = db.abandoned_carts.findIndex(ac => ac.session_id === session_id);

        if (existingIndex !== -1) {
            db.abandoned_carts[existingIndex] = {
                session_id,
                items,
                abandoned_at: new Date().toISOString()
            };
        } else {
            db.abandoned_carts.push({
                session_id,
                items,
                abandoned_at: new Date().toISOString()
            });
        }

        await writeDB(db);

        console.log(`[ABANDONED CART LOGGED] Session: ${session_id} with ${items.length} items`);

        return new Response(JSON.stringify({ success: true, message: "Cart abandonment logged" }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};
