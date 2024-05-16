import { mockProductsResponse } from "@/shared/constants";
import type { APIRoute } from "astro";
import { db, Products } from "astro:db";

export const GET: APIRoute = async () => {
try{
	const productos = await db.select().from(Products)
	const response = {
		...mockProductsResponse,
		info: {
			...mockProductsResponse.info,
			count: productos.length,
		},
		products: productos,
	}
	return new Response(JSON.stringify(response), { status: 200 })
} catch (error) {
	const status = 404

	return new Response(
		JSON.stringify({
			...mockProductsResponse,
			info: {
				...mockProductsResponse.info,
				error: error.message,
			},
		}),
		{ status }
	)
}
}