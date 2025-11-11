import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import DataTable from "../../components/ui/DataTable";
import { pageManifest } from "../../config/pageManifest";

const formatHeader = (key) =>
	key.replace(/_/g, " ").replace(/^./, (str) => str.toUpperCase());

const TableView = ({ dataSource }) => {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		const loadData = async () => {
			const module = await import(`../../${dataSource}`);
			const loadedData = module.default;
			setData(loadedData);
			if (loadedData.length > 0) {
				setColumns(
					Object.keys(loadedData[0])
						.filter((k) => k !== "id")
						.map((key) => ({ Header: formatHeader(key), accessor: key }))
				);
			}
		};
		loadData();
	}, [dataSource]);

	const handleCrud = (action, item) => {
		alert(
			`Aksi ${action} untuk item ID ${
				item?.id || "baru"
			} belum diimplementasikan.`
		);
	};

	return (
		<DataTable
			columns={columns}
			data={data}
			onAdd={() => handleCrud("add")}
			onEdit={handleCrud}
			onDelete={handleCrud}
		/>
	);
};

const GenericCrudPage = () => {
	const location = useLocation();
	const [config, setConfig] = useState(null);
	const [activeTab, setActiveTab] = useState("");
	const [pageTitle, setPageTitle] = useState("");

	useEffect(() => {
		const currentConfig = pageManifest[location.pathname];
		setConfig(currentConfig);
		if (currentConfig?.layout === "tabs") {
			setActiveTab(currentConfig.tabs[0].id);
		}
		const titleFromMenu = document.querySelector(
			`a[href="${location.pathname}"] span`
		)?.textContent;
		setPageTitle(titleFromMenu || "Halaman Data");
	}, [location.pathname]);

	if (!config) {
		return <div>Konfigurasi untuk halaman ini tidak ditemukan.</div>;
	}

	return (
		<div>
			<Breadcrumb />
			<h1 className="text-3xl font-bold text-gray-800 mb-6">{pageTitle}</h1>

			{config.layout === "tabs" ? (
				<>
					<div className="border-b border-gray-200 mb-4">
						<nav className="-mb-px flex space-x-6" aria-label="Tabs">
							{config.tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`${
										activeTab === tab.id
											? "border-sky-500 text-sky-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
								>
									{tab.label}
								</button>
							))}
						</nav>
					</div>
					{config.tabs.map(
						(tab) =>
							activeTab === tab.id && (
								<TableView key={tab.id} dataSource={tab.dataSource} />
							)
					)}
				</>
			) : (
				<TableView dataSource={config.dataSource} />
			)}
		</div>
	);
};

export default GenericCrudPage;
