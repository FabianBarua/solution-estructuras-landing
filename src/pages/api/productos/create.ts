// upload de imagenes a cloudinary
import type { APIContext } from "astro"
import { db, Products } from "astro:db"
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

	cloudinary.config({
		cloud_name: config.cloudName,
		api_key: config.apiKey,
		api_secret: config.apiSecret,
	})

	const formData = await request.formData()
	const name = formData.get("name") as string
	const shortName = formData.get("shortName") as string
	const price = parseFloat(formData.get("price") as string)
	const description = formData.get("description") as string
	const status = formData.get("status") as string
	const categoryId = parseInt(formData.get("categoryId") as string)
	const imageB64 = formData.get("imageB64") as string
	const imageB64_2 = formData.get("imageB64_2") as string
	const imageB64_3 = formData.get("imageB64_3") as string
	const sku = formData.get("sku") as string

	if (
		!name ||
		!shortName ||
		isNaN(price) ||
		!description ||
		!status ||
		isNaN(categoryId) ||
		imageB64 === null ||
		imageB64_2 === null ||
		imageB64_3 === null ||
		!sku
	) {
		return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		})
	}

	const images = [imageB64, imageB64_2, imageB64_3].filter((image) => image !== "undefined")

	const uploadPromises = images.map((imageB64, index) => {
		return new Promise((resolve, reject) => {
			cloudinary.uploader.upload(imageB64, { folder: "imageUploads" }, (error, result) => {
				if (error) {
					reject({
						secure_url: null,
					})
				} else {
					resolve({
						secure_url: result.secure_url,
					})
				}
			})
		})
	})

	const allResponse = await Promise.all(uploadPromises)

	const imageUrl = allResponse[0]?.secure_url || null
	const imageUrl2 = allResponse[1]?.secure_url || null
	const imageUrl3 = allResponse[2]?.secure_url || null

	const productInserted = await db
		.insert(Products)
		.values({
			name,
			shortName,
			price,
			description,
			status,
			categoryId,
			imageUrl,
			imageUrl2,
			imageUrl3,
			sku,
		})
		.returning()

	return new Response(JSON.stringify({ message: "Producto creado", product: productInserted[0] }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	})
}
