import { type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Product } from "@/types"
import { MoreHorizontal } from "lucide-react"

export const columns = (setEdit: any, setDeleteProduct: any): ColumnDef<Product>[] => {

	return (
		[
			{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "name",
				header: "Nombre",
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => {
					const product: Product = row.original
					return (
						<Badge variant={product.status === "Activo" ? "default" : "secondary"}>
							{product.status}
						</Badge>
					)
				},
			},
			{
				accessorKey: "price",
				header: "Precio",
			},
			{
				id: "photo",
				header: "Foto",
				cell: ({ row }) => {
					const product: Product = row.original
					return <img src={product.imageUrl} alt={product.name} className=" size-12 rounded-md" />
				},
			},
			{
				id: "actions",
				header: "Editar",
				cell: ({ row }) => {
					const product: Product = row.original

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Acciones</DropdownMenuLabel>
								<DropdownMenuItem onClick={
									() => {
										setEdit(product)
									}
								}>
									Editar
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={
										() => {
											setDeleteProduct(product)
										}
									}
								>
									Eliminar
								</DropdownMenuItem>

								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<a target="hblank" href={`/productos/${product?.id}`}>Ver producto</a>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				},
			},
		]
	)

}