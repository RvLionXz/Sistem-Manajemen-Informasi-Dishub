import React, { useMemo } from "react";
import { ActivitySquare } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import SidebarMenu from "./SidebarMenu";

const buildMenuTree = (menus) => {
	const menuMap = {};
	const menuTree = [];

	menus.forEach((menu) => {
		menuMap[menu.id] = { ...menu, children: [] };
	});

	menus.forEach((menu) => {
		if (menu.parent_id) {
			if (menuMap[menu.parent_id]) {
				menuMap[menu.parent_id].children.push(menuMap[menu.id]);
			}
		} else {
			menuTree.push(menuMap[menu.id]);
		}
	});

	return menuTree;
};

const Sidebar = () => {
	const { isSidebarOpen, schema } = useAppContext();
	const menuTree = useMemo(() => buildMenuTree(schema.menus), [schema.menus]);

	return (
		<aside
			className={`fixed top-0 left-0 z-50 h-screen bg-gray-900 text-gray-300 transition-all duration-300 ease-in-out w-64 ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 ${isSidebarOpen ? "md:w-64" : "md:w-20"}`}
		>
			<div className="flex items-center justify-center h-16 border-b border-gray-700/50 overflow-hidden">
				<ActivitySquare size={28} className="text-sky-400 shrink-0" />
				<h1
					className={`text-xl font-bold ml-2 whitespace-nowrap transition-all duration-300 ${
						isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
					}`}
				>
					<span className="text-sky-400">Sistem</span>Info
				</h1>
			</div>
			<nav className="mt-4 px-3">
				<ul>
					{menuTree.map((item) => (
						<SidebarMenu key={item.id} item={item} />
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
