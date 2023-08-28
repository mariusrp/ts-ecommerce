import {
  useCreateProductReviewMutation,
  useEditProductRatingMutation,
} from '../hooks/productHooks'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Product } from '../types/Product'
import { Store } from '../Store'
import { Link } from 'react-router-dom'
import { calculateAverageRating } from '../utils'

interface ReviewFormProps {
  product: Product
  refetch: () => void
}

export default function ReviewForm({ product, refetch }: ReviewFormProps) {
  const { mutateAsync: createReview } = useCreateProductReviewMutation()
  const { mutateAsync: editProductRating } = useEditProductRatingMutation()

  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')

  const {
    state: { userInfo },
  } = useContext(Store)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!rating || !comment) {
      return
    }

    try {
      const reviewData = {
        productId: product!._id,
        user: name,
        email: userInfo!.email,
        rating: parseInt(rating),
        comment: comment,
        createdAt: new Date().toISOString(),
      }

      await createReview(reviewData)

      const updatedReviews = [...product.reviews, reviewData]
      await calculateAverageRating(
        updatedReviews,
        product._id,
        editProductRating
      )

      refetch()
      toast.success('Review added successfully')

      // Clear form fields
      setName('')
      setRating('')
      setComment('')
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  return userInfo ? (
    <ListGroup variant="flush" className="mb-3">
      <ListGroup.Item>
        <h4>Write a customer review</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very good</option>
              <option value="5">5 - Excellent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  ) : (
    <ListGroup variant="flush" className="mb-3">
      <ListGroup.Item>
        Please <Link to="/signin">sign in</Link> to write a review
      </ListGroup.Item>
    </ListGroup>
  )
}
