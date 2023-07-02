import { Col, Row } from 'react-bootstrap'
import { sampleProduct } from '../data'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <Row>
      {sampleProduct.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
