import type { APIRoute } from "astro"
import { db, SocialMedia } from "astro:db"

export const GET: APIRoute = async ({}) => {
	try {
		const res = await db.select().from(SocialMedia)

		return new Response(JSON.stringify({ redes: res }), {
			status: 415,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error) {
		const status = 404

		return new Response(
			JSON.stringify({
				redes: [],
			}),
			{ status }
		)
	}
}
