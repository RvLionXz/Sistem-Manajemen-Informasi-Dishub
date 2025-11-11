export const pageManifest = {
	"/data/lla/jumlah-halte-angkutan-umum": {
		layout: "table",
		dataSource: "/data/lla/jumlah-halte-angkutan-umum.json",
	},
	"/data/lla/lokasi-halte": {
		layout: "table",
		dataSource: "/data/lla/lokasi-halte.json",
	},
	"/data/lla/persentasi-pemasangan-rambu": {
		layout: "table",
		dataSource: "/data/lla/persentasi-pemasangan-rambu.json",
	},

	"/data/lla/jumlah-fasilitas-perlengkapan": {
		layout: "tabs",
		tabs: [
			{
				id: "realisasi",
				label: "Data Realisasi Fasilitas",
				dataSource: "/data/lla/fasilitas-perlengkapan-realisasi.json",
			},
			{
				id: "kebutuhan",
				label: "Data Kebutuhan Fasilitas",
				dataSource: "/data/lla/fasilitas-perlengkapan-kebutuhan.json",
			},
		],
	},
};
