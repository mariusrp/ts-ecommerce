import { useNavigate } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useAdminGetOrdersQuery } from '../hooks/adminHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import Order from '../components/Order'

export default function AdminOrderlistPage() {
  const { data: orders, isLoading, error, refetch } = useAdminGetOrdersQuery()

  const navigate = useNavigate()

  return (
    <div>
      <h1>Orders</h1>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((order) => (
              <Order
                key={order._id}
                order={order}
                navigate={navigate}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
