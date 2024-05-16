import { Input, Select, SelectSection, SelectItem, Image, Pagination } from "@nextui-org/react"

import "@react/ProductsSection.css"
import { SearchIcon } from "@icons/SearchIcon"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { MagicMotion } from "react-magic-motion"
import { GridResponsive } from "@react/GridResponsive"
import { Arrow } from "@react/Arrow"
import { useProducts } from "@/shared/hooks/useProducts"
import { ALL_PARAMS, ALL_SORTS } from "@/shared/constants"
import { useDebouncedCallback } from "use-debounce"

const HeaderSearch = ({ setSort, handleSearch, inputValue, sortValue }) => {
	return (
		<div className=" mt-12 flex flex-col gap-4 sm:flex-row">
			<Input
				placeholder="Ingrese un texto..."
				radius="full"
				startContent={<SearchIcon />}
				onChange={handleSearch}
				defaultValue={inputValue || ""}
			/>
			<Select
				placeholder="Relevancia"
				className=" brand *:text-white  sm:max-w-36  "
				color="primary"
				id="selectItems"
				style={{
					color: "white",
				}}
				onChange={(e) => {
					setSort(ALL_SORTS[e.target.value] || ALL_SORTS[0])
				}}
				defaultSelectedKeys={sortValue || 0}
			>
				<SelectSection className="text-white  brand" color="primary">
					{ALL_SORTS.map((sort) => (
						<SelectItem key={sort.id}>{sort.name}</SelectItem>
					))}
				</SelectSection>
			</Select>
		</div>
	)
}

const CategoryMoreSearched = ({ initialCategories, setCategoriesParams }) => {
	const [categoriesState, setCategoriesState] = useState([...initialCategories])
	const firstRender = useRef(true)

	const sortedCategories = [...categoriesState].sort((a, b) => {
		if (a.active && !b.active) {
			return -1
		} else if (!a.active && b.active) {
			return 1
		} else {
			return a.id - b.id
		}
	})

	useEffect(() => {
		const activeCategories =
			sortedCategories
				.filter((category) => category.active)
				.map((category) => category.id)
				.join("-") || ""
		if (activeCategories !== "") {
			const newPage = firstRender.current ? null : 1
			setCategoriesParams({
				categories: activeCategories,
				newPage,
			})
			firstRender.current = false
		} else {
			if (!firstRender.current) {
				setCategoriesParams({
					categories: activeCategories,
					page: 1,
				})
			}
		}
	}, [categoriesState])

	const toggleClick = ({ id }) => {
		const newCategories = sortedCategories.map((category) => {
			if (category.id === id) {
				return {
					...category,
					active: !category.active,
				}
			} else {
				return category
			}
		})

		setCategoriesState(newCategories)
	}

	const activeClass =
		"bg-customOrange-500 hover:bg-customOrange-400 text-white  border-customBlue-600"
	const inactiveClass =
		"bg-customBlue-600 hover:bg-[#2c1850] text-customOrange-500 border-customOrange-500 "
	return (
		<MagicMotion
			transition={{
				duration: 0.3,
			}}
		>
			<ul className=" placecenter mt-4 grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))]  place-content-center place-items-center gap-2 place-self-center   ">
				{sortedCategories.map((category) => (
					<li key={category.id} className=" relative w-full">
						<button
							onClick={() => {
								toggleClick({ id: category?.id })
							}}
							className={` ${category?.active ? activeClass : inactiveClass} w-full truncate rounded-xl border px-4 py-1  transition-all  `}
						>
							{category.name}
							{category?.active && (
								<div className=" absolute  -right-1  top-0 flex h-full items-center justify-center">
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										key={category.id}
										className="  flex size-5 items-center justify-center rounded-full  border border-customOrange-500 bg-customBlue-600 pb-[2px] leading-[1px] text-customOrange-500"
									>
										×
									</motion.div>
								</div>
							)}
						</button>
					</li>
				))}
			</ul>
		</MagicMotion>
	)
}

const ProductCard = ({ id, shortName, imageUrl, price, index }) => {
	const errorImage = "/images/errorImage.png"

	return (
		<motion.article
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.3, delay: index * 0.05 }}
			key={id}
			className="relative flex h-full w-full max-w-44  flex-col overflow-hidden   rounded-[20px]  border border-transparent bg-white   pb-4 pt-3  transition-all hover:-translate-y-1 hover:border-customOrange-500"
		>
			<a id="productImage" className=" mx-auto size-[150px]" href={`/productos/${id}`}>
				<Image
					width={150}
					height={150}
					src={imageUrl || errorImage}
					className=" size-[150px] rounded-3xl object-cover  "
				/>
			</a>
			<p className=" ml-3 mt-1 leading-4">{shortName}</p>
			<p className="ml-3 mt-1 text-sm leading-4  text-gray-500 ">Desde {price}₲ </p>
			<a
				id="linkToProduct"
				className="absolute  -bottom-7   -right-[1.2rem]  z-30  flex size-[70px] rotate-90 items-end rounded-bl-[35px] rounded-br-[30px] rounded-tl-[30px] bg-customOrange-500 p-4 transition-all hover:scale-110 hover:bg-customOrange-300"
				href={`/productos/${id}`}
			>
				<Arrow />
			</a>
		</motion.article>
	)
}

const ProductsDisplay = ({ products }) => {
	return (
		<div className=" mt-4 w-full ">
			<GridResponsive size="large">
				{products?.map((product, i) => (
					<li key={i} className=" flex  h-full w-full items-center justify-center transition-all">
						<ProductCard
							index={i + 1}
							id={product.id}
							shortName={product.shortName}
							imageUrl={product.imageUrl}
							price={product.price}
						/>
					</li>
				))}
			</GridResponsive>
		</div>
	)
}
const NotFound = ({ search }) => {
	return (
		<div className=" relative mt-8 flex items-center  justify-center overflow-hidden rounded-xl  border border-customBlue-500 bg-customBlue-600 p-12 text-white">
			<div className=" flex w-full max-w-72 flex-col justify-center text-2xl">
				<h1 className=" font-light ">Ningún resultado para </h1>
				<span className=" truncate font-medium text-customOrange-400">"{search}"</span>
				<p className=" mt-2 text-3xl font-medium leading-6">Intenta de nuevo con otro término.</p>
			</div>
			<motion.img
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.3 }}
				src="/images/arrow404.png"
				className=" h-auto w-32 "
				alt=""
			/>
		</div>
	)
}

export const ProductsSection = ({ initialCategories, initialParams, initialProducts }) => {
	const [params, setParams] = useState(initialParams)

	useEffect(() => {
		const currentParams = new URLSearchParams(window.location.search)

		if (params.search === "") {
			currentParams.delete(ALL_PARAMS.search)
		} else if (params.search) {
			currentParams.set(ALL_PARAMS.search, params.search)
		}

		if (params.sortID === 0) {
			currentParams.delete(ALL_PARAMS.sortID)
		} else if (params.sortID) {
			currentParams.set(ALL_PARAMS.sortID, params.sortID)
		}

		if (params.categories === "") {
			currentParams.delete(ALL_PARAMS.categories)
		} else if (params.categories) {
			currentParams.set(ALL_PARAMS.categories, params.categories)
		}

		if (params.page === 1) {
			currentParams.delete(ALL_PARAMS.page)
		} else if (params.page > 1) {
			currentParams.set(ALL_PARAMS.page, params.page)
		}

		const newUrl = `${window.location.pathname}?${currentParams.toString()}`

		if (window.location.search !== currentParams.toString()) {
			window.history.pushState({}, "", newUrl)
		}

		searchDebounced()
	}, [params])

	// metodos para setear
	const setSort = (sort) => {
		setParams((prevParams) => {
			const newParams = {
				...prevParams,
				sortID: sort.id,
			}
			return newParams
		})
	}

	const setSearch = (value) => {
		setParams((prevParams) => {
			const newParams = {
				...prevParams,
				search: value,
				page: 1,
			}

			return newParams
		})
	}

	const setCategories = ({ categories, newPage }) => {
		setParams((prevParams) => {
			const newParams = {
				...prevParams,
				categories,
				page: newPage || 1,
			}
			return newParams
		})
	}
	const setPage = (page) => {
		window.scrollTo({ top: 0, behavior: "smooth" })
		setParams((prevParams) => {
			const newParams = {
				...prevParams,
				page,
			}
			return newParams
		})
	}

	const initialCategoriesActives = initialCategories.map((category) => ({
		...category,
		active: initialParams?.categories?.split("-").includes(category.id.toString()),
	}))

	const { products, getProducts, info } = useProducts({
		initialProducts,
		params,
	})

	const searchDebounced = useDebouncedCallback(() => {
		getProducts({ params })
	}, 500)

	const handleSearch = (event) => {
		const value = event.target.value
		setSearch(value)
	}

	return (
		<>
			<HeaderSearch
				setSort={setSort}
				handleSearch={handleSearch}
				inputValue={initialParams?.search}
				sortValue={initialParams?.sortID}
			/>
			<CategoryMoreSearched
				setCategoriesParams={setCategories}
				initialCategories={initialCategoriesActives}
			/>
			<div className=" flex  h-full flex-col items-center  justify-center">
				<ProductsDisplay products={products} />
				{info?.totalPages === 0 && <NotFound search={params?.search} />}
				<MagicMotion>
					<div
						className={` w-full ${info?.totalPages > 0 ? "flex" : "hidden"}   items-center justify-center py-6`}
					>
						<Pagination
							classNames={{
								item: "  hover:bg-customOrange-500",
								cursor: "bg-customOrange-500   text-white",
							}}
							loop
							boundaries={3}
							showControls
							total={info.totalPages}
							onChange={setPage}
							initialPage={info.currentPage}
							page={info.currentPage}
						/>
					</div>
				</MagicMotion>
			</div>
		</>
	)
}
