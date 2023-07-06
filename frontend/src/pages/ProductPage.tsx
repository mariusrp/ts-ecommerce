import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks'
import MessageBox from '../components/MessageBox'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import LoadingBox from '../components/LoadingBox'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { convertProductToCartItem } from '../utils'

export default function ProductPage() {
  const params = useParams()
  const { slug } = params

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const navigate = useNavigate()

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product!.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...convertProductToCartItem(product!), quantity },
    })
    toast.success('Product added to cart')
    navigate('/cart')
  }

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">
      Product not found
      <button onClick={() => refetch()}>Retry</button>
    </MessageBox>
  ) : (
    <div>
      <Row>
        <Col sm={6}>
          <img src={product.image} alt={product.name} className="large" />
        </Col>
        <Col sm={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product && product.countInStock > 0 ? (
                        <Badge bg="success">In stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product && product.countInStock > 0 ? (
                    <div className="d-grid">
                      <Button variant="primary" onClick={addToCartHandler}>
                        Add to cart
                      </Button>
                    </div>
                  ) : (
                    <Button variant="light" disabled>
                      Add to cart
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
