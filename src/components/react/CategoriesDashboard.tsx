import { Trash, TriangleAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"


export const CategoriesDashboard = () => {
	const [deleteCategory, setDeleteCategory] = useState(null)
	const [renameCategory, setRenameCategory] = useState(null)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		fetch("/api/categorias").then((res) => res.json()).then((data) => {
			setCategories(data.categories)
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		formData.get("name")
		const promise = fetch("/api/categorias/create", {
			method: "POST",
			body: formData
		}).then((res) => res.json()).then((data) => {
			if (data.error) {
				throw new Error(data.error)
			}
			setCategories([...categories, data?.category])
		})

		toast.promise(
			promise, {
			loading: "Agregando categoria",
			success: "Categoria agregada",
			error: "No se pudo agregar la categoria"
		}
		)
	}

	const handleDeleteCategory = () => {
		const formData = new FormData()
		formData.append("id", deleteCategory.id)

		const promise = fetch("/api/categorias/delete", {
			method: "POST",
			body: formData
		}).then((res) => res.json()).then((data) => {
			if (data.error) {
				setDeleteCategory(null)
				throw new Error(data.error)
			}
			setCategories(categories.filter((c) => c.id !== deleteCategory.id))
			setDeleteCategory(null)
		})

		toast.promise(
			promise, {
			loading: "Eliminando categoria",
			success: "Categoria eliminada",
			error: "No se pudo eliminar la categoria"
		}
		)

	}

	const handleRenameCategory = () => {
		const formData = new FormData()
		formData.append("id", renameCategory.id)
		formData.append("name", renameCategory.name)
		const promise = fetch("/api/categorias/update", {
			method: "POST",
			body: formData
		}).then((res) => res.json()).then((data) => {
			if (data.error) {
				setRenameCategory(null)
				throw new Error(data.error)
			}
			setCategories(categories.map((c) => {
				if (c.id === renameCategory.id) {
					return data.category
				}
				return c
			}))
			setRenameCategory(null)
		})

		toast.promise(
			promise, {
			loading: "Renombrando categoria",
			success: "Categoria renombrada",
			error: "No se pudo renombrar la categoria"
		}
		)
	}

	return (
		<>
			<Toaster />

			<Dialog open={renameCategory !== null} onOpenChange={
				() => {
					setRenameCategory(null)
				}
			}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="">
						<DialogTitle>¿Renombrar esta categoria? </DialogTitle>

					</DialogHeader>
					<Input
						id="name"
						name="name"
						type="text"
						autoComplete="off"
						value={renameCategory?.name}
						onChange={
							(e) => setRenameCategory((prev) => ({ ...prev, name: e.target.value }))
						}
					>

					</Input>
					<DialogFooter className=" flex-col  flex">
						<Button onClick={
							() => {
								setRenameCategory(null)
							}
						} variant="outline" className=" w-full" >Cancelar</Button>
						<Button
							onClick={
								() => {
									handleRenameCategory()
								}
							}
							variant="outline" className=" w-full" >Renombrar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>



			<Dialog open={deleteCategory !== null} onOpenChange={
				() => {
					setDeleteCategory(null)
				}
			}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="">
						<DialogTitle>¿Eliminar esta categoria? </DialogTitle>
						<div>
							<p className="text-muted-foreground  mt-2">Estas a punto de eliminar la categoria <strong>{deleteCategory?.name}</strong></p>
						</div>
					</DialogHeader>

					<div className=" flex flex-col gap-3  justify-center items-center py-3 rounded-lg  border-red-600/40 text-base border-[0.5px] bg-danger-50/40 p-3 text-center">
						<div className=" flex gap-3">
							<TriangleAlert className=" size-5 text-red-600" />
							Cosas malas sucederan si no lees esto.
						</div>
						<p className=" text-red-500 text-sm">
							Todos los productos que pertenezcan a esta categoria quedaran sin categoria.
						</p>
					</div>

					<DialogFooter className=" flex-col  flex">
						<Button onClick={
							() => {
								setDeleteCategory(null)
							}
						} variant="outline" className=" w-full" >Cancelar</Button>
						<Button
							onClick={
								() => {
									handleDeleteCategory()
								}
							}
							variant="outline" className=" w-full" >Eliminar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<div className="space-y-6 p-6">
				<div>
					<h3 className="text-lg font-medium">Categorias</h3>
					<p className="text-sm text-muted-foreground">
						Todas las modificaciones a las categorias se verán reflejadas en los productos actuales.
					</p>
				</div>
				<form onSubmit={handleSubmit} className=" flex gap-2 ">
					<Input
						id="name"
						name="name"
						type="text"
						autoComplete="off"
						placeholder="Nombre de la categoria"
					>
					</Input>
					<Button>
						Agregar
					</Button>
				</form>
				<div className=" flex-1 flex flex-col border rounded-xl overflow-hidden ">

					{
						categories.map((category) => {
							return (
								<div key={category.id} className="flex last:border-0 hover:bg-muted/30 bg-transparent transition-colors py-2 px-5 border-b items-center justify-between ">
									<div className="flex items-center">
										<p >{category.name}</p>
									</div>
									<div className="flex  gap-2 items-center text-muted-foreground">
										<Button
											onClick={
												() => {
													setRenameCategory(category)
												}
											}
											size="sm" variant="outline">
											Renombrar
										</Button>
										<Button
											onClick={
												() => {
													setDeleteCategory(category)
												}
											}
											variant="outline" className=" h-9 px-0 w-9" size="sm" >
											<Trash className=" size-4 " />
										</Button>
									</div>
								</div>
							)
						}
						)
					}

				</div>
			</div>


		</>

	)
}