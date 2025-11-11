import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/protected/DashboardPage";
import GenericCrudPage from "../pages/protected/GenericCrudPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />

			<Route element={<ProtectedRoute />}>
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/data/*" element={<GenericCrudPage />} />
			</Route>

			<Route path="*" element={<h1>404 Not Found</h1>} />
		</Routes>
	);
};

export default AppRoutes;
