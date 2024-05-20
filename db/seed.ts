import { Categories, db, Products, SocialMedia, User } from "astro:db"
import { Argon2id } from "oslo/password"

interface Category {
	id: number
	name: string
}

import type { Product } from "src/types"

const getCategories = async () => {
	const res = await fetch("https://dummyjson.com/products/categories")
	const data = await res.json()
	const categoriesJson: Category[] = data.slice(0, 5).map((category: string, index: number) => {
		return {
			id: index,
			name: category,
		}
	})
	return categoriesJson
}

const products = async ({ categories }: { categories: Category[] }) => {
	const products = await Promise.all(
		categories.map(async (category) => {
			const res = await fetch(`https://dummyjson.com/products/category/${category.name}`)
			const { products: productsRes } = await res.json()

			const fixImageUrl = (url: null | string) => {
				// algunas url estan mal, ejemplo src="["https://i.imgur.com/w3Y8NwQ.jpeg"]"

				if (url && url.includes('["')) {
					const fixedUrl = url.replace('["', "").replace('"]', "")
					return fixedUrl
				}

				return url
			}

			const productsJson: Product[] = productsRes.map((product: any) => {
				return {
					id: product.id,
					name: product.title,
					shortName: product.title.split(" ")[0],
					price: product.price,
					status: "Activo",
					description: product.description,
					imageUrl: fixImageUrl(product.thumbnail) || null,
					imageUrl2: fixImageUrl(product.images[0]) || null,
					imageUrl3: fixImageUrl(product.images[1]) || null,
					imageAlt: fixImageUrl(product.images[2]) || null,
					categoryId: category.id,
					showAtHome: false,
				}
			})
			return productsJson
		})
	)

	const productsArray = products.flat()

	return productsArray
}

export default async function () {
	const hashedPassword = await new Argon2id().hash("admin")

	await db.insert(User).values([
		{
			id: "1",
			username: "admin",
			password: hashedPassword,
		},
	])

	const categories: Category[] = await getCategories()
	const productsArray = await products({ categories })
	// make  5 random products show at home true

	const randomProductsIndex: number[] = []

	while (randomProductsIndex.length < 5) {
		const randomIndex = Math.floor(Math.random() * productsArray.length)
		if (!randomProductsIndex.includes(randomIndex)) {
			randomProductsIndex.push(randomIndex)
		}
	}

	randomProductsIndex.forEach((index) => {
		productsArray[index].showAtHome = true
	})

	await db.insert(Categories).values(categories)
	await db.insert(Products).values(productsArray)
	await db.insert(Products).values([
		{
			id: 100,
			name: "Producto sin imagen",
			shortName: "Producto sin imagen",
			price: 1000,
			status: "Activo",
			description: "Producto sin imagen",
			imageUrl: null,
			imageUrl2: null,
			imageUrl3: null,
			imageAlt: null,
			categoryId: null,
			showAtHome: false,
		},
		{
			id: 101,
			name: "Producto con imagen",
			shortName: "Producto con imagen",
			price: 1000,
			status: "Activo",
			description: "Producto con imagen",
			imageUrl: "/images/1.jpg",
			imageUrl2: "/images/2.jpg",
			imageUrl3: "/images/3.jpg",
			imageAlt: "Producto con imagen",
			categoryId: null,
			showAtHome: false,
		},
	])

	await db.insert(SocialMedia).values([
		{
			id: 1,
			name: "Facebook",
			url: "https://www.facebook.com",
			icon: "/images/facebook.svg",
			actived: true,
		},
		{
			id: 2,
			name: "Instagram",
			url: "https://www.instagram.com",
			icon: "/images/ig.svg",
			actived: true,
		},
		{
			id: 3,
			name: "Whatsapp",
			url: "https://www.twitter.com",
			icon: "/images/whatsapp.svg",
			actived: true,
		},
		{
			id: 4,
			name: "Maps",
			url: "https://www.google.com/maps",
			icon: "/images/pin.svg",
			actived: false,
		},
	])

	console.log("Seed data inserted")
}
