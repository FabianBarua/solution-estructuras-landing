import { db, Products, sql } from "astro:db"

export const GET = async (request) => {
	const url = new URL(request.url)
	const paramsURL = url.searchParams
	const limit = paramsURL.get("limit")

	const parsedLimit = parseInt(limit || "5")

	if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 10) {
		return new Response(JSON.stringify([]))
	}

	const productos = await db
		.select()
		.from(Products)
		.orderBy(sql`RANDOM()`)
		.limit(parsedLimit)

	return new Response(JSON.stringify(productos))
}
