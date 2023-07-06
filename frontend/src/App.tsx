import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, Outlet } from 'react-router-dom'
import { Store } from './Store'
import { LinkContainer } from 'react-router-bootstrap'

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'TOGGLE_MODE' })
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Frisbee golf</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <Link to="/signin" className="nav-link">
              Sign in
            </Link>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-4">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
