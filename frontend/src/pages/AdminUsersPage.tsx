import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
} from 'react-bootstrap'
import { useAdminGetUsersQuery } from '../hooks/adminHooks'
import { LinkContainer } from 'react-router-bootstrap'
import { useState } from 'react'
import { useDeleteUserByIDMutation } from '../hooks/adminHooks'

export default function AdminUsersPage() {
  const { data: users, refetch } = useAdminGetUsersQuery()
  const [sortKey, setSortKey] = useState('name')
  const [showConfirmation, setShowConfirmation] = useState(false) // State for confirmation modal
  const [userIdToDelete, setUserIdToDelete] = useState('') // State to store the user ID being deleted

  const sortUsers = (a: any, b: any) => {
    if (sortKey === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortKey === 'email') {
      return a.email.localeCompare(b.email)
    } else if (sortKey === 'admin') {
      return a.isAdmin ? -1 : 1
    }
    return 0
  }

  const { mutateAsync: deleteUser } = useDeleteUserByIDMutation()

  const deleteHandler = async (id: string) => {
    setShowConfirmation(false)
    await deleteUser(id)
    refetch()
  }

  return (
    <div>
      <h2>Users</h2>
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
            <Dropdown.Item onClick={() => setSortKey('email')}>
              Email
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortKey('admin')}>
              Admin
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {users
        ?.slice()
        .sort(sortUsers)
        .map((user) => (
          <div key={user._id}>
            <Row className="d-flex align-items-center">
              <Col>
                <p>{user.name}</p>
              </Col>
              <Col>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </Col>
              <Col>
                <p>{user.isAdmin ? 'Admin' : 'User'}</p>
              </Col>
              <Col>
                <LinkContainer to={`/admin/orderlist/${user._id}`}>
                  <Button variant="light" className="btn-sm">
                    Orders
                  </Button>
                </LinkContainer>
              </Col>
              <Col>
                <Button variant="light" className="btn-sm">
                  <i
                    className="fas fa-trash"
                    onClick={() => {
                      setUserIdToDelete(user._id)
                      setShowConfirmation(true)
                    }}
                  ></i>
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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
    </div>
  )
}
