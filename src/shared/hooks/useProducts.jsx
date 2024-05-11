import { useState } from 'react'
import { getProductsWithParams } from '../services/estructuras'

export function useProducts ({ params, initialProducts }) {
  const [responseProducts, setResponseProducts] = useState(initialProducts)
  const getProducts = async () => {
    const products = await getProductsWithParams({ params })
    setResponseProducts(products)
  }

  const products = responseProducts?.products || []
  const info = responseProducts?.info || {}

  return { products, info, getProducts }
}
