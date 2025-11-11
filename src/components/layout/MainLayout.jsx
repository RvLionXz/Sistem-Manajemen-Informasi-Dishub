import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAppContext } from "../../context/AppContext";

const MainLayout = () => {
	const { isSidebarOpen, toggleSidebar } = useAppContext();

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar />

			{isSidebarOpen && (
				<div
					onClick={toggleSidebar}
					className="fixed inset-0 z-40 bg-black/50 md:hidden"
				></div>
			)}

			<div
				className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
					isSidebarOpen ? "md:ml-64" : "md:ml-20"
				}`}
			>
				<Navbar />
				<main className="flex-1 p-4 md:p-6 overflow-y-auto">
					<div className="animate-[fadeIn_0.5s_ease-in-out]">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
