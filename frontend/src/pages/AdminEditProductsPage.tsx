import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useGetProductDetailsByIdQuery } from '../hooks/productHooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import { useEditProductMutation } from '../hooks/adminHooks'

export default function AdminEditProductsPage() {
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    images: [],
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
    _id: '',
    slug: '',
    rating: 0,
    numReviews: 0,
    reviews: [],
  })
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: productDetails } = useGetProductDetailsByIdQuery(id!)

  const { mutateAsync: updateProduct } = useEditProductMutation()

  useEffect(() => {
    if (productDetails) {
      setFormData({
        name: productDetails.name,
        price: productDetails.price,
        images: productDetails.images,
        brand: productDetails.brand,
        category: productDetails.category,
        countInStock: productDetails.countInStock,
        description: productDetails.description,
        _id: productDetails._id,
        slug: productDetails.slug,
        rating: productDetails.rating,
        numReviews: productDetails.numReviews,
        reviews: productDetails.reviews,
      })
    }
  }, [productDetails])

  const { images } = formData

  const [displayedImages, setDisplayedImages] = useState<string[]>([])

  useEffect(() => {
    if (images.length > 0) {
      setDisplayedImages(images)
    }
  }, [images])

  const deleteImage = (index: number) => {
    const updatedImages = [...displayedImages]
    updatedImages.splice(index, 1)
    setDisplayedImages(updatedImages)
    setFormData({ ...formData, images: updatedImages })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setFormData({ ...formData, images: [...images, ...newImages] })
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/admin/productlist')
    updateProduct(formData)
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <Form onSubmit={submitHandler}>
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
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                ></Form.Control>
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
                      countInStock: Number(e.target.value),
                    })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="w-100">
            <Col md={8}>
              <Form.Group controlId="images">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
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
