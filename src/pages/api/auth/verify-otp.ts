import type { APIRoute } from 'astro';
import { getMockOtpStore } from './send-otp';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { mobile, otp } = await request.json();

        if (!mobile || !otp) {
            return new Response(JSON.stringify({ error: "Missing mobile or OTP" }), { status: 400 });
        }

        const mockOtpStore = getMockOtpStore();
        const stored = mockOtpStore[mobile];

        if (!stored) {
            return new Response(JSON.stringify({ error: "No OTP requested for this number" }), { status: 404 });
        }

        if (Date.now() > stored.expiresAt) {
            delete mockOtpStore[mobile];
            return new Response(JSON.stringify({ error: "OTP has expired" }), { status: 410 });
        }

        if (stored.otp !== otp) {
            return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 401 });
        }

        // Success - delete OTP to prevent reuse
        delete mockOtpStore[mobile];

        // In a real app we would generate a JWT token here
        const mockSessionToken = `session_${Date.now()}_${mobile}`;

        return new Response(JSON.stringify({
            success: true,
            token: mockSessionToken,
            user_id: `usr_${mobile}`
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};
