import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Product } from '../types/Product'

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>('api/products')).data,
  })
}

export const useGetProductDetailsBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  })
}
