import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const menus = await prisma.menu.findMany({
			orderBy: { order: "asc" },
		});

		const pages = await prisma.page.findMany({
			include: {
				table: {
					include: {
						columns: {
							orderBy: { order: "asc" },
						},
					},
				},
				tabs: {
					include: {
						table: {
							include: {
								columns: {
									orderBy: { order: "asc" },
								},
							},
						},
					},
					orderBy: { order: "asc" },
				},
			},
		});

		return NextResponse.json({ menus, pages });
	} catch (error) {
		console.error("Failed to fetch system schema:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
