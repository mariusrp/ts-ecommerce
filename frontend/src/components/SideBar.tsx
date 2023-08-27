import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { useGetCategoriesQuery } from '../hooks/productHooks'
import { Dropdown, ListGroup, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react'
import { Store } from '../Store'
import { Link } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { GoSignIn } from 'react-icons/go'
import { LiaShippingFastSolid } from 'react-icons/lia'

export default function SideBar({ sidebarIsOpen, setSidebarIsOpen }: any) {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()
  const { state, dispatch } = useContext(Store)
  const { mode, cart, userInfo } = state

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    setSidebarIsOpen(false)
    window.location.href = '/signin'
  }

  return (
    <div>
      <div>
        {sidebarIsOpen && (
          <div
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            className="side-navbar-backdrop"
          ></div>
        )}

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex  flex-wrap flex-column'
              : 'side-navbar d-flex  flex-wrap flex-column'
          }
        >
          <ListGroup variant="flush">
            <ListGroup.Item action className="side-navbar-user">
              <div className="d-flex justify-content-between align-items-center">
                <LinkContainer
                  to={userInfo ? `/profile` : `/signin`}
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <span>
                    {userInfo ? `Hello, ${userInfo.name}` : `Hello, sign in`}
                  </span>
                </LinkContainer>
                <span
                  className={`fa fa-times ${
                    mode === 'light' ? 'light-icon' : 'dark-icon'
                  }`}
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                />
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <strong>Categories</strong>
              </div>
            </ListGroup.Item>
            {isLoading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">
                {getError(error as ApiError)}
              </MessageBox>
            ) : (
              categories!.map((category) => (
                <ListGroup.Item action key={category}>
                  <LinkContainer
                    to={{ pathname: '/search', search: `category=${category}` }}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link> {category}</Nav.Link>
                  </LinkContainer>
                </ListGroup.Item>
              ))
            )}{' '}
            <ListGroup.Item action key="cart">
              <Link
                to="/cart"
                className="nav-link d-flex align-items-center"
                onClick={() => setSidebarIsOpen(false)}
              >
                <span>
                  <BsCart4 className="icon" />{' '}
                  <span className="cart-item-count">
                    {cart.cartItems.length > 0 && (
                      <span className="sidebar-badge">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0) > 9
                          ? '9+'
                          : cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </span>
                    )}
                  </span>
                  <strong>View Cart</strong>
                </span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item action key="orders">
              <Link
                to="/orderhistory"
                className="nav-link d-flex align-items-center"
                onClick={() => setSidebarIsOpen(false)}
              >
                <span>
                  <LiaShippingFastSolid className="icon" />
                  <strong>Orders</strong>
                </span>
              </Link>
            </ListGroup.Item>
            {userInfo && userInfo.isAdmin && (
              <ListGroup.Item action key="admin">
                <Dropdown>
                  <Dropdown.Toggle id="admin-dropdown">Admin</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/admin/dashboard">
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item href="/admin/productlist">
                      Products
                    </Dropdown.Item>
                    <Dropdown.Item href="/admin/orderlist">
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item href="/admin/users">Users</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            )}
            {userInfo ? (
              <div>
                <ListGroup.Item action key="profile">
                  <Link
                    to="/profile"
                    className="nav-link d-flex align-items-center"
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <span>
                      <CgProfile className="icon" /> <strong>Profile</strong>
                    </span>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item action key="signout">
                  <Link
                    to="/"
                    className="nav-link d-flex align-items-center"
                    onClick={signoutHandler}
                  >
                    <span>
                      <MdLogout className="icon" /> <strong>Sign Out</strong>
                    </span>
                  </Link>
                </ListGroup.Item>
              </div>
            ) : (
              <ListGroup.Item action key="signin">
                <Link
                  to="/signin"
                  className="nav-link d-flex align-items-center"
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <span>
                    <GoSignIn className="icon" />
                    <strong>Sign In</strong>
                  </span>
                </Link>
              </ListGroup.Item>
            )}
          </ListGroup>
          <div className="d-flex justify-content-center align-items-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={() => dispatch({ type: 'TOGGLE_MODE' })}
              />
              <label
                className="form-check-label mode-text"
                htmlFor="flexSwitchCheckDefault"
              >
                {mode === 'light' ? 'Light' : 'Dark'} Mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
