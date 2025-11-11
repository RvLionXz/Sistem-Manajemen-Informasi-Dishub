import React from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../../router/menu";
import { ChevronRight, Home } from "lucide-react";

const findPath = (items, pathname) => {
	for (const item of items) {
		if (item.path === pathname) {
			return [item];
		}
		if (item.children) {
			const childPath = findPath(item.children, pathname);
			if (childPath.length > 0) {
				return [item, ...childPath];
			}
		}
	}
	return [];
};

const Breadcrumb = () => {
	const location = useLocation();
	const pathParts = findPath(menuItems, location.pathname);

	if (location.pathname === "/dashboard" || pathParts.length === 0) {
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
				<React.Fragment key={index}>
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
