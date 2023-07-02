import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Frisbee golf</Navbar.Brand>
          </Container>
          <Nav>
            <Nav.Link href="#link">Products</Nav.Link>
            <Nav.Link href="#link">Cart</Nav.Link>
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
