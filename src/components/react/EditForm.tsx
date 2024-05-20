
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
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
import type { Product, status } from "@/types"
import {
	ChevronLeft,
	Upload
} from "lucide-react"
import { useRef, useState, type Dispatch, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal, type SetStateAction } from "react"
import { toast } from "sonner"



const upload = async (formData: FormData,
	productImages:
		{
			imageUrl: string;
			imageUrl2: string;
			imageUrl3: string
		}, setProductImages: Dispatch<SetStateAction<{ imageUrl: string; imageUrl2: string; imageUrl3: string }>>,
	key: string,
	setProductArrow: (products: Product[]) => void,
	setIsUploading: (boolear: boolean) => void) => {
	try {
		const data = await uploadProductImage(formData, productImages, setProductImages, key, setProductArrow);
		return { success: true, data };
	} catch (error) {
		throw new Error(`Error al subir la imagen: ${error.message}`);
	} finally {
		setIsUploading(false);
	}
};

const uploadProductImage = async (formData: FormData, productImages: { imageUrl: string; imageUrl2: string; imageUrl3: string }, setProductImages: Dispatch<SetStateAction<{ imageUrl: string; imageUrl2: string; imageUrl3: string }>>, key: string, setProductArrow: (products: Product[]) => void) => {
	try {
		const response = await fetch("/api/productos/upload", {
			method: "POST",
			body: formData,
			headers: {
				"Accept": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			}
		});

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		const newProductImages = {
			...productImages,
			[key]: data.url
		};

		const images = Object.values(newProductImages);
		const imagesWithoutNull = images.filter((image) => image !== null);

		const finalImages = {
			imageUrl: imagesWithoutNull[0] || null,
			imageUrl2: imagesWithoutNull[1] || null,
			imageUrl3: imagesWithoutNull[2] || null
		};


		setProductImages(finalImages);

		setProductArrow(
			(prevProducts) => {
				const index = prevProducts.findIndex((product: Product) => product.id === parseInt(formData.get("id") as string));
				const newProducts = [...prevProducts];

				newProducts[index] = {
					...newProducts[index],
					imageUrl: finalImages.imageUrl,
					imageUrl2: finalImages.imageUrl2,
					imageUrl3: finalImages.imageUrl3
				};
				return newProducts;
			}
		)

		return data;
	} catch (error) {
		throw new Error(`Error al subir la imagen: ${error.message}`);
	}
};



export const EditForm = ({ product, setEditProduct, setProductArrow, categorias }: {
	product: Product,
	setEditProduct: (product: Product) => void,
	setProductArrow: (products: Product[]) => void,
	categorias: any
}) => {

	// usestate
	const [showAlert, setShowAlert] = useState(false)
	const [deleteImage, setDeleteImage] = useState(null)
	const inputName = useRef<HTMLInputElement>(null)
	const inputShortName = useRef<HTMLInputElement>(null)
	const inputPrice = useRef<HTMLInputElement>(null)
	const inputDescription = useRef<HTMLTextAreaElement>(null)
	const statusSelect = useRef(product.status)
	const categoriaSelect = useRef(product.categoryId)
	const inputSku = useRef<HTMLInputElement>(null)

	// usestste
	const [productImages, setProductImages] = useState(
		(() => {
			const images = {
				imageUrl: product.imageUrl,
				imageUrl2: product.imageUrl2,
				imageUrl3: product.imageUrl3
			}

			// verificar nulls
			const imagesWithOutNull =
				Object.values(images).filter((image) => image !== null)

			const finalImages = {
				imageUrl: imagesWithOutNull[0] || null,
				imageUrl2: imagesWithOutNull[1] || null,
				imageUrl3: imagesWithOutNull[2] || null
			}

			return finalImages
		})
	)
	const [isUploading, setIsUploading] = useState(false)


	const handleSave = async () => {

		const name = inputName.current.value
		const shortName = inputShortName.current.value
		const price = parseFloat(inputPrice.current.value)
		const description = inputDescription.current.value
		const status = statusSelect.current
		const categoryId = categoriaSelect.current

		const sku = inputSku.current.value
		const newProduct = {
			...product,
			name,
			shortName,
			price,
			description,
			status,
			categoryId,
			imageUrl: productImages.imageUrl,
			imageUrl2: productImages.imageUrl2,
			imageUrl3: productImages.imageUrl3,
			sku
		}

		setProductArrow((prevProducts: Product[]) => {
			return prevProducts.map((prevProduct: Product) => {
				if (prevProduct.id === newProduct.id) {
					return newProduct;
				}
				return prevProduct;
			});
		});



		// call api to save the product

		const formData = new FormData()
		formData.append("id", newProduct.id.toString())
		formData.append("name", newProduct.name)
		formData.append("shortName", newProduct.shortName)
		formData.append("price", newProduct.price.toString())
		formData.append("description", newProduct.description)
		formData.append("status", newProduct.status)
		formData.append("categoryId", newProduct.categoryId?.toString() || null)

		formData.append("imageUrl", newProduct.imageUrl || undefined)
		formData.append("imageUrl2", newProduct.imageUrl2 || undefined)
		formData.append("imageUrl3", newProduct.imageUrl3 || undefined)
		formData.append("sku", newProduct.sku)

		const promise = fetch("/api/productos/update", {
			method: "POST",
			body: formData
		}).then(
			(response) => {
				if (!response.ok) {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				} else {
					setEditProduct(null)
				}
			}
		)


		toast.promise(promise,
			{
				loading: "Guardando producto...",
				success: "Producto guardado con éxito",
				error: "Error al guardar el producto"
			}
		)




	}

	const handleButtonImage = (key: string) => {

		if (productImages[key]) {
			setDeleteImage(key)
		}
		else {
			handleImageUpload(key)
		}

	}

	const handleDeleteButton = () => {

		const newProductImages = {
			...productImages,
			[deleteImage]: null
		}

		// desplazar las imagenes
		const images = Object.values(newProductImages)
		const imagesWithOutNull = images.filter((image) => image !== null)

		const finalImages = {
			imageUrl: imagesWithOutNull[0] || null,
			imageUrl2: imagesWithOutNull[1] || null,
			imageUrl3: imagesWithOutNull[2] || null
		}

		setProductImages(finalImages)

		const formData = new FormData()
		formData.append("id", product.id.toString())
		formData.append("name", product.name)
		formData.append("shortName", product.shortName)
		formData.append("price", product.price.toString())
		formData.append("description", product.description)
		formData.append("status", product.status)
		formData.append("categoryId", product.categoryId?.toString() || null)
		formData.append("imageUrl", finalImages.imageUrl || undefined)
		formData.append("imageUrl2", finalImages.imageUrl2 || undefined)
		formData.append("imageUrl3", finalImages.imageUrl3 || undefined)
		formData.append("sku", product.sku)

		fetch("/api/productos/update", {
			method: "POST",
			body: formData
		})


		setProductArrow(
			(prevProducts) => {
				const index = prevProducts.findIndex((product: Product) => product.id === parseInt(formData.get("id") as string));
				const newProducts = [...prevProducts];

				newProducts[index] = {
					...newProducts[index],
					imageUrl: finalImages.imageUrl,
					imageUrl2: finalImages.imageUrl2,
					imageUrl3: finalImages.imageUrl3
				};
				return newProducts;
			}
		)



		setDeleteImage(null)

	}

	const handleImageUpload = (key: string) => {

		const input = document.createElement("input")
		input.type = "file"
		input.accept = "image/*"
		input.click()

		input.addEventListener("change", async () => {
			const file = input.files[0]
			const formData = new FormData()
			formData.append("file", file)
			formData.append("key", key)
			formData.append("id", product.id.toString())

			if (!file) {
				return
			}

			if (file.size > 1024 * 1024 * 3) {
				toast.error("La imagen es muy grande")
				return
			}

			if (!file.type.startsWith("image")) {
				toast.error("El archivo no es una imagen")
				return
			}

			setIsUploading(true)
			toast.promise(
				upload(formData, productImages, setProductImages, key, setProductArrow, setIsUploading),
				{
					loading: "Subiendo imagen...",
					success: "Imagen subida con éxito",
					error: "Error al subir la imagen"
				}
			);



		})

	}

	return (
		<>
			<Dialog open={showAlert} onOpenChange={
				() => {
					setShowAlert(false)
				}
			}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Cerrar el producto?</DialogTitle>
						<DialogDescription>
							¿Deseas cerrar el producto sin guardar los cambios?
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button onClick={
							() => {
								setShowAlert(false)
								setEditProduct(null)
							}
						} variant="secondary" >Descartar</Button>
						<Button
							onClick={
								() => {
									setShowAlert(false)
								}
							}
							variant="secondary" >Seguir editando</Button>
						<Button
							onClick={
								() => {
									handleSave()
								}
							}
						>Guardar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

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


			<div className="flex items-center gap-4">
				<Button
					onClick={
						() => {
							if (
								inputName.current.value === product.name &&
								inputShortName.current.value === product.shortName &&
								inputPrice.current.value === product.price.toString() &&
								inputDescription.current.value === product.description &&
								statusSelect.current === product.status &&
								categoriaSelect.current === product.categoryId &&
								inputSku.current.value === product.sku
							) {
								setEditProduct(null)
							}
							else {
								setShowAlert(true)
							}
						}
					}
					variant="outline" size="icon" className="h-7 w-7">
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Atras</span>
				</Button>
				<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					{product.name}
				</h1>

				<div className="hidden items-center gap-2 md:ml-auto md:flex">
					<Button
						onClick={
							() => {
								setShowAlert(true)
							}
						}
						variant="outline" size="sm">
						Descartar
					</Button>
					<Button
						onClick={
							() => {
								handleSave()
							}
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
										defaultValue={product.name}
										ref={inputName}
									/>
								</div>
								<div className=" gap-3 grid">
									<Label htmlFor="name">Nombre corto</Label>
									<Input
										id="name"
										type="text"
										className="w-full"
										defaultValue={product.shortName}
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
										defaultValue={product.sku}
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
										defaultValue={product.price}
									/>

								</div>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									defaultValue={product.description}
									className="min-h-32"
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
									<Select defaultValue={product.status}
										onValueChange={
											(value) => {
												statusSelect.current = value as status
											}
										} >
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
									<Select defaultValue={product?.categoryId?.toString() || null}
										onValueChange={
											(value) => {
												categoriaSelect.current = value ? parseInt(value) : null
											}
										} >
										<SelectTrigger id="status" aria-label="Seleccionar una categoria">
											<SelectValue placeholder="Selecciona una categoria" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value={null}>Sin categoria</SelectItem>

											{
												categorias.map((categoria: { id: { toString: () => string }; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal }, index: Key) => {
													return (
														<SelectItem key={index} value={categoria.id.toString()}>{categoria.name}</SelectItem>
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
													disabled={isUploading}
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



		</>
	)

}