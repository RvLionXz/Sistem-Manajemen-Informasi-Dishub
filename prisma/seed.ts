// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Start seeding ...");

	// Hapus data lama untuk memastikan seeding bersih
	await prisma.menu.deleteMany({});
	await prisma.page.deleteMany({});
	await prisma.table.deleteMany({});

	// 1. Buat Menu Induk LLA
	const menuLLA = await prisma.menu.create({
		data: {
			name: "LLA",
			icon: "TrafficCone",
			order: 1,
		},
	});

	// 2. Buat Tabel: tbl_lokasi_halte
	const tableLokasiHalte = await prisma.table.create({
		data: {
			name: "tbl_lokasi_halte",
			description: "Data detail lokasi semua halte di kota",
			columns: {
				create: [
					{
						columnName: "nama_halte",
						columnLabel: "Nama Halte",
						dataType: "text",
						order: 1,
					},
					{
						columnName: "kode",
						columnLabel: "Kode",
						dataType: "text",
						order: 2,
					},
					{
						columnName: "lat",
						columnLabel: "Latitude",
						dataType: "number",
						order: 3,
					},
					{
						columnName: "long",
						columnLabel: "Longitude",
						dataType: "number",
						order: 4,
					},
					{
						columnName: "gambar",
						columnLabel: "Gambar",
						dataType: "image",
						order: 5,
					},
				],
			},
		},
	});

	// 3. Buat Halaman untuk Lokasi Halte (Layout: table)
	const pageLokasiHalte = await prisma.page.create({
		data: {
			path: "/page/lokasi-halte",
			title: "Lokasi Halte",
			layoutType: "table",
			tableId: tableLokasiHalte.id,
		},
	});

	// 4. Buat Menu Anak untuk Lokasi Halte
	await prisma.menu.create({
		data: {
			name: "Lokasi Halte",
			icon: "MapPin",
			path: pageLokasiHalte.path,
			parentId: menuLLA.id,
			order: 1,
		},
	});

	console.log("Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
