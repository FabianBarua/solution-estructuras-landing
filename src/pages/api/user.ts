import type { APIContext } from "astro"

export async function GET(context: APIContext): Promise<Response> {
	return new Response(JSON.stringify(context.locals.user))
}
