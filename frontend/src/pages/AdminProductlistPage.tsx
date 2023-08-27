import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
} from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useGetProductsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDeleteProductMutation } from '../hooks/adminHooks'

export default function AdminProductlistPage() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery()
  const [sortKey, setSortKey] = useState('name')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('')

  const sortProducts = (a: any, b: any) => {
    if (sortKey === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortKey === 'price') {
      return a.price - b.price
    } else if (sortKey === 'category') {
      return a.category.localeCompare(b.category)
    } else if (sortKey === 'brand') {
      return a.brand.localeCompare(b.brand)
    } else if (sortKey === 'countInStock') {
      return a.countInStock - b.countInStock
    } else if (sortKey === 'rating') {
      return a.rating - b.rating
    }
    return 0
  }

  const { mutateAsync: deleteProduct } = useDeleteProductMutation()

  const deleteHandler = async (id: string) => {
    deleteProduct(id)
    setShowConfirmation(false)
    setUserIdToDelete('')
    refetch()
  }

  return (
    <div>
      <h2>Products</h2>
      <Row className="align-items-center">
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title="Sort"
            variant="light"
            className="btn-sm"
          >
            <Dropdown.Item onClick={() => setSortKey('name')}>
              Name
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortKey('price')}>
              Price
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortKey('category')}>
              Category
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortKey('brand')}>
              Brand
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortKey('countInStock')}>
              CountInStock
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortKey('rating')}>
              Rating
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        products
          ?.slice()
          .sort(sortProducts)
          .map((product) => (
            <div key={product._id}>
              <Row className="align-items-center">
                <Col>
                  <p>{product.name}</p>
                </Col>
                <Col>
                  <p>{product.price}</p>
                </Col>
                <Col>
                  <p>{product.category}</p>
                </Col>
                <Col>
                  <p>{product.brand}</p>
                </Col>
                <Col>
                  <p>{product.countInStock}</p>
                </Col>
                <Col>
                  <p>{product.rating}</p>
                </Col>
                <Col>
                  <LinkContainer to={`/admin/productlist/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </Col>
                <Col>
                  <Button variant="light" className="btn-sm">
                    <i
                      className="fas fa-trash"
                      onClick={() => {
                        setUserIdToDelete(product._id)
                        setShowConfirmation(true)
                      }}
                    ></i>
                  </Button>
                </Col>
              </Row>
            </div>
          ))
      )}

      {showConfirmation && (
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteHandler(userIdToDelete)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="d-flex justify-content-center mt-3">
        <LinkContainer to="/admin/productlist/create">
          <Button variant="light" className="btn-sm">
            <i className="fas fa-plus mr-2"></i>
            Create new product
          </Button>
        </LinkContainer>
      </div>
    </div>
  )
}
