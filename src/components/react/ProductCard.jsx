import { Image } from "@nextui-org/react"

const Arrow = (props) => (
	<svg
		width={21}
		height={20}
		viewBox="0 0 32 31"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M6.183 25.188 25.558 5.813m0 0H11.026m14.532 0v14.53"
			stroke="#fff"
			strokeWidth={3}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export const ProductCard = ({ id, shortName, imageUrl }) => {
	return (
		<article className=" relative size-full overflow-hidden rounded-[34px]">
			<Image src={imageUrl} className="  size-[11.5rem] object-cover" />
			<div className=" absolute bottom-0 left-0 right-0 top-0 z-10 size-full  bg-[linear-gradient(to_top,_var(--tw-gradient-stops)60%)]  from-black/80" />
			<a
				className="absolute -right-[1.2rem] -top-[1.2rem] z-20 flex size-[70px] items-end rounded-bl-[35px] rounded-br-[30px] rounded-tl-[30px] bg-customOrange-500 p-4 transition-all hover:scale-110 hover:bg-customOrange-400"
				href={`/productos/${id}`}
			>
				<Arrow />
			</a>

			<a
				href={`/productos/${id}`}
				className="text-md absolute bottom-4 left-1/2 z-20 flex w-[80%] -translate-x-1/2 items-center justify-center gap-1 rounded-xl bg-customBlue-500 px-2 py-1 text-center text-white transition-all hover:scale-105 hover:bg-customBlue-400"
			>
				<span>¿</span>
				<h3 className="truncate">{shortName}</h3>
				<span>?</span>
			</a>
		</article>
	)
}
