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
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } })
    toast.success('Product added to cart')
  }

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
