import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const findPathFromSchema = (menus, pathname) => {
	if (!menus || menus.length === 0) {
		return [];
	}

	const menuMap = new Map(menus.map((menu) => [menu.id, menu]));
	const currentMenuItem = menus.find((menu) => menu.path === pathname);

	if (!currentMenuItem) {
		return [];
	}

	const path = [];
	let current = currentMenuItem;
	while (current) {
		path.unshift(current);
		current = menuMap.get(current.parent_id);
	}

	return path;
};

const Breadcrumb = () => {
	const location = useLocation();
	const { schema } = useAppContext();
	const pathParts = findPathFromSchema(schema.menus, location.pathname);

	if (location.pathname === "/dashboard" || pathParts.length <= 1) {
		return null;
	}

	return (
		<nav className="flex items-center text-sm text-gray-500 mb-4">
			<Link
				to="/dashboard"
				className="flex items-center gap-2 hover:text-sky-600"
			>
				<Home size={16} />
				Dashboard
			</Link>
			{pathParts.map((part, index) => (
				<React.Fragment key={part.id}>
					<ChevronRight size={16} className="mx-1" />
					{index === pathParts.length - 1 ? (
						<span className="font-semibold text-gray-800">{part.name}</span>
					) : (
						<span className="text-gray-500">{part.name}</span>
					)}
				</React.Fragment>
			))}
		</nav>
	);
};

export default Breadcrumb;
