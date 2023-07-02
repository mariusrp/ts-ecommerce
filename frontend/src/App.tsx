import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { sampleProduct } from './data'

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
          <Row>
            {sampleProduct.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
