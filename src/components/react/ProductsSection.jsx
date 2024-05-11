import { Input, Select, SelectSection, SelectItem, Image, Pagination } from '@nextui-org/react'

import '@react/ProductsSection.css'
import { SearchIcon } from '@icons/SearchIcon'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MagicMotion } from 'react-magic-motion'
import { GridResponsive } from '@react/GridResponsive'
import { Arrow } from '@react/Arrow'
import { useProducts } from '@/shared/hooks/useProducts'
import { ALL_PARAMS, ALL_SORTS } from '@/shared/constants'
import { useDebouncedCallback } from 'use-debounce'

const HeaderSearch = ({ setSort, handleSearch, inputValue, sortValue }) => {
  return (
    <div className=' flex flex-col sm:flex-row gap-4 mt-12'>
      <Input
        placeholder='Ingrese un texto...'
        radius='full'
        startContent={<SearchIcon />}
        onChange={handleSearch}
        defaultValue={inputValue || ''}
      />
      <Select
        placeholder='Relevancia'
        className=' brand sm:max-w-36  *:text-white  '
        color='primary'
        id='selectItems'
        style={{
          color: 'white'
        }}
        onChange={(e) => { setSort(ALL_SORTS[e.target.value] || ALL_SORTS[0]) }}
        defaultSelectedKeys={sortValue || 0}

      >
        <SelectSection className='brand  text-white' color='primary'>
          {ALL_SORTS.map((sort) => (
            <SelectItem key={sort.id}>
              {sort.name}
            </SelectItem>
          )
          )}
        </SelectSection>
      </Select>
    </div>
  )
}

const CategoryMoreSearched = ({ initialCategories, setCategoriesParams }) => {
  const [categoriesState, setCategoriesState] = useState([...initialCategories])
  const firstRender = useRef(true)

  const sortedCategories =
  [...categoriesState].sort((a, b) => {
    if (a.active && !b.active) {
      return -1
    } else if (!a.active && b.active) {
      return 1
    } else {
      return a.id - b.id
    }
  })

  useEffect(() => {
    const activeCategories = sortedCategories.filter(category => category.active).map(category => category.id).join('-') || ''
    if (activeCategories !== '') {
      const newPage = firstRender.current ? null : 1
      setCategoriesParams({
        categories: activeCategories,
        newPage
      })
      firstRender.current = false
    } else {
      if (!firstRender.current) {
        setCategoriesParams({
          categories: activeCategories,
          page: 1
        })
      }
    }
  }, [categoriesState])

  const toggleClick = ({ id }) => {
    const newCategories = sortedCategories.map(category => {
      if (category.id === id) {
        return {
          ...category,
          active: !category.active
        }
      } else {
        return category
      }
    }
    )

    setCategoriesState(newCategories)
  }

  const activeClass = 'bg-customOrange-500 hover:bg-customOrange-400 text-white  border-customBlue-600'
  const inactiveClass = 'bg-customBlue-600 hover:bg-[#2c1850] text-customOrange-500 border-customOrange-500 '
  return (
    <MagicMotion
      transition={{
        duration: 0.3
      }}
    >
      <ul className=' place-self-center place-items-center place-content-center placecenter  mt-4 gap-2 grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))]   '>

        {
                    sortedCategories.map((category) => (
                      <li key={category.id} className=' relative w-full'>
                        <button onClick={() => { toggleClick({ id: category?.id }) }} className={` ${category?.active ? activeClass : inactiveClass} border truncate w-full px-4 py-1 rounded-xl  transition-all  `}>
                          {category.name}
                          {
                                    category?.active && (

                                      <div className=' -right-1  h-full  top-0 absolute flex justify-center items-center'>
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          key={category.id}
                                          className='  size-5 pb-[2px] bg-customBlue-600 flex justify-center  items-center leading-[1px] rounded-full border border-customOrange-500 text-customOrange-500'
                                        >
                                          ×
                                        </motion.div>
                                      </div>

                                    )
                                }
                        </button>
                      </li>
                    ))

                }

      </ul>
    </MagicMotion>

  )
}

const ProductCard = ({ id, shortName, imageUrl, price, index }) => {
  const errorImage = '/images/errorImage.png'

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      key={id}
      className='w-full flex flex-col pb-4 pt-3  hover:-translate-y-1 transition-all   border  border-transparent hover:border-customOrange-500 relative   h-full max-w-44  overflow-hidden rounded-[20px] bg-white'
    >
      <a id='productImage' className=' mx-auto size-[150px]' href={`/productos/${id}`}>
        <Image width={150} height={150} src={imageUrl || errorImage} className=' rounded-3xl size-[150px] object-cover  ' />
      </a>
      <p className=' ml-3 leading-4 mt-1'>{shortName}</p>
      <p className='text-sm ml-3 mt-1 text-gray-500  leading-4 '>Desde {price}₲ </p>
      <a
        id='linkToProduct'
        className='bg-customOrange-500  hover:bg-customOrange-300   absolute  z-30  -bottom-7 rotate-90 -right-[1.2rem] transition-all hover:scale-110 rounded-tl-[30px] rounded-bl-[35px] p-4 flex items-end rounded-br-[30px] size-[70px]'
        href={`/productos/${id}`}
      >
        <Arrow />
      </a>
    </motion.article>
  )
}

const ProductsDisplay = ({ products }) => {
  return (
    <div className=' mt-4 w-full '>
      <GridResponsive size='large'>
        {products?.map((product, i) => (
          <li key={i} className=' w-full  transition-all h-full flex justify-center items-center'>
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
    <div className=' mt-8 relative overflow-hidden flex  justify-center items-center text-white  p-12 bg-customBlue-600 rounded-xl border border-customBlue-500'>
      <div className=' w-full flex justify-center flex-col max-w-72 text-2xl'>
        <h1 className=' font-light '>Ningún resultado para </h1>
        <span className=' font-medium text-customOrange-400 truncate'>"{search}"</span>
        <p className=' font-medium leading-6 mt-2 text-3xl'>Intenta de nuevo con otro término.</p>
      </div>
      <motion.img
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        src='/images/arrow404.png' className=' w-32 h-auto ' alt=''
      />
    </div>
  )
}

export const ProductsSection = ({ initialCategories, initialParams, initialProducts }) => {
  const [params, setParams] = useState(initialParams)

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)

    if (params.search === '') {
      currentParams.delete(ALL_PARAMS.search)
    } else if (params.search) {
      currentParams.set(ALL_PARAMS.search, params.search)
    }

    if (params.sortID === 0) {
      currentParams.delete(ALL_PARAMS.sortID)
    } else if (params.sortID) {
      currentParams.set(ALL_PARAMS.sortID, params.sortID)
    }

    if (params.categories === '') {
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
      window.history.pushState({}, '', newUrl)
    }

    searchDebounced()
  }, [params])

  // metodos para setear
  const setSort = (sort) => {
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        sortID: sort.id
      }
      return newParams
    })
  }

  const setSearch = (value) => {
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        search: value,
        page: 1
      }

      return newParams
    })
  }

  const setCategories = ({ categories, newPage }) => {
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        categories,
        page: newPage || 1
      }
      return newParams
    })
  }
  const setPage = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        page
      }
      return newParams
    })
  }

  const initialCategoriesActives = initialCategories.map(category => ({
    ...category,
    active: initialParams?.categories?.split('-').includes(category.id.toString())
  }))

  const { products, getProducts, info } = useProducts({
    initialProducts,
    params
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
      <HeaderSearch setSort={setSort} handleSearch={handleSearch} inputValue={initialParams?.search} sortValue={initialParams?.sortID} />
      <CategoryMoreSearched setCategoriesParams={setCategories} initialCategories={initialCategoriesActives} />
      <div className=' h-full  flex flex-col justify-center  items-center'>
        <ProductsDisplay products={products} />
        {
          info?.totalPages === 0 && (
            <NotFound
              search={params?.search}
            />
          )
        }
        <MagicMotion>
          <div className={` w-full ${info?.totalPages > 0 ? 'flex' : 'hidden'}   justify-center items-center py-6`}>

            <Pagination
              classNames={
                {
                  item: '  hover:bg-customOrange-500',
                  cursor: 'bg-customOrange-500   text-white'
                }
              }
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
