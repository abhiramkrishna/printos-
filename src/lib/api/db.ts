import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/db/mock_database.json');

export interface Reservation {
    reservation_id: string;
    product_id: string;
    quantity: number;
    session_id: string;
    reserved_until: string;
}

export interface Order {
    order_id: string;
    user_id?: string;
    items: any[];
    total_price: number;
    payment_method: string;
    fulfillment_type: string;
    pickup_store_id?: string;
    pickup_date?: string;
    pickup_slot?: string;
    shipping_address?: any;
    order_status: string;
    created_at: string;
}

export interface AbandonedCart {
    session_id: string;
    items: any[];
    abandoned_at: string;
}

interface Database {
    inventory: Record<string, number>;
    reservations: Reservation[];
    orders: Order[];
    abandoned_carts: AbandonedCart[];
}

export async function readDB(): Promise<Database> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to read DB:", error);
        return { inventory: {}, reservations: [], orders: [], abandoned_carts: [] };
    }
}

export async function writeDB(data: Database): Promise<void> {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Failed to write DB:", error);
    }
}

// Global cleanup: Removes expired reservations from active inventory blocks
export async function cleanupExpiredReservations() {
    const db = await readDB();
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
        await writeDB(db);
    }
}
