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
        const dataToSend = new FormData()

        // Iterate over the images from the product and append to the FormData instance
        product.images.forEach((image: File) => {
          dataToSend.append('images', image)
        })

        // Append other fields to the FormData
        dataToSend.append('name', product.name)
        dataToSend.append('slug', product.slug)
        dataToSend.append('price', product.price.toString())
        dataToSend.append('description', product.description)
        dataToSend.append('brand', product.brand)
        dataToSend.append('category', product.category)
        dataToSend.append('rating', product.rating.toString())
        dataToSend.append('countInStock', product.countInStock.toString())
        dataToSend.append('numReviews', product.numReviews.toString())

        // Send the FormData to the backend
        const response = await apiClient.post<{ message: string }>(
          `api/admin/products/create`,
          dataToSend, // Use the correct FormData instance
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
