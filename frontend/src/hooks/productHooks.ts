import { useMutation, useQuery } from '@tanstack/react-query'
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

export const useGetProductDetailsByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${id}`)).data,
  })
}

export const useGetProductsByKeywordQuery = (keyword: string) => {
  console.log(keyword)
  if (!keyword) {
    return useGetProductsQuery()
  } else if (keyword === 'all') {
    return useGetProductsQuery()
  }
  return useQuery({
    queryKey: ['products', keyword],
    queryFn: async () => {
      const response = await apiClient.get<Product[]>(
        `api/products/search/${keyword}`
      )
      return response.data
    },
  })
}

export const useCreateProductReviewMutation = () => {
  return useMutation({
    mutationFn: async (review: {
      productId: string
      user: string
      email: string
      rating: number
      comment: string
      createdAt: string
    }) =>
      (
        await apiClient.post<{ message: string }>(
          `api/products/${review.productId}/reviews`,
          review
        )
      ).data,
  })
}

export const useDeleteProductReviewMutation = () => {
  return useMutation({
    mutationFn: async (review: { productId: string; reviewId: string }) =>
      (
        await apiClient.delete<{ message: string }>(
          `api/products/${review.productId}/reviews/${review.reviewId}`
        )
      ).data,
  })
}

export const useEditProductRatingMutation = () => {
  return useMutation({
    mutationFn: async (product: { productId: string; rating: number }) =>
      (
        await apiClient.put<{ message: string }>(
          `api/products/${product.productId}/rating`,
          product
        )
      ).data,
  })
}

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await apiClient.get<[]>(`/api/products/categories`)).data,
  })

export const useGetProductsByCategoryQuery = (category: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const response = await apiClient.get<Product[]>(
        `api/products/category/${category}`
      )
      return response.data
    },
  })
}
