// import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../logic/context/AuthContext';

export const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a spinner, handled by Layout usually but if used directly

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};
