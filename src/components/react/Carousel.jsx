import { Skeleton } from "@nextui-org/react"
import { ProductCard } from "@react/ProductCard"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

export const ProductCarousel = ({
	url = "/api/productos/home?limit=9",
	initialProductsCarousel,
}) => {
	const [initialProducts, setInitialProducts] = useState(
		initialProductsCarousel ||
			Array.from({ length: 5 }, (_, i) => ({
				id: i,
			}))
	)

	const [isLoaded, setIsLoaded] = useState(initialProductsCarousel ? true : false)

	useEffect(() => {
		const fetchInitialProducts = async () => {
			if (initialProductsCarousel) return
			const response = fetch(url)
			const data = await response
			const products = await data.json()
			setInitialProducts(products)
			setIsLoaded(true)
		}

		fetchInitialProducts()
	}, [])

	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
		},
		[Autoplay({ playOnInit: true, delay: 3000 })]
	)

	return (
		<div className=" ">
			<div className=" mask-horizontal  overflow-hidden" ref={emblaRef}>
				<ul className="flex  touch-pan-y [backface-visibility:hidden]">
					{initialProducts?.map(({ id, shortName, imageUrl }) => (
						<Skeleton
							key={id}
							isLoaded={isLoaded}
							className="  mx-2 flex-[0_0_10.5rem] rounded-[34px] brand "
						>
							<li className=" size-[10.5rem]  rounded-[34px]  ">
								<ProductCard id={id} shortName={shortName || ""} imageUrl={imageUrl} />
							</li>
						</Skeleton>
					))}
				</ul>
			</div>
		</div>
	)
}
