import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useCreateProductMutation } from '../hooks/adminHooks'
import { useNavigate } from 'react-router-dom'

export default function AdminCreateProductPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    images: [] as File[],
    brand: '',
    category: 'displays',
    countInStock: 0,
    description: '',
    slug: '',
    rating: 0,
    numReviews: 0,
    reviews: [],
  })

  const { mutateAsync: createProduct } = useCreateProductMutation()

  const { images } = formData

  const [displayedImages, setDisplayedImages] = useState<string[]>([])

  useEffect(() => {
    if (images.length > 0) {
      setDisplayedImages(images.map((image) => URL.createObjectURL(image)))
    }
  }, [images])

  const deleteImage = (index: number) => {
    const updatedImages = [...displayedImages]
    updatedImages.splice(index, 1)

    const updatedFormDataImages = formData.images.filter((_, i) => i !== index)

    setDisplayedImages(updatedImages)
    setFormData({ ...formData, images: updatedFormDataImages })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setFormData({ ...formData, images: [...formData.images, ...newImages] })
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/admin/productlist')
    createProduct(formData)
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <Form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="d-flex">
          <Row className="w-100">
            <Col md={8}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: String(e.target.value) })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: String(e.target.value) })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01" // Allow two decimal places
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value), // Parse as float
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter count in stock"
                  value={formData.countInStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      countInStock: parseFloat(e.target.value), // Parse as float
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="displays">Displays</option>
                  <option value="speakers">Speakers</option>
                  <option value="cameras">Cameras</option>
                  <option value="security">Security</option>
                  <option value="accessories">Accessories</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="w-100">
            <Col md={8}>
              <Form.Group controlId="images">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                />
              </Form.Group>
              <div className="image-container">
                {displayedImages.map((imageUrl, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={imageUrl}
                      alt={formData.name}
                      className="small"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        margin: '10px',
                      }}
                    />
                    <button type="button" onClick={() => deleteImage(index)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <Form.Group controlId="description" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-center align-center">
          <button type="submit" className="my-2 mx-auto">
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}
