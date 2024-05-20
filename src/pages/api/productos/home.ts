import { db, sql } from "astro:db"

export const GET = async (request) => {
	const url = new URL(request.url)
	const paramsURL = url.searchParams
	const limit = paramsURL.get("limit")

	const parsedLimit = parseInt(limit || "5")

	if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 10) {
		return new Response(JSON.stringify([]))
	}

	const structuredQuery = sql`SELECT * FROM products ORDER BY RANDOM() LIMIT ${parsedLimit}`
	const productos = await db.run(structuredQuery)

	return new Response(JSON.stringify(productos.rows))
}
