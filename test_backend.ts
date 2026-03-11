import { POST as reservePOST } from './src/pages/api/cart/reserve';
import { POST as sendOtpPOST } from './src/pages/api/auth/send-otp';
import { POST as verifyOtpPOST } from './src/pages/api/auth/verify-otp';
import { POST as placeOrderPOST } from './src/pages/api/checkout/place-order';
import { POST as fraudPOST } from './src/pages/api/checkout/validate-fraud';
import { readDB } from './src/lib/api/db';

async function mockRequest(body) {
    return {
        json: async () => body
    };
}

async function runTests() {
    console.log("--- STARTING TESTS ---");
    const sessionId = "test-session-123";

    // 1. Reserve Inventory
    console.log("Testing Reservation...");
    let req = await mockRequest({ product_id: "1", quantity: 2, session_id: sessionId });
    let res = await reservePOST({ request: req });
    console.log("Reserve Response:", await res.json());

    // 2. Send OTP
    console.log("\nTesting OTP Send...");
    req = await mockRequest({ mobile: "9876543210" });
    res = await sendOtpPOST({ request: req });
    console.log("OTP Send Response:", await res.json());

    // Wait for OTP log (mock SMS)
    // To avoid complex test logic, we simply grab the otp from the global store exported in the file
    // Wait, wait... `import { getMockOtpStore } from './src/pages/api/auth/send-otp';`
    const { getMockOtpStore } = await import('./src/pages/api/auth/send-otp');
    const store = getMockOtpStore();
    const otp = store["9876543210"]?.otp;
    console.log("Mock OTP received:", otp);

    // 3. Verify OTP
    console.log("\nTesting OTP Verify...");
    req = await mockRequest({ mobile: "9876543210", otp });
    res = await verifyOtpPOST({ request: req });
    const verifyData = await res.json();
    console.log("OTP Verify Response:", verifyData);

    // 4. Fraud Check
    console.log("\nTesting Fraud Check...");
    const cartItems = [{ product_id: "1", quantity: 2, price: "100" }];
    req = await mockRequest({ total_price: 200, items: cartItems, session_id: sessionId });
    res = await fraudPOST({ request: req });
    console.log("Fraud Response:", await res.json());

    // 5. Fraud Check (High Value)
    console.log("\nTesting Fraud Check (High Value)...");
    req = await mockRequest({ total_price: 25000, items: cartItems, session_id: sessionId });
    res = await fraudPOST({ request: req });
    console.log("Fraud High Value Response:", await res.json());

    // 6. Place Order
    console.log("\nTesting Place Order...");
    req = await mockRequest({
        session_id: sessionId,
        user_id: verifyData.user_id,
        items: cartItems,
        total_price: 200,
        payment_method: "UPI",
        fulfillment_type: "delivery",
        shipping_address: "Test Address"
    });
    res = await placeOrderPOST({ request: req });
    const orderData = await res.json();
    console.log("Place Order Response:", orderData);

    // 7. Verify DB update
    console.log("\nVerifying DB...");
    const db = await readDB();
    const orderFound = db.orders.find(o => o.order_id === orderData.order_id);
    console.log("Order saved in DB?", !!orderFound);

    console.log("--- TESTS COMPLETED ---");
}

runTests();
