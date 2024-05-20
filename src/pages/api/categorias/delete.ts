import type { APIContext } from "astro"
import { Categories, db, eq, Products } from "astro:db"

export const POST = async (context: APIContext) => {
	if (!context.locals.session) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		})
	}

	const { request } = context

	try {
		const formData = await request.formData()
		const id = parseInt(formData.get("id") as string)

		await db.update(Products).set({ categoryId: null }).where(eq(Products.categoryId, id))

		const res = await db.delete(Categories).where(eq(Categories?.id, id)).returning()

		if (res.length === 0) {
			return new Response(JSON.stringify({ error: "Categoria no encontrada" }), {
				status: 404,
			})
		}

		return new Response(JSON.stringify({ message: "Categoria eliminada", id }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error) {
		console.error(error)
		return new Response(JSON.stringify({ error: "No se pudo eliminar la categoria" }), {
			status: 500,
		})
	}
}
