// upload de imagenes a cloudinary
import type { APIContext } from "astro"
import { Categories, db } from "astro:db"

export const POST = async (context: APIContext) => {
	try {
		if (!context.locals.session) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			})
		}
		const { request } = context

		const formData = await request.formData()
		const name = formData.get("name") as string
		if (!name) {
			return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}
		const insertName = await db
			.insert(Categories)
			.values({
				name,
			})
			.returning()
		return new Response(JSON.stringify({ message: "Categoria creada", category: insertName[0] }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch (e) {
		console.log(e)
		return new Response(JSON.stringify({ error: e.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
