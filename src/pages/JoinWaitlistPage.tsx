import React, { useState, useEffect } from 'react';
import { registerToWaitlist } from '@/api/public';
import { getTrackingMetadata, TrackingMetadata } from '@/utils/tracking';

export const JoinWaitlistPage = () => {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('student');
    const [product, setProduct] = useState('Practimatch Alpha');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tracking, setTracking] = useState<TrackingMetadata | null>(null);
    const [trafficSourceExplicit, setTrafficSourceExplicit] = useState('');

    // Detect all tracking metadata on mount
    useEffect(() => {
        const initTracking = async () => {
            const data = await getTrackingMetadata();
            setTracking(data);
        };
        initTracking();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await registerToWaitlist({
                email,
                user_type: userType,
                product_of_interest: product,
                ...tracking || {
                    source: 'direct',
                    channel: 'web',
                    device_type: 'desktop',
                    browser: 'other',
                    country: 'Unknown',
                    city: 'Unknown'
                },
                ...(trafficSourceExplicit ? { traffic_source_explicit: trafficSourceExplicit } : {})
            });
            setIsSuccess(true);
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.response?.data?.detail || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white">¡You're on the list!</h2>
                    <p className="text-slate-400 text-lg">
                        Thank you for joining. We'll reach out to <strong>{email}</strong> when we're ready for {userType}s.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                        Register another email
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <main className="max-w-xl w-full relative z-10 text-center space-y-12">
                {/* Branding / Hero */}
                <div className="space-y-4">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full border border-indigo-500/20">
                        Coming Soon
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                        Practimatch <span className="text-indigo-500">Waitlist</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto">
                        Be the first to experience the future of talent matching. Join our early access list today.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden relative">
                    {isSubmitting && (
                        <div className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm z-20 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">I am a...</label>
                                <select
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                                >
                                    <option value="student">Student</option>
                                    <option value="company">Company</option>
                                    <option value="university">University</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Interested in...</label>
                                <select
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                                >
                                    <option value="Practimatch Alpha">Practimatch Alpha</option>
                                    <option value="Enterprise Dashboard">Enterprise Dashboard</option>
                                    <option value="University Partners">University Partners</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 ml-1">How did you hear about us? (Optional)</label>
                            <select
                                value={trafficSourceExplicit}
                                onChange={(e) => setTrafficSourceExplicit(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                            >
                                <option value="">Select an option</option>
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                                <option value="tiktok">TikTok</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="google">Google</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transform transition-all active:scale-95 disabled:opacity-50"
                        >
                            Join Early Access
                        </button>
                    </form>
                </div>

                <p className="text-slate-500 text-sm">
                    Already an admin? <a href="/login" className="text-indigo-400 hover:underline">Log in here</a>
                </p>
            </main>
        </div>
    );
};
