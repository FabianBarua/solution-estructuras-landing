import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@components/ui/scroll-area"
import { PlusCircle, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	setAddProduct: React.Dispatch<React.SetStateAction<boolean>>
}

export function DataTable<TData, TValue>({ columns, data, setAddProduct }: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 15,
	})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: setPagination,
		state: {
			columnFilters,
			pagination,
		},
	})

	return (
		<>
			<header className=" z-30 my-4 flex h-[10%]  items-center gap-4 border-b bg-background px-4  sm:border-0 sm:bg-transparent sm:px-6">
				<Button onClick={
					() => {
						setAddProduct(true)
					}
				} size="sm" className="h-8 gap-1">
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Agregar Producto</span>
				</Button>

				<div className="relative ml-auto flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
						value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
					/>
				</div>
			</header>

			<div className=" flex   h-full  flex-col overflow-hidden  px-6 ">
				<ScrollArea className=" h-full rounded-md border">
					<div className="rounded-md ">
						<Table>
							<TableHeader className=" sticky top-0 bg-background">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup?.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header?.id}>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											)
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row?.id} data-state={row.getIsSelected() && "selected"}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell?.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											Sin resultados.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</ScrollArea>
			</div>

			<div className="flex items-center justify-between  px-6 py-3 text-xs text-muted-foreground">
				<p>
					Showing{" "}
					<strong>
						{pagination.pageIndex + 1} - {table.getPageCount()}{" "}
					</strong>{" "}
					of <strong> {table.getRowCount()} </strong> products
				</p>

				<div className="flex gap-2  ">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Siguiente
					</Button>
				</div>
			</div>
		</>
	)
}
