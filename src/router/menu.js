export const menuItems = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: "LayoutDashboard",
	},
	{
		name: "LLA",
		icon: "TrafficCone",
		children: [
			{
				name: "Jumlah Halte Angkutan Umum",
				path: "/data/lla/jumlah-halte-angkutan-umum",
				icon: "Bus",
			},
			{
				name: "Lokasi Halte",
				path: "/data/lla/lokasi-halte",
				icon: "MapPin",
			},
			{
				name: "Jumlah Fasilitas Perlengkapan",
				path: "/data/lla/jumlah-fasilitas-perlengkapan",
				icon: "Wrench",
			},
			{
				name: "Persentasi Pemasangan Rambu",
				path: "/data/lla/persentasi-pemasangan-rambu",
				icon: "Signal",
			},
		],
	},
];
