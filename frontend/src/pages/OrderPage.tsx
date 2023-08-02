import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Store } from '../Store'
import {
  useGetOrderDetailsByIdQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../hooks/orderHooks'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { Helmet } from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

export default function OrderPage() {
  const { state } = useContext(Store)
  const { userInfo } = state

  const params = useParams()
  const { id: orderId } = params

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsByIdQuery(orderId!)

  const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation()

  const testPayPalHandler = () => {
    payOrder({ orderId: orderId! })
    refetch()
    toast.success('Order paid')
  }

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer()

  const { data: paypalConfig } = useGetPaypalClientIdQuery()

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      console.log('PayPal Client ID:', paypalConfig.clientId)
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypalConfig!.clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        })
      }
      loadPaypalScript()
    }
  }, [paypalConfig])

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID
        })
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: orderId!, ...details })
          refetch()
          toast.success('Order paid')
        } catch (err) {
          toast.error(getError(err as ApiError))
        }
      })
    },
    onError: (err) => {
      toast.error(getError(err as ApiError))
    },
  }

  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Order not found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {order._id}</title>
      </Helmet>
      <h1 className="my-3">Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {userInfo?.name} <br />
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              {order.orderItems.length === 0 ? (
                <MessageBox>Order is empty</MessageBox>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded thumbnail"
                          ></img>{' '}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {isPending ? (
                  <LoadingBox />
                ) : isRejected ? (
                  <MessageBox variant="danger">
                    Error in connecting to PayPal
                  </MessageBox>
                ) : (
                  <div>
                    <PayPalButtons
                      {...paypalbuttonTransactionProps}
                    ></PayPalButtons>
                    <Button onClick={testPayPalHandler}>Test PayPal</Button>
                  </div>
                )}
                {loadingPay && <LoadingBox></LoadingBox>}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}
