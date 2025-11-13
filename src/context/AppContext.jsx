import React, { createContext, useState, useContext, useEffect } from "react";
import schemaData from "../config/simadis_schema.json";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [schema, setSchema] = useState({ menus: [], pages: {}, tables: {} });

	useEffect(() => {
		setSchema(schemaData);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth > 768);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
			setIsAuthenticated(true);
		}
	}, []);

	const login = (userData) => {
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("user");
		setUser(null);
		setIsAuthenticated(false);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const value = {
		isSidebarOpen,
		toggleSidebar,
		isAuthenticated,
		user,
		login,
		logout,
		schema,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext);
};
