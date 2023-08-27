import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product, Review } from './types/Product'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.images[0],
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartItem
}

export const calculateAverageRating = async (
  reviews: Review[],
  id: string,
  editProductRating: (args: { productId: string; rating: number }) => void
) => {
  if (reviews.length === 0) {
    await editProductRating({
      productId: id,
      rating: 0.001,
    })
    return
  }
  let totalRating = 0
  for (const review of reviews) {
    totalRating += review.rating
  }
  const averageRating = totalRating / reviews.length
  await editProductRating({
    productId: id,
    rating: averageRating,
  })
}
