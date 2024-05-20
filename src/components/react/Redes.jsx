import { Skeleton } from "@nextui-org/react"
import { useEffect, useState } from "react"

export const Redes = () => {
	const [redes, setRedes] = useState(Array(4).fill({}))

	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (redes[0].id === undefined) {
			fetch("/api/redes")
				.then((res) => res.json())
				.then((data) => {
					const newRedes = [...data.redes].filter((red) => red.actived)
					setRedes(newRedes)
					setIsLoaded(true)
				})
		}
	}, [])

	return (
		<>
			{redes.map((red, index) => {
				return (
					<Skeleton
						key={`redes-${red.id || index}`}
						isLoaded={isLoaded}
						className=" size-8  rounded-full"
					>
						<a
							href={red.url}
							target="_blank"
							className="flex size-8 items-center justify-center rounded-full bg-customOrange-500"
						>
							<img src={red.icon} alt={red.name} className="h-6 w-6" />
						</a>
					</Skeleton>
				)
			})}
		</>
	)
}
