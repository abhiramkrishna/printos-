import type { APIRoute } from 'astro';
import { readDB } from '../../../lib/api/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { total_price, items, session_id } = await request.json();

        if (!total_price || !items || !session_id) {
            return new Response(JSON.stringify({ error: "Missing required order data" }), { status: 400 });
        }

        let riskScore = 0;
        const rulesTriggered = [];

        // Rule 1: Abnormally high order value (e.g. > $10,000 equivalent)
        if (total_price > 10000) {
            riskScore += 40;
            rulesTriggered.push("High order value");
        } else if (total_price > 5000) {
            riskScore += 20;
            rulesTriggered.push("Moderately high value");
        }

        // Rule 2: Too many items in a single cart for a retail user
        const totalQuantity = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        if (totalQuantity > 50) {
            riskScore += 30;
            rulesTriggered.push("Unusually high item count");
        }

        // Rule 3: Multiple rapid orders check
        const db = await readDB();
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        // Count how many orders this session has placed in the last hour
        const recentSessionOrders = db.orders.filter(
            order => order.user_id === session_id && new Date(order.created_at) > oneHourAgo
        );

        if (recentSessionOrders.length >= 3) {
            riskScore += 50;
            rulesTriggered.push("Multiple rapid orders from same session");
        }

        // Decision
        // If score >= 60, flag for manual review immediately.
        // If score >= 40, require extra verification (like 3DSecure if implementing cards).
        const isFraudulent = riskScore >= 60;

        return new Response(JSON.stringify({
            success: true,
            riskScore,
            isFraudulent,
            rulesTriggered,
            action: isFraudulent ? "FLAG_FOR_REVIEW" : "PROCEED"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};
