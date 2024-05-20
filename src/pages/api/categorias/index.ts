import { ALL_PARAMS } from "@/shared/constants"
import type { APIRoute } from "astro"
import { Categories, db } from "astro:db"

const mockCategoriesResponse = {
	info: {
		totalCategories: 0,
		categoriesPerPage: 0,
		error: null,
	},
	categories: [],
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url)
	const paramsURL = url.searchParams
	try {
		const limit = parseInt(paramsURL.get(ALL_PARAMS.limit)) || null

		if (isNaN(limit) || (limit < 1 && limit !== null)) {
			throw new Error("Limite tiene que ser un numero entero mayor a 1.")
		}

		const categoriesQuery = db.select().from(Categories).limit(limit)

		const categories = await categoriesQuery

		const status = 200

		const response = {
			...mockCategoriesResponse,
			info: {
				totalCategories: categories.length,
				categoriesPerPage: limit,
				...mockCategoriesResponse.info,
			},
			categories,
		}

		return new Response(JSON.stringify(response), { status })
	} catch (error) {
		const status = 404
		const response = {
			...mockCategoriesResponse,
			info: {
				...mockCategoriesResponse.info,
				error: error.message,
			},
		}

		return new Response(JSON.stringify(response), { status })
	}
}
