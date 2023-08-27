import { Button, Form } from 'react-bootstrap'
import {
  getUserInfoQuery,
  useUpdateUserProfileMutation,
} from '../hooks/userHooks'
import { useEffect, useState } from 'react'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { data: user } = getUserInfoQuery()
  const { mutateAsync: updateUser } = useUpdateUserProfileMutation()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await updateUser(formData)
      setError('')
      navigate('/')
    } catch (error) {
      setError(getError(error as ApiError))
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <Form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(String(e.target.value))
              setFormData({ ...formData, name: String(e.target.value) })
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(String(e.target.value))
              setFormData({ ...formData, email: String(e.target.value) })
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            onChange={(e) =>
              setFormData({ ...formData, password: String(e.target.value) })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: String(e.target.value),
              })
            }
          ></Form.Control>
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </div>
  )
}
