
import { type ColumnDef } from "@tanstack/react-table"

import { type Product } from "@/types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Badge} from "@/components/ui/badge"

export const columns: ColumnDef<Product>[] = [
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
          const product : Product = row.original
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
      id:"photo",
      header:"Foto",
      cell: ({ row }) => {
        const product : Product = row.original
        return (
          <img
            src={product.image}
            alt={product.name}
            className=" size-12 rounded-md"
          />
        )
      },
    },
    {
        id: "actions",
        header: "Editar",
        cell: ({ row }) => {
          const product : Product = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(product.id.toString())}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
