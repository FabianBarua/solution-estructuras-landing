import { useState } from "react"

export const NavMenu = () => {
	const [showMenu, setShowMenu] = useState(false)
	const toggleMenu = () => setShowMenu(!showMenu)

	return (
		<>
			<div className=" relative h-full">
				<button className=" sm:hidden" onClick={toggleMenu}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="lucide lucide-menu"
						viewBox="0 0 24 24"
					>
						<path d="M4 12L20 12"></path>
						<path d="M4 6L20 6"></path>
						<path d="M4 18L20 18"></path>
					</svg>
				</button>
				<ul
					className={`${showMenu === true ? "absolute" : "hidden"}  right-full top-full flex flex-col gap-2 rounded-lg  bg-customOrange-600 p-3 sm:flex sm:flex-row sm:bg-transparent sm:p-0 `}
				>
					<a
						href="/#sobre-nosotros"
						className="rounded-lg bg-transparent transition-all hover:bg-customOrange-700"
					>
						<li className="px-2">Sobre</li>
					</a>
					<a
						href="/productos"
						className="rounded-lg bg-transparent transition-all hover:bg-customOrange-700"
					>
						<li className="px-2">Productos</li>
					</a>
					<a
						href="/#contacto"
						className="rounded-lg bg-transparent transition-all hover:bg-customOrange-700"
					>
						<li className="px-2">Contacto</li>
					</a>
				</ul>
			</div>
		</>
	)
}
