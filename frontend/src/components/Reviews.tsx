import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Product, Review } from '../types/Product'
import MessageBox from './MessageBox'
import Rating from './Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import {
  useDeleteProductReviewMutation,
  useEditProductRatingMutation,
} from '../hooks/productHooks'
import { toast } from 'react-toastify'
import { calculateAverageRating } from '../utils'

interface ReviewsProps {
  product: Product
  reviews: Review[]
  refetch: () => void
}

export default function Reviews({ product, reviews, refetch }: ReviewsProps) {
  const {
    state: { userInfo, mode },
  } = useContext(Store)

  const { mutateAsync: deleteProductReview } = useDeleteProductReviewMutation()
  const { mutateAsync: editProductRating } = useEditProductRatingMutation()

  const deleteReview = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    reviewId: string,
    productId: string
  ) => {
    e.preventDefault()
    try {
      await deleteProductReview({ productId, reviewId })
      refetch()
      const updatedReviews = product.reviews.filter(
        (review) => review._id !== reviewId
      )
      calculateAverageRating(updatedReviews, productId, editProductRating)
      refetch()
      toast.success('Review deleted successfully')
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('An error occurred while deleting the review')
    }
  }

  return (
    <Card className={`${mode}`}>
      {reviews.length === 0 && <MessageBox>There is no review</MessageBox>}
      <ListGroup>
        {reviews.map((review) => (
          <ListGroupItem key={review._id} className="flex justify-between">
            <div>
              <strong>{review.user}</strong>
              <Rating rating={review.rating} caption=" " />
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              <p>{review.comment}</p>
            </div>
            {userInfo?.email === review.email && (
              <i
                className="fas fa-trash"
                onClick={(e) => deleteReview(e, review._id!, product._id)}
                style={{ cursor: 'pointer' }}
                title="Delete Review"
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  )
}
