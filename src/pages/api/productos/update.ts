// upload de imagenes a cloudinary
import type { APIContext } from "astro"
import { db, eq, Products } from "astro:db"

export const POST = async (context: APIContext) => {
	try {
		if (!context.locals.session) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			})
		}

		const { request } = context

		const formData = await request.formData()
		const id = parseInt(formData.get("id") as string)
		const name = formData.get("name") as string
		const shortName = formData.get("shortName") as string
		const price = parseFloat(formData.get("price") as string)
		const description = formData.get("description") as string
		const status = formData.get("status") as string
		const categoryId =
			formData.get("categoryId") === "null" ? null : parseInt(formData.get("categoryId") as string)
		const imageUrl = formData.get("imageUrl") as string
		const imageUrl2 = formData.get("imageUrl2") as string
		const imageUrl3 = formData.get("imageUrl3") as string
		const sku = formData.get("sku") as string

		if (
			!id ||
			!name ||
			!shortName ||
			isNaN(price) ||
			!description ||
			!status ||
			isNaN(categoryId) ||
			imageUrl === null ||
			imageUrl2 === null ||
			imageUrl3 === null ||
			!sku
		) {
			return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		await db
			.update(Products)
			.set({
				name,
				shortName,
				price,
				description,
				status,
				categoryId,
				imageUrl: imageUrl === "undefined" ? null : imageUrl,
				imageUrl2: imageUrl2 === "undefined" ? null : imageUrl2,
				imageUrl3: imageUrl3 === "undefined" ? null : imageUrl3,
				sku,
			})
			.where(eq(Products?.id, id))

		return new Response(JSON.stringify({ message: "Producto actualizado" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch (e) {
		return new Response(JSON.stringify({ error: e.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
