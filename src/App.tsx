import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/auth/AuthContext';
import { PrivateRoute } from '@/auth/PrivateRoute';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ROUTES } from '@/config/constants';

import { JoinWaitlistPage } from '@/pages/JoinWaitlistPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Landing & Registration */}
                    <Route path={ROUTES.HOME} element={<JoinWaitlistPage />} />
                    <Route path={ROUTES.JOIN} element={<JoinWaitlistPage />} />

                    {/* Admin Auth */}
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />

                    {/* Admin Dashboard */}
                    <Route
                        path={ROUTES.DASHBOARD}
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Fallback to landing */}
                    <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
