import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import MainLayout from "../components/layout/MainLayout";

const ProtectedRoute = () => {
	const { isAuthenticated } = useAppContext();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
};

export default ProtectedRoute;
