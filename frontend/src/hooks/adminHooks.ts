import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { User } from '../types/User'
import { Order } from '../types/Order'
import { Review } from '../types/Product'

export const useAdminGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => (await apiClient.get<User[]>('api/admin/users')).data,
  })
}

export const useAdminGetOrdersQuery = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () =>
      (await apiClient.get<Order[]>('api/admin/orders')).data,
  })
}

export const useDeleteUserByIDMutation = () => {
  return useMutation({
    mutationFn: async (userId: string) =>
      (
        await apiClient.delete<{ message: string }>(
          `api/admin/users/${userId}/delete`
        )
      ).data,
  })
}

export const useDeliverOrderMutation = () => {
  return useMutation({
    mutationFn: async (orderId: string) =>
      (
        await apiClient.put<{ message: string }>(
          `api/admin/orderlist/${orderId}/deliver`
        )
      ).data,
  })
}

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: async (product: {
      name: string
      slug: string
      price: number | string
      description: string
      images: File[]
      brand: string
      category: string
      rating: number
      countInStock: number | string
      numReviews: number
      reviews: Review[]
    }) => {
      try {
        const formData = new FormData()

        // Append each image as a file to the FormData
        product.images.forEach((image) => {
          formData.append('images', image)
        })

        // Append other fields to the FormData
        formData.append('name', product.name)
        formData.append('slug', product.slug)
        formData.append('price', product.price.toString())
        formData.append('description', product.description)
        formData.append('brand', product.brand)
        formData.append('category', product.category)
        formData.append('rating', product.rating.toString())
        formData.append('countInStock', product.countInStock.toString())
        formData.append('numReviews', product.numReviews.toString())

        // Send the FormData to the backend
        const response = await apiClient.post<{ message: string }>(
          `api/admin/products/create`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the correct content type
            },
          }
        )

        return response.data
      } catch (error) {
        console.error('Error creating product:', error)
        throw new Error('Failed to create product')
      }
    },
  })
}

export const useEditProductMutation = () => {
  return useMutation({
    mutationFn: async (product: {
      _id: string
      name: string
      price: number
      description: string
      images: string[]
      brand: string
      category: string
      countInStock: number
    }) =>
      (
        await apiClient.put<{ message: string }>(
          `api/admin/products/${product._id}/edit`,
          product
        )
      ).data,
  })
}

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: async (productId: string) =>
      await apiClient.delete<{ message: string }>(
        `api/admin/products/${productId}/delete`
      ),
  })
}

export const useAdminGetUserOrderHistoryQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId, 'orders'],
    queryFn: async () =>
      (await apiClient.get<Order[]>(`api/admin/users/${userId}/orders`)).data,
  })
}
