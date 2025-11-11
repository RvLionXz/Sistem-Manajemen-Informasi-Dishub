import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIsSidebarOpen(false);
			} else {
				setIsSidebarOpen(true);
			}
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
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext);
};
