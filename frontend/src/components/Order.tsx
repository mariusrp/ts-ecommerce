import { useDeliverOrderMutation } from '../hooks/adminHooks'
import { Order } from '../types/Order'

interface Props {
  order: Order
  refetch: () => void
  navigate: (path: string) => void
}

export default function Order({ order, refetch, navigate }: Props) {
  const { mutateAsync: deliver } = useDeliverOrderMutation()

  const setDelivered = async (orderId: string) => {
    console.log('Deliver order:', orderId)
    await deliver(orderId)
    refetch()
  }
  return (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.user?.name}</td>
      <td>{order.createdAt?.substring(0, 10)}</td>
      <td>{order.totalPrice.toFixed(2)}</td>
      <td>{order.isPaid ? order.paidAt?.substring(0, 10) : 'No'}</td>
      <td>
        {order.isDelivered ? (
          order.deliveredAt?.substring(0, 10)
        ) : (
          <button
            type="button"
            className="small"
            onClick={() => setDelivered(order._id)}
          >
            Deliver
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          className="small"
          onClick={() => navigate(`/order/${order._id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  )
}
