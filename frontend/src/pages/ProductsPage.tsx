import { useContext } from 'react'
import {
  useGetProductsByCategoryQuery,
  useGetProductsByKeywordQuery,
  useGetProductsQuery,
} from '../hooks/productHooks'
import { Store } from '../Store'
import ProductItem from '../components/ProductItem'
import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

export default function ProductsPage() {
  const { state } = useContext(Store)
  const { searchKeyword } = state
  const location = useLocation()

  let products: any[] | undefined = []

  const urlSearchParams = new URLSearchParams(location.search)
  const urlTag = urlSearchParams.get('tag')

  if (urlTag === 'all') {
    const { data: allProducts } = useGetProductsQuery()
    products = allProducts
  } else if (urlTag) {
    const { data: productsByCategory } = useGetProductsByCategoryQuery(urlTag)
    products = productsByCategory
  } else if (searchKeyword) {
    const { data: productsByKeyword } =
      useGetProductsByKeywordQuery(searchKeyword)
    products = productsByKeyword
  } else {
    const { data: productsByKeyword } = useGetProductsByKeywordQuery('all')
    products = productsByKeyword
  }

  return (
    <Row>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h2 className="my-3">Products</h2>
      {products?.length === 0 && <p>No products found.</p>}
      {products?.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-3">
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
