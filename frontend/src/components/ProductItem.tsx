import { Button, Card } from 'react-bootstrap'
import { Product } from '../types/Product'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import { convertProductToCartItem } from '../utils'
import { CartItem } from '../types/Cart'
import { toast } from 'react-toastify'

export default function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    dispatch({ type: 'ADD_TO_CART', payload: item })
    toast.success('Product is added to cart')
  }

  return (
    <Link to={`/product/${product.slug}`} className="card-link">
      <Card className="product-card">
        <div className="image-container">
          <img
            src={product.images[0]}
            alt={product.name}
            className="card-img-top image"
          />
        </div>
        <Card.Body>
          <div className="product-info">
            <Card.Title className="product-item-title">
              {product.name}
            </Card.Title>
            {product.reviews.length} reviews
            <Rating rating={product.rating} />
            <Card.Text className="product-price">${product.price}</Card.Text>
          </div>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              onClick={() =>
                addToCartHandler(convertProductToCartItem(product))
              }
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </Link>
  )
}
