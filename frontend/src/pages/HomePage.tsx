import { Col, Row } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from '../hooks/productHooks'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import ProductCarousel from '../components/ProductCarousel'
import SubHeader from '../components/SubHeader'

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <>
      {' '}
      <SubHeader />
      <ProductCarousel />
      <Row>
        <Helmet>
          <title>AutomateHub</title>
        </Helmet>

        <h2 className="my-3">Latest Products</h2>
        {products!.map((product) => (
          <Col key={product.slug} sm={12} md={6} lg={4} xl={3} className="mb-3">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}
