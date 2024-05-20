import { ALL_PARAMS, ALL_SORTS, MAX_PER_PAGE, mockProductsResponse } from "@/shared/constants"
import type { APIRoute } from "astro"
import { asc, count, db, desc, inArray, isNull, like, Products, sql } from "astro:db"

const validateParams = ({ search, page, listOfCategoriesIDS }) => {
	if (isNaN(page)) {
		throw new Error("Page tiene que ser un numero entero mayor a 1.")
	}

	if (search.length > 100) {
		throw new Error("El parámetro de búsqueda no puede contener más de 100 caracteres.")
	}

	if (isNaN(page) || page < 1) {
		throw new Error("El parámetro de página debe ser un número mayor a 0.")
	}

	if (listOfCategoriesIDS && listOfCategoriesIDS.some(isNaN)) {
		throw new Error("El parámetro de categorías contiene valores no válidos.")
	}
}

const getPrevAndNextPage = (page: number, totalQuery: number) => {
	let prevPageNumber = null
	let nextPageNumber = null

	if (page > 1 && page <= Math.ceil(totalQuery / MAX_PER_PAGE)) {
		prevPageNumber = page - 1
	}
	if (page >= 1 && page < Math.ceil(totalQuery / MAX_PER_PAGE)) {
		nextPageNumber = page + 1
	}

	return {
		prevPageNumber,
		nextPageNumber,
	}
}

const getProducts = async ({ search, listOfCategoriesIDS, page, sortID }) => {
	try {
		const categories = listOfCategoriesIDS?.filter((id) => id !== null)
		const searchByName = like(Products.name, `%${search}%`)

		const whereOptions = sql`
			${searchByName}
			
			${
				categories?.length > 0 || listOfCategoriesIDS?.includes(null)
					? sql` 
					AND
						(
							${categories.length > 0 ? inArray(Products.categoryId, categories as number[]) : sql`false`}
							OR
							${listOfCategoriesIDS.includes(null) ? isNull(Products.categoryId) : sql`false`}
						)
					`
					: sql``
			}

			`

		const sort = ALL_SORTS[sortID] || ALL_SORTS[0]

		const querySearch = db
			.select()
			.from(Products)
			.limit(MAX_PER_PAGE)
			.offset((page - 1) * MAX_PER_PAGE)
			.where(whereOptions)

		if (sort.type === "price") {
			if (sort.inverted) {
				querySearch.orderBy(desc(Products.price))
			} else {
				querySearch.orderBy(asc(Products.price))
			}
		}

		if (sort.type === "name") {
			if (sort.inverted) {
				querySearch.orderBy(desc(Products.name))
			} else {
				querySearch.orderBy(asc(Products.name))
			}
		}

		const queryCount = db.select({ count: count() }).from(Products).where(whereOptions)

		const [products, [{ count: totalQuery }]] = await Promise.all([querySearch, queryCount])

		return { products, totalQuery }
	} catch (error) {
		throw new Error("Error al obtener los productos")
	}
}

export const GET: APIRoute = async ({ request }) => {
	try {
		const url = new URL(request.url)
		const paramsURL = url.searchParams

		const search = paramsURL.get(ALL_PARAMS.search) || ""
		const listOfCategoriesIDS =
			paramsURL.get(ALL_PARAMS.categories) !== ""
				? paramsURL
						.get(ALL_PARAMS.categories)
						?.split("-")
						?.map((id) => {
							if (id === "null") {
								return null
							}
							return parseInt(id)
						})
				: null

		const sortID = parseInt(paramsURL.get(ALL_PARAMS.sortID) || "0") || 0

		const page = parseInt(paramsURL.get(ALL_PARAMS.page) || "1") || 1

		validateParams({ search, page, listOfCategoriesIDS })

		const { products, totalQuery } = await getProducts({
			search,
			listOfCategoriesIDS,
			page,
			sortID,
		})

		if (page < 1 || page > Math.ceil(totalQuery / MAX_PER_PAGE)) {
			throw new Error("No se encontraron productos")
		}

		const { prevPageNumber, nextPageNumber } = getPrevAndNextPage(page, totalQuery)

		paramsURL.set(ALL_PARAMS.page, prevPageNumber?.toString())
		const prevUrl = prevPageNumber ? `${url.href}` : null

		paramsURL.set(ALL_PARAMS.page, nextPageNumber?.toString())
		const nextUrl = nextPageNumber ? `${url.href}` : null

		const info = {
			...mockProductsResponse.info,
			totalProducts: totalQuery || 0,
			nextUrl,
			prevUrl,
			currentPage: page,
			totalPages: Math.ceil(totalQuery / MAX_PER_PAGE),
			productsPerPage: MAX_PER_PAGE,
			totalInPage: products.length,
		}

		const response = {
			...mockProductsResponse,
			info: {
				...info,
			},
			products,
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
