import { Skeleton } from "@nextui-org/react"
import { useEffect, useState } from "react"

export const FooterCategories = () => {
	const [categories, setCategories] = useState(Array(6).fill({}))

	useEffect(() => {
		fetch("/api/categorias")
			.then((res) => res.json())
			.then((data) => {
				setCategories(data.categories)
			})
	}, [])
	return (
		<>
			{categories.map((category, index) => {
				return (
					<Skeleton
						key={`category-footer-${index}`}
						isLoaded={category.id !== undefined}
						className=" h-6  w-full rounded-lg leading-4"
					>
						<a href={`/productos/?categoria=${category.id}`}>{category.name}</a>
					</Skeleton>
				)
			})}
		</>
	)
}
