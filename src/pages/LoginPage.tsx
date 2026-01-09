import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { login as loginAPI } from '@/api/auth';
import { ROUTES } from '@/config/constants';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuthData } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await loginAPI({ email, password });

            // Save auth data
            const user = response.user || { id: '', email };
            setAuthData(response.access_token, user);

            // Redirect to dashboard
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[400px]">
                {/* Header */}
                <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Admin Login
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Acceso exclusivo para administradores de Practimatch
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                                <div className="text-sm text-red-600 font-medium">{error}</div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700 mb-1.5"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="nombre@empresa.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700 mb-1.5"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Reviewing...
                                </span>
                            ) : 'Sign in'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} Practimatch. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};
