import { Package2 } from "lucide-react"

import { ALL_SECTIONS } from "@/shared/constants"
import { Button } from "@components/ui/button"
import { navigate } from "astro/virtual-modules/transitions-router.js"

const closeSession = () => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}
	fetch("/api/signout", options).then((res) => {
		if (res.ok) {
			navigate("/login")
		}
	})
}

export const DashboardLayout = ({ url, children }) => {
	const selectedClass =
		"flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
	const unselectedClass =
		"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"

	return (
		<>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden border-r bg-muted/40 md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
							<a href="/" className="flex items-center gap-2 font-semibold">
								<Package2 className="h-6 w-6" />
								<span className="">SolutionEstructuras</span>
							</a>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								{ALL_SECTIONS.map((section) => {
									return (
										<a
											key={section.id}
											href={section.url}
											className={section.url === url ? selectedClass : unselectedClass}
										>
											<section.icon className="h-4 w-4" />
											{section.name}
										</a>
									)
								})}
							</nav>
						</div>
						<div className="grid items-start px-2 pb-3 text-sm  lg:px-4">
							<Button
								onClick={closeSession}
								size="sm"
								variant="secondary"
								className=" mt-auto  w-full"
							>
								Cerrar sesion
							</Button>
						</div>
					</div>
				</div>
				<div className="flex   h-screen  w-full flex-col overflow-hidden ">
					<div className=" flex h-screen flex-1 flex-col overflow-y-auto ">{children}</div>
				</div>
			</div>
		</>
	)
}
