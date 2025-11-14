import React, { useState } from "react";
import {
	Edit,
	Trash,
	ChevronLeft,
	ChevronRight,
	Search,
	Plus,
} from "lucide-react";

const DataTable = ({ columns, data, onEdit, onDelete, onAdd }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = data.filter((item) =>
		Object.values(item).some((val) =>
			String(val).toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const lastItemIndex = currentPage * itemsPerPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const currentItems = filteredData.slice(firstItemIndex, lastItemIndex);
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const paginate = (pageNumber) => {
		if (pageNumber < 1 || pageNumber > totalPages) return;
		setCurrentPage(pageNumber);
	};

	return (
		<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
				<div className="relative w-full sm:w-auto">
					<input
						type="text"
						placeholder="Cari data..."
						className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-sky-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
						size={20}
					/>
				</div>
				<button
					onClick={onAdd}
					className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full sm:w-auto justify-center"
				>
					<Plus size={18} />
					<span>Tambah Data</span>
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-600">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3 w-16">
								NO
							</th>
							{columns.map((col) => (
								<th key={col.accessor} scope="col" className="px-6 py-3">
									{col.Header}
								</th>
							))}
							<th scope="col" className="px-6 py-3 text-center">
								AKSI
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.length > 0 ? (
							currentItems.map((row, index) => (
								<tr
									key={row.id || index}
									className="bg-white border-b hover:bg-gray-50"
								>
									<td className="px-6 py-4 font-medium text-gray-900">
										{firstItemIndex + index + 1}
									</td>
									{columns.map((col) => (
										<td
											key={col.accessor}
											className="px-6 py-4 whitespace-nowrap"
										>
											{col.Cell ? col.Cell({ row }) : row[col.accessor]}
										</td>
									))}
									<td className="px-6 py-4 flex justify-center items-center space-x-2">
										<button
											onClick={() => onEdit(row)}
											className="p-2 text-primary hover:text-white hover:bg-primary-dark rounded-full"
										>
											<Edit size={18} />
										</button>
										<button
											onClick={() => onDelete(row)}
											className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
										>
											<Trash size={18} />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length + 2}
									className="text-center py-10 text-gray-500"
								>
									Tidak ada data yang ditemukan.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{totalPages > 1 && (
				<div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
					<span>
						Halaman {currentPage} dari {totalPages}
					</span>
					<div className="flex items-center mt-2 sm:mt-0">
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
							className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md"
						>
							<ChevronLeft size={20} />
						</button>
						<span className="px-4">{currentPage}</span>
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md"
						>
							<ChevronRight size={20} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTable;
