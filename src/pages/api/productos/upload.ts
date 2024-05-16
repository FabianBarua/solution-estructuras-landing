// upload de imagenes a cloudinary
import type { APIContext } from "astro"
import { db, eq, Products } from "astro:db"
import { v2 as cloudinary } from "cloudinary"

const config = {
	cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
	apiKey: import.meta.env.CLOUDINARY_API_KEY,
	apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
}

export const POST = async (context: APIContext) => {
	if (!context.locals.session) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		})
	}

	const { request } = context

	try {
		const contentType = request.headers.get("content-type")
		if (!contentType || !contentType.includes("multipart/form-data")) {
			return new Response(JSON.stringify({ error: "Unsupported media type" }), {
				status: 415,
				headers: { "Content-Type": "application/json" },
			})
		}

		const formData = await request.formData()
		const imageFile = formData.get("file")
		const productId = parseInt(formData.get("id") as string)

		const key = (formData.get("key") || "imageUrl") as "imageUrl" | "imageUrl2" | "imageUrl3"

		if (!key || !imageFile || !productId) {
			return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		cloudinary.config({
			cloud_name: config.cloudName,
			api_key: config.apiKey,
			api_secret: config.apiSecret,
		})

		const imageBuffer = await (imageFile as Blob).arrayBuffer()
		const imageBase64 = Buffer.from(imageBuffer).toString("base64")

		const maxSize = 2 * 1024 * 1024
		if (imageBase64.length > maxSize) {
			return new Response(JSON.stringify({ error: "Image file too large" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		const cloudinaryResponse = await cloudinary.uploader.upload(
			`data:image/jpeg;base64,${imageBase64}`,
			{
				folder: "imageUploads",
			}
		)

		await db
			.update(Products)
			.set({
				[key as string]: cloudinaryResponse.secure_url,
			})
			.where(eq(Products.id, productId))
			.returning()

		return new Response(
			JSON.stringify({
				url: cloudinaryResponse.secure_url,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		)
	} catch (error) {
		console.error("Error al procesar la solicitud:", error)
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
