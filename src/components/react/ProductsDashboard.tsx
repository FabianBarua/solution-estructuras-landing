import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { productArrow } from "./Data";

export function ProductsDashboard() {




  return (
    <>

      <DataTable columns={columns} data={productArrow} />


      {/* 

      <div className=" px-6  flex flex-col  overflow-hidden ">
        <ScrollArea className=" border rounded-md">
          <Table className="  ">
              <TableRow>
                <TableHead className="w-[100px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="w-[200px] text-center ">Estado</TableHead>
                <TableHead className="w-[200px] text-center ">Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fakeList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="w-[100px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className=" w-[200px] ">
                    <Badge
                    className=" mx-auto"
                      variant={item.status === allStatus.active ? "primary" : "danger"}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[200px] ">
                    <div className=" h-full w-full flex justify-center items-center flex-col"> 
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <div className=" flex gap-3">
                          <Package className="h-5 w-5" />
                          <span>Ver</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package2 className="h-5 w-5" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users2 className="h-5 w-5" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      */}

      {/* <div className="text-xs p-6 h-[10%] text-muted-foreground">
        Showing <strong>1-10</strong> of <strong>32</strong> products
      </div> */}
    </>
  );
}
