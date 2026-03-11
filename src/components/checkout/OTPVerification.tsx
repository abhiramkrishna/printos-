import React, { useState } from 'react';

interface Props {
    onSuccess: (userId: string) => void;
    onSkip: () => void;
}

export function OTPVerification({ onSuccess, onSkip }: Props) {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mobile.length < 10) {
            setError('Please enter a valid mobile number');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send code");
            }
            setStep('OTP');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to verify");
            }

            const data = await res.json();
            // Success
            onSuccess(data.user_id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Login or Guest Checkout</h2>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

            {step === 'MOBILE' ? (
                <form onSubmit={handleSendOTP}>
                    <p className="text-sm text-gray-500 mb-4">Login to track your order easily, or skip to continue as a guest.</p>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] focus:border-transparent outline-none"
                            placeholder="e.g. 9876543210"
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#1c1c1e] text-white py-3 rounded-xl font-bold hover:bg-black disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                        <button
                            type="button"
                            onClick={onSkip}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200"
                        >
                            Continue as Guest
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleVerifyOTP}>
                    <p className="text-sm text-gray-500 mb-4">Please enter the 6-digit code sent to +91 {mobile}. Check terminal for mock OTP.</p>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">OTP Code</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2D9ED8] focus:border-transparent outline-none"
                            placeholder="123456"
                            maxLength={6}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2D9ED8] text-white py-3 rounded-xl font-bold hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                </form>
            )}
        </div>
    );
}
