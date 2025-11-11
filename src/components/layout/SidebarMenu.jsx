import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const SidebarMenu = ({ item, level = 0 }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { isSidebarOpen } = useAppContext();
	const location = useLocation();

	const isActive = (menuItem) => {
		if (menuItem.path && location.pathname.startsWith(menuItem.path)) {
			return true;
		}
		if (menuItem.children) {
			return menuItem.children.some((child) => isActive(child));
		}
		return false;
	};

	const isParentActive = isActive(item);

	useEffect(() => {
		if (isParentActive) {
			setIsOpen(true);
		}
	}, [location.pathname]);

	const Icon = item.icon
		? Icons[item.icon]
		: level > 0
		? Icons.CircleDot
		: Icons.Circle;

	if (item.children) {
		return (
			<li
				className={`${isParentActive ? "bg-gray-700/50 rounded-md" : ""} my-1`}
			>
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700/50 rounded-md transition-colors duration-200"
				>
					<div className="flex items-center">
						<Icon size={20} className="text-sky-400 shrink-0" />
						<span
							className={`ml-4 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
								isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
							}`}
						>
							{item.name}
						</span>
					</div>
					{isSidebarOpen && (
						<Icons.ChevronDown
							size={16}
							className={`transition-transform duration-300 ${
								isOpen ? "rotate-180" : ""
							}`}
						/>
					)}
				</div>
				<div
					className={`grid transition-all duration-300 ease-in-out ${
						isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
					}`}
				>
					<ul className={`overflow-hidden pl-5`}>
						{item.children.map((child, index) => (
							<SidebarMenu key={index} item={child} level={level + 1} />
						))}
					</ul>
				</div>
			</li>
		);
	} else {
		return (
			<li className="my-1">
				<NavLink
					to={item.path}
					className={({ isActive }) =>
						`flex items-center p-3 hover:bg-gray-700/50 rounded-md transition-colors duration-200 ${
							isActive ? "bg-sky-500/20 text-sky-300" : ""
						}`
					}
				>
					<Icon size={20} className="text-sky-400 shrink-0" />
					<span
						className={`ml-4 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
							isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
						}`}
					>
						{item.name}
					</span>
				</NavLink>
			</li>
		);
	}
};

export default SidebarMenu;
