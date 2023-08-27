import { Card, Col, Row } from 'react-bootstrap'
import { useGetProductsQuery } from '../hooks/productHooks'
import {
  useAdminGetOrdersQuery,
  useAdminGetUsersQuery,
} from '../hooks/adminHooks'

export default function AdminDashboardPage() {
  const { data: products } = useGetProductsQuery()
  const { data: orders } = useAdminGetOrdersQuery()
  const { data: users } = useAdminGetUsersQuery()

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col>
          <Card className="my-3 p-3 rounded">
            <Card.Title>Users</Card.Title>
            <Card.Body>
              <Card.Text> {users?.length} Users</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="my-3 p-3 rounded">
            <Card.Title>Products</Card.Title>
            <Card.Body>
              <Card.Text> {products?.length} Products</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="my-3 p-3 rounded">
            <Card.Title>Orders</Card.Title>
            <Card.Body>
              <Card.Text> {orders?.length} Orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mb-3">
          <Card className="my-3 p-3 rounded">
            <Card.Title>Total Sales</Card.Title>
            <Card.Body>
              <Card.Text>
                {' '}
                {orders
                  ?.reduce((acc, order) => acc + order.totalPrice, 0)
                  .toFixed(2)}{' '}
                $
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="my-3 p-3 rounded">
            <Card.Title>Total Profit</Card.Title>
            <Card.Body>
              <Card.Text>
                {' '}
                {orders
                  ?.reduce((acc, order) => acc + order.itemsPrice - 400, 0)
                  .toFixed(2)}{' '}
                $
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
