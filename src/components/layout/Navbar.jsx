import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
	const { user, logout, toggleSidebar, isSidebarOpen } = useAppContext();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="flex items-center justify-between h-16 bg-white shadow-sm px-4 md:px-6 z-30">
			<div className="flex items-center">
				<button
					onClick={toggleSidebar}
					className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
				>
					{isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>

			<div className="relative">
				<button
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
				>
					<div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
						{user?.name.charAt(0)}
					</div>
					<div className="hidden md:flex flex-col items-start">
						<span className="text-sm font-semibold text-gray-800">
							{user?.name}
						</span>
						<span className="text-xs text-gray-500">{user?.email}</span>
					</div>
					<ChevronDown
						size={16}
						className={`text-gray-500 transition-transform duration-200 ${
							isDropdownOpen ? "rotate-180" : ""
						}`}
					/>
				</button>

				<div
					className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
						isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<a
						href="#"
						onClick={handleLogout}
						className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						<LogOut size={16} className="mr-2" />
						Logout
					</a>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
