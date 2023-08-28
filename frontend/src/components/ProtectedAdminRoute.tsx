import { useContext } from 'react'
import { Store } from '../Store'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedAdminRoute() {
  const {
    state: { userInfo },
  } = useContext(Store)

  if (userInfo?.isAdmin === true) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}
