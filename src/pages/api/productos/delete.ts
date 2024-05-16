// upload de imagenes a cloudinary
import type { APIContext } from "astro"
import { db, eq, Products } from "astro:db"
//import { db, Products } from "astro:db"
// FRONT END CODE
// const response = await fetch('/api/productos/delete', {
// 	method: 'POST',
// 	body: JSON.stringify({ id: deleteProduct.id }),
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// }

export const POST = async (context: APIContext) => {
	if (!context.locals.session) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		})
	}

	const { request } = context

	try {
		const body = await request.json()
		const id = body.id

		const res = await db.delete(Products).where(eq(Products.id, id)).returning()

		if (res.length === 0) {
			return new Response(JSON.stringify({ error: "Producto no encontrado" }), {
				status: 404,
			})
		}

		if (res) {
			console.log("Producto eliminado")
		}

		return new Response(JSON.stringify({ message: "Producto eliminado", id }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: "No se pudo eliminar el producto" }), {
			status: 500,
		})
	}
}
