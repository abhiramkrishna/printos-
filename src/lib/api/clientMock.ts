// A complete in-browser Mock backend system imitating the Astro backend
// This allows the full checkout system to run flawlessly inside the Vite Single Page Application output.

const DB_KEY = 'printos_dummy_db';

interface Reservation {
    reservation_id: string;
    product_id: string;
    quantity: number;
    session_id: string;
    reserved_until: string;
}

interface Database {
    inventory: Record<string, number>;
    reservations: Reservation[];
    orders: any[];
    abandoned_carts: any[];
}

const DEFAULT_DB: Database = {
    inventory: {
        "1": 48,
        "2": 25,
        "3": 100,
        "4": 15,
        "5": 0,
        "6": 30,
        "7": 20,
        "8": 40,
        "9": 10,
        "10": 5,
        "11": 60,
        "12": 100
    },
    reservations: [],
    orders: [],
    abandoned_carts: []
};

// --- MOCK DB LAYER ---
const readDB = (): Database => {
    try {
        const stored = localStorage.getItem(DB_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) { }
    return { ...DEFAULT_DB };
};

const writeDB = (db: Database) => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const cleanupExpiredReservations = () => {
    const db = readDB();
    const now = new Date();
    const validReservations = [];
    let updated = false;

    for (const res of db.reservations) {
        if (new Date(res.reserved_until) < now) {
            // Expired: restore inventory
            if (db.inventory[res.product_id] !== undefined) {
                db.inventory[res.product_id] += res.quantity;
            }
            updated = true;
        } else {
            validReservations.push(res);
        }
    }

    if (updated) {
        db.reservations = validReservations;
        writeDB(db);
    }
};

// --- MOCK API CONTROLLERS ---

export const mockReserveInventory = async (payload: { product_id: string, quantity: number, session_id: string }) => {
    return new Promise<{ ok: boolean, data?: any, error?: string }>((resolve) => setTimeout(() => {
        cleanupExpiredReservations();
        const db = readDB();

        const { product_id, quantity, session_id } = payload;
        const stock = db.inventory[product_id] || 0;

        if (stock < quantity) {
            return resolve({ ok: false, error: "Insufficient stock" });
        }

        db.inventory[product_id] -= quantity;

        const reserved_until = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        const reservation_id = `res_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const newReservation = { reservation_id, product_id, quantity, session_id, reserved_until };

        db.reservations.push(newReservation);
        writeDB(db);

        resolve({ ok: true, data: { success: true, reservation: newReservation } });
    }, 400));
};

export const mockLogAbandonedCart = async (payload: { session_id: string, items: any[] }) => {
    return new Promise<{ ok: boolean }>((resolve) => setTimeout(() => {
        const db = readDB();
        db.abandoned_carts.push({
            session_id: payload.session_id,
            items: payload.items,
            abandoned_at: new Date().toISOString()
        });
        writeDB(db);
        resolve({ ok: true });
    }, 100));
};

// Simple OTP cache in browser memory
const mockOtpStore: Record<string, { otp: string, expires_at: number }> = {};

export const mockSendOTP = async (payload: { mobile: string }) => {
    return new Promise<{ ok: boolean, data?: any, error?: string }>((resolve) => setTimeout(() => {
        if (!payload.mobile || payload.mobile.length < 10) {
            return resolve({ ok: false, error: "Invalid mobile number" });
        }

        const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
        // Console log only to let user know what the OTP is for testing
        console.log(`[Twilio Mock SMS] Sent OTP ${fakeOtp} to ${payload.mobile}`);

        mockOtpStore[payload.mobile] = {
            otp: fakeOtp,
            expires_at: Date.now() + 5 * 60 * 1000
        };

        resolve({ ok: true, data: { success: true, message: "OTP Sent (check console)" } });
    }, 600));
};

export const mockVerifyOTP = async (payload: { mobile: string, otp: string }) => {
    return new Promise<{ ok: boolean, data?: any, error?: string }>((resolve) => setTimeout(() => {
        const record = mockOtpStore[payload.mobile];
        if (!record) return resolve({ ok: false, error: "No OTP requested" });
        if (Date.now() > record.expires_at) return resolve({ ok: false, error: "OTP expired" });
        if (record.otp !== payload.otp) return resolve({ ok: false, error: "Invalid OTP" });

        // Mark verified
        delete mockOtpStore[payload.mobile];

        resolve({ ok: true, data: { success: true, user_id: `usr_${payload.mobile}` } });
    }, 500));
};

export const mockValidateFraud = async (payload: { total_price: number, items: any[], session_id: string }) => {
    return new Promise<{ ok: boolean, data?: any, error?: string }>((resolve) => setTimeout(() => {
        let riskScore = 0;
        const reasons: string[] = [];

        if (payload.total_price > 10000) {
            riskScore += 65;
            reasons.push("Extremely high order value");
        } else if (payload.total_price > 5000) {
            riskScore += 30;
            reasons.push("High order value");
        }

        const totalItems = payload.items.reduce((acc, item) => acc + item.quantity, 0);
        if (totalItems > 50) {
            riskScore += 50;
            reasons.push("Unusually large quantity of items");
        }

        if (riskScore > 60) {
            return resolve({ ok: false, error: `Order flagged for manual review: ${reasons.join(', ')}` });
        }

        resolve({ ok: true, data: { success: true, risk_score: riskScore } });
    }, 400));
};

export const mockPlaceOrder = async (payload: any) => {
    return new Promise<{ ok: boolean, data?: any, error?: string }>((resolve) => setTimeout(() => {
        cleanupExpiredReservations();
        const db = readDB();

        // Check if reservations are still valid
        for (const item of payload.items) {
            const hasValidReservation = db.reservations.some(r =>
                r.session_id === payload.session_id &&
                r.product_id === item.product_id &&
                r.quantity >= item.quantity
            );

            if (!hasValidReservation) {
                return resolve({ ok: false, error: `Reservation expired for product ${item.title}. Please try again.` });
            }
        }

        const orderId = `ORD-${Math.floor(Math.random() * 900000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        // Commit Order
        const newOrder = {
            order_id: orderId,
            ...payload,
            order_status: "CONFIRMED",
            created_at: new Date().toISOString()
        };

        db.orders.push(newOrder);

        // Remove the reservations natively mapped since they are fulfilled
        db.reservations = db.reservations.filter(r => r.session_id !== payload.session_id);

        writeDB(db);

        resolve({ ok: true, data: { success: true, order_id: orderId, message: "Order placed successfully" } });
    }, 800));
};
