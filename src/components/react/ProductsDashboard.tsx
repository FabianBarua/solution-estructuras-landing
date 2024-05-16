
import { Button } from "@/components/ui/button"
import { getCategories } from "@/shared/services/estructuras"
import type { Product } from "@/types"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog.tsx"
import { AddProduct } from "./AddProduct.tsx"
import { columns } from "./Columns"
import { DataTable } from "./DataTable"
import { EditForm } from "./EditForm.tsx"


export function ProductsDashboard() {

	const [productArrow, setProductArrow] = useState<Product[]>([])
	const [editProduct, setEditProduct] = useState<Product>(null)
	const [categorias, setCategorias] = useState([])
	const [addProduct, setAddProduct] = useState(false)
	const [deleteProduct, setDeleteProduct] = useState<Product>(null)

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/productos/all")
			const data = await response.json()

			const { categories } = await getCategories({
				limit: 5,
				url: window.location.origin
			})
			setCategorias(categories)

			setProductArrow(data.products)


		}
		fetchData()
	}, [])

	return (
		<>
			<Toaster />

			<Dialog open={deleteProduct !== null} onOpenChange={
				() => {
					setDeleteProduct(null)
				}
			}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Eliminar {deleteProduct?.name}</DialogTitle>
						<DialogDescription>
							¿Deseas eliminar el producto?
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button onClick={
							() => {
								setDeleteProduct(null)
							}
						}
							variant="secondary" >Cancelar</Button>
						<Button
							onClick={
								() => {

									const deletePromise = async () => {
										const response = await fetch('/api/productos/delete', {
											method: 'POST',
											body: JSON.stringify({ id: deleteProduct.id }),
											headers: {
												'Content-Type': 'application/json'
											}
										}
										)

										console.log(response.status)

										if (!response.ok) {
											throw new Error('No se pudo eliminar el producto')
										}

										setProductArrow(productArrow.filter(product => product.id !== deleteProduct.id))
										setDeleteProduct(null)

									}

									toast.promise(deletePromise(), {
										loading: 'Eliminando producto...',
										success: 'Producto eliminado',
										error: 'No se pudo eliminar el producto'
									})

								}
							}
							variant="secondary" >Eliminar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{
				(addProduct && !editProduct) && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<AddProduct setProductArrow={setProductArrow} setAddProduct={setAddProduct} categorias={categorias} />
					</motion.div>
				)
			}

			{
				(!addProduct && editProduct) && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="  p-6 gap-5   flex flex-col overflow-hidden h-screen  w-full  "

					>

						<EditForm categorias={categorias} product={editProduct} setProductArrow={setProductArrow} setEditProduct={setEditProduct} />
					</motion.div>
				)
			}

			{
				(!addProduct && !editProduct) && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="    flex flex-col overflow-hidden h-screen  w-full  "

					>

						<DataTable setAddProduct={setAddProduct} columns={columns(setEditProduct, setDeleteProduct)} data={productArrow} />

					</motion.div>
				)
			}


		</>
	)
}
