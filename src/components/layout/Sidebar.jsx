import React, { useMemo } from "react";
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
			className={`fixed top-0 left-0 z-50 h-screen bg-primary text-gray-300 transition-all duration-300 ease-in-out w-64 ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 ${isSidebarOpen ? "md:w-64" : "md:w-20"}`}
		>
			<div className="flex items-center justify-center h-16 border-b border-primary-dark/50 overflow-hidden">
				<img
					src="/logo-dishub.png"
					alt="Logo SIMADA"
					className="h-10 w-10 shrink-0"
				/>
				<h1
					className={`text-2xl font-bold ml-2 whitespace-nowrap text-white transition-all duration-300 ${
						isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
					}`}
				>
					SIMADA
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
