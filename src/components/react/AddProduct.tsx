import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
	ChevronLeft,
	Upload
} from "lucide-react"
import { useRef, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"



export const AddProduct = ({ categorias, setAddProduct, setProductArrow }: {
	setAddProduct: (arg0: boolean) => void,
	categorias: any,
	setProductArrow: (arg0: any) => void
}) => {

	const [deleteImage, setDeleteImage] = useState(null)


	//refs	para el formulario
	const inputName = useRef<HTMLInputElement>(null)
	const inputShortName = useRef<HTMLInputElement>(null)
	const inputPrice = useRef<HTMLInputElement>(null)
	const inputDescription = useRef<HTMLTextAreaElement>(null)
	const statusSelect = useRef('Activo')
	const categoriaSelect = useRef(null)
	const inputSku = useRef<HTMLInputElement>(null)

	const [productImages, setProductImages] = useState({
		imageB64: null,
		imageB64_2: null,
		imageB64_3: null
	}
	)

	const handleSave = async () => {

		const name = inputName.current.value
		const shortName = inputShortName.current.value
		const price = parseFloat(inputPrice.current.value)
		const description = inputDescription.current.value
		const status = statusSelect.current
		const categoryId = categoriaSelect.current
		const sku = inputSku.current.value
		const imageB64 = productImages.imageB64
		const imageB64_2 = productImages.imageB64_2
		const imageB64_3 = productImages.imageB64_3

		const newProduct = {
			name,
			shortName,
			price,
			description,
			status,
			categoryId,
			sku,
			imageB64,
			imageB64_2,
			imageB64_3
		}

		// las imagenes son de tipo s
		const formData = new FormData()
		formData.append("name", newProduct.name)
		formData.append("shortName", newProduct.shortName)
		formData.append("price", newProduct.price.toString())
		formData.append("description", newProduct.description)
		formData.append("status", newProduct.status)
		formData.append("categoryId", newProduct.categoryId?.toString() || null)
		formData.append("imageB64", newProduct.imageB64 || undefined)
		formData.append("imageB64_2", newProduct.imageB64_2 || undefined)
		formData.append("imageB64_3", newProduct.imageB64_3 || undefined)
		formData.append("sku", newProduct.sku)

		const create = async ({ formData }) => {
			try {
				const res = await fetch("/api/productos/create", {
					method: "POST",
					body: formData
				})

				if (!res.ok) {
					throw new Error(`Error al agregar el producto.`);
				}

				const data = await res.json();

				setProductArrow((prev: any) => [...prev, data.product])

				setAddProduct(false)
			}
			catch (error) {
				throw new Error(`Error al agregar el producto.`);
			}
		}

		toast.promise(create({ formData }), {
			loading: "Creando producto...",
			success: "Producto creado.",
			error: "Error al crear el producto."
		})

	}

	const handleDeleteButton = async () => {

		const newProductImages = {
			...productImages,
			[deleteImage]: null
		}

		const images = Object.values(newProductImages)
		const imagesWithOutNull = images.filter((image) => image !== null)

		const finalImages = {
			imageB64: imagesWithOutNull[0] || null,
			imageB64_2: imagesWithOutNull[1] || null,
			imageB64_3: imagesWithOutNull[2] || null
		}

		setProductImages(finalImages)

		setDeleteImage(null)

	}

	const handleButtonImage = (key: string) => {

		if (productImages[key]) {
			setDeleteImage(key)
		}
		else {

			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = async (e) => {
				const file = (e.target as HTMLInputElement).files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					setProductImages((prev) => ({
						...prev,
						[key]: e.target.result
					}))
				}
				reader.readAsDataURL(file);
			}
			input.click();

		}

	}



	return (
		<>

			<Dialog open={deleteImage !== null} onOpenChange={
				() => {
					setDeleteImage(null)
				}
			}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Eliminar Imagen</DialogTitle>
						<DialogDescription>
							¿Deseas eliminar la imagen?
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button onClick={
							() => {
								setDeleteImage(null)
							}
						} variant="secondary" >Cancelar</Button>
						<Button
							onClick={
								() => {
									handleDeleteButton()
								}
							}
							variant="secondary" >Eliminar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>


			<div className=" h-full w-full overflow-hidden p-6 gap-6 flex flex-col">
				<div className="flex items-center gap-4">
					<Button
						onClick={
							() => {
								if (
									inputName.current.value === "" ||
									inputShortName.current.value === "" ||
									inputPrice.current.value === "" ||
									inputDescription.current.value === "" ||
									statusSelect.current === "Active" ||
									categoriaSelect.current === null
								) {
									setAddProduct(false)
								}
								else {
									// show a toast
								}
							}
						}
						variant="outline" size="icon" className="h-7 w-7">
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Atras</span>
					</Button>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Agregar un producto
					</h1>

					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Button

							variant="outline" size="sm">
							Descartar
						</Button>
						<Button
							onClick={
								handleSave
							}
							size="sm">Guardar</Button>
					</div>
				</div>
				<div className=" flex gap-6">
					<Card x-chunk="dashboard-07-chunk-0" className=" flex-1">
						<CardHeader>
							<CardTitle>Editar configuraciones.</CardTitle>
							<CardDescription>
								Edita la información del producto y su estado, así como las imágenes.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className=" flex gap-3">
									<div className=" gap-3 grid flex-1">
										<Label htmlFor="name">Nombre</Label>
										<Input
											id="name"
											type="text"
											className="w-full"
											autoComplete="off"
											ref={inputName}
										/>
									</div>
									<div className=" gap-3 grid">
										<Label htmlFor="name">Nombre corto</Label>
										<Input
											id="name"
											type="text"
											className="w-full"
											autoComplete="off"
											ref={inputShortName}
										/>
									</div>
								</div>
								<div className=" flex w-full gap-3">
									<div className=" gap-3 grid flex-1">
										<Label htmlFor="sku">Sku</Label>
										<Input
											id="sku"
											type="text"
											className="w-full"
											autoComplete="off"
											ref={inputSku}
										/>
									</div>
									<div className=" grid gap-3">
										<Label htmlFor="price">Precio</Label>
										<Input
											id="price"
											type="number"
											className="w-full"
											autoComplete="off"
											ref={inputPrice}
										/>

									</div>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										className="min-h-32"
										autoComplete="off"
										ref={inputDescription}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
					<div className=" flex flex-col gap-4">
						<Card x-chunk="dashboard-07-chunk-3" className=" h-min">
							<CardHeader>
								<CardTitle>Estado del Producto</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="status">Status</Label>
										<Select onValueChange={
											(value) => {
												statusSelect.current = value
											}
										} defaultValue='Activo'
										>
											<SelectTrigger id="status" aria-label="Seleccionar Estado">
												<SelectValue placeholder="Selecciona un estado" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Activo">Activo</SelectItem>
												<SelectItem value="Inactivo">Inactivo</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-07-chunk-3" className=" pt-5 h-min">

							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="status">Categoria</Label>
										<Select
											defaultValue={null}
											onValueChange={
												(value) => {
													categoriaSelect.current = value
												}
											}
										>
											<SelectTrigger id="status" aria-label="Seleccionar una categoria">
												<SelectValue placeholder="Selecciona una categoria" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={null}>Sin categoria</SelectItem>

												{
													categorias.map((categoria: { id: { toString: () => string }; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal }, index: Key) => {
														return (
															<SelectItem key={index} value={categoria?.id.toString()}>{categoria.name}</SelectItem>
														)
													})
												}
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-07-chunk-3" className=" flex-1">
							<CardHeader>
								<CardTitle>Imagenes del producto</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">

									<div className="grid grid-cols-3 gap-2">
										{
											Object.keys(productImages).map((key, index) => {
												return (
													<button
														key={index}
														onClick={
															() => {
																handleButtonImage(key)
															}
														}
														className="flex aspect-square size-20 w-full items-center justify-center rounded-md border border-dashed">
														{
															productImages[key] ? (
																<img src={productImages[key]} alt="product" className="w-full h-full object-cover rounded-md" />
															) : (
																<>
																	<Upload className="h-4 w-4 text-muted-foreground" />
																	<span className="sr-only">Upload</span>
																</>
															)
														}
													</button>
												)
											})
										}

									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>

	)
}