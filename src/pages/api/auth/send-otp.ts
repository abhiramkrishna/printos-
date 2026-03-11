import type { APIRoute } from 'astro';

// In a real app, you would use Redis or a DB to store the OTP with an expiry,
// and a service like Twilio or AWS SNS to send the SMS.
const mockOtpStore: Record<string, { otp: string, expiresAt: number }> = {};

export const POST: APIRoute = async ({ request }) => {
    try {
        const { mobile } = await request.json();

        if (!mobile || mobile.length < 10) {
            return new Response(JSON.stringify({ error: "Invalid mobile number" }), { status: 400 });
        }

        // Generate a 6 digit mock OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store it temporarily with a 5-minute expiry
        mockOtpStore[mobile] = {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };

        // Log it to the server console so developers can "receive" the SMS
        console.log(`\n\n[MOCK SMS] -> To: ${mobile} | Your Printos verification code is: ${otp}\n\n`);

        return new Response(JSON.stringify({ success: true, message: "OTP sent successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};

export const getMockOtpStore = () => mockOtpStore;
