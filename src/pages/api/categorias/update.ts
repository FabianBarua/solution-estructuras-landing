// upload de imagenes a cloudinary
import type { APIContext } from "astro"
import { Categories, db, eq } from "astro:db"

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

		if (isNaN(id) || !name || !id) {
			return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		const result = await db
			.update(Categories)
			.set({
				name,
			})
			.where(eq(Categories?.id, id))
			.returning()

		if (result.length === 0) {
			return new Response(JSON.stringify({ error: "No se encontró la categoria" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			})
		}
		return new Response(JSON.stringify({ message: "Categoria actualizada", category: result[0] }), {
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
