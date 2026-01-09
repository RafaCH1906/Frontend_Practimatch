import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { PrivateRoute } from '@/auth/PrivateRoute';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ROUTES } from '@/config/constants';

// Root redirect component
const RootRedirect = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <Navigate
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
            replace
        />
    );
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={ROUTES.HOME} element={<RootRedirect />} />
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route
                        path={ROUTES.DASHBOARD}
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
