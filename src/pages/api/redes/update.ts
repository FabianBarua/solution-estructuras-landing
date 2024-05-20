import type { APIContext } from "astro"
import { db, eq, SocialMedia } from "astro:db"

export const POST = async (context: APIContext) => {
	try {
		if (!context.locals.session) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			})
		}

		const { request } = context

		const body = await request.json()

		const idVar = body?.id || null
		const urlVar = body.url || null
		const activedVar = body.actived

		if (idVar === null) {
			return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		interface NewValors {
			url?: string | null // Define url como opcional
			actived?: boolean
		}

		const newValors: NewValors = {}

		if (urlVar !== null) {
			newValors.url = urlVar
		}

		if (activedVar !== null) {
			newValors.actived = activedVar
		}

		const query = await db
			.update(SocialMedia)
			.set(newValors)
			.where(eq(SocialMedia?.id, idVar))
			.returning()

		return new Response(JSON.stringify({ message: "Producto actualizado", product: query[0] }), {
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
