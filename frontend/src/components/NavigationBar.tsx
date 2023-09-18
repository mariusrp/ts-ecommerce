import { Nav, NavDropdown, Navbar, NavbarBrand } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { Link } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import SideBar from './SideBar'
import { AiFillHome } from 'react-icons/ai'

export default function NavigationBar() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const switchModeHandler = () => {
    dispatch({ type: 'TOGGLE_MODE' })
  }

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  return (
    <>
      <Navbar
        className="d-flex flex-column align-items-stretch p-3 "
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-center">
            <Link
              to="#"
              className="nav-link header-link sidebar-toggle w-10 px-1"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className="fas fa-bars" style={{ fontSize: '32px' }}></i>
            </Link>
            <LinkContainer to="/" className="px-1">
              <NavbarBrand className="d-flex align-items-center">
                {screenWidth > 768 ? (
                  'AutomateHub'
                ) : (
                  <AiFillHome style={{ fontSize: '32px' }} />
                )}
              </NavbarBrand>
            </LinkContainer>
          </div>

          <SearchBox />
          <Navbar.Collapse>
            <Nav className="w-100 justify-content-end">
              {userInfo && userInfo.isAdmin && (
                <NavDropdown className="header-link" title="Admin">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <Link
                to="#"
                className="nav-link header-link main-nav-link"
                onClick={switchModeHandler}
              >
                <i
                  className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                ></i>{' '}
                {mode === 'light' ? 'Light' : 'Dark'} Mode
              </Link>
              {userInfo ? (
                <NavDropdown className="header-link" title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link
                  className="nav-link main-nav-link header-link"
                  to={'/signin'}
                >
                  Sign In
                </Link>
              )}
              <Link
                className="nav-link main-nav-link header-link"
                to="/orderhistory"
              >
                Orders
              </Link>
              <Link
                to="/cart"
                className="nav-link main-nav-link header-link cart"
              >
                {cart.cartItems.length > 0 && (
                  <span className="cart-badge">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0) > 9
                      ? '9+'
                      : cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
                <BsCart4 className="icon cart-icon" />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <SideBar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
    </>
  )
}
