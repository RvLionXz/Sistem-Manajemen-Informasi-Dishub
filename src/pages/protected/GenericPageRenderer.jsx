import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Breadcrumb from "../../components/layout/Breadcrumb";
import DataTable from "../../components/ui/DataTable";

const modules = import.meta.glob("/src/data/**/*.json");

const TableView = ({ tableId }) => {
	const { schema } = useAppContext();
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [error, setError] = useState(null);
	const tableConfig = useMemo(
		() => schema.tables[tableId],
		[schema.tables, tableId]
	);

	useEffect(() => {
		const loadData = async () => {
			if (!tableConfig) return;

			setError(null);
			const modulePath = `/src/data/${tableConfig.data_source}.json`;

			if (modules[modulePath]) {
				try {
					const moduleLoader = modules[modulePath];
					const module = await moduleLoader();
					setData(module.default);

					const generatedColumns = tableConfig.columns.map((col) => {
						const columnDef = { Header: col.label, accessor: col.id };
						if (col.type === "image") {
							columnDef.Cell = ({ row }) => (
								<a
									href={row[col.id]}
									target="_blank"
									rel="noopener noreferrer"
									className="block w-32 h-20"
								>
									<img
										src={row[col.id]}
										alt={col.label}
										className="w-full h-full object-cover rounded-md"
									/>
								</a>
							);
						}
						return columnDef;
					});
					setColumns(generatedColumns);
				} catch (e) {
					setError(`Gagal memproses data dari ${modulePath}`);
					console.error(e);
				}
			} else {
				setError(`File data tidak ditemukan di path: ${modulePath}`);
			}
		};
		loadData();
	}, [tableConfig]);

	if (error)
		return (
			<div className="text-red-500 p-4 bg-red-100 rounded-md">{error}</div>
		);
	if (!tableConfig)
		return <div>Konfigurasi tabel "{tableId}" tidak ditemukan.</div>;

	return (
		<DataTable
			columns={columns}
			data={data}
			onAdd={() => {}}
			onEdit={() => {}}
			onDelete={() => {}}
		/>
	);
};

const GenericPageRenderer = () => {
	const location = useLocation();
	const { schema } = useAppContext();
	const [pageConfig, setPageConfig] = useState(null);
	const [activeTab, setActiveTab] = useState("");

	useEffect(() => {
		const config = schema.pages[location.pathname];
		setPageConfig(config);
		if (config?.layout === "tabs" && config.tabs.length > 0) {
			setActiveTab(config.tabs[0].id);
		}
	}, [location.pathname, schema.pages]);

	if (!pageConfig) {
		return (
			<div>
				<Breadcrumb />
				<div className="text-red-500 p-4 bg-red-100 rounded-md">
					Konfigurasi untuk halaman <strong>{location.pathname}</strong> tidak
					ditemukan di <code>simadis_schema.json</code>.
				</div>
			</div>
		);
	}

	return (
		<div>
			<Breadcrumb />
			<h1 className="text-3xl font-bold text-gray-800 mb-6">
				{pageConfig.title}
			</h1>

			{pageConfig.layout === "tabs" ? (
				<>
					<div className="border-b border-gray-200 mb-4">
						<nav className="-mb-px flex space-x-6" aria-label="Tabs">
							{pageConfig.tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`${
										activeTab === tab.id
											? "border-primary text-primary"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
								>
									{tab.label}
								</button>
							))}
						</nav>
					</div>
					{pageConfig.tabs.map(
						(tab) =>
							activeTab === tab.id && (
								<TableView key={tab.id} tableId={tab.table_id} />
							)
					)}
				</>
			) : (
				<TableView tableId={pageConfig.table_id} />
			)}
		</div>
	);
};

export default GenericPageRenderer;
