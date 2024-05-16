export const GridResponsive = ({ children, size, gap }) => {
	const ALL_SIZES = {
		small: "8rem",
		medium: "10rem",
	}

	const newSize = ALL_SIZES[size] || ALL_SIZES.medium

	return (
		<ul
			style={{
				gridTemplateColumns: `repeat(auto-fit, minmax(${newSize}, 1fr))`,
				gap: gap || "0.5rem",
			}}
			className="grid w-full place-items-center "
		>
			{children}
		</ul>
	)
}
