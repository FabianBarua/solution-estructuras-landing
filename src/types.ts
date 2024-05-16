export type status = "Activo" | "Inactivo"

export type Product = {
	id: number
	name: string
	status: status
	price: number
	sku: any
	shortName: string
	description: string
	imageUrl: string
	imageUrl2: string
	imageUrl3: string
	imageAlt: string
	categoryId: number
	showAtHome: boolean
}
