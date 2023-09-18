import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function ShippingAddressPage() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress },
  } = state

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
  }, [navigate, userInfo])

  const [fullName, setFullName] = useState(shippingAddress.fullName || '')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const MIN_FULLNAME_LENGTH = 3
  const MIN_ADDRESS_LENGTH = 5
  const MIN_CITY_LENGTH = 2
  const MIN_COUNTRY_LENGTH = 2
  const POSTAL_CODE_REGEX = /^\d{5}$/ // Example: 12345

  // Validation functions
  const isFullNameValid = fullName.length >= MIN_FULLNAME_LENGTH
  const isAddressValid = address.length >= MIN_ADDRESS_LENGTH
  const isCityValid = city.length >= MIN_CITY_LENGTH
  const isPostalCodeValid = POSTAL_CODE_REGEX.test(postalCode)
  const isCountryValid = country.length >= MIN_COUNTRY_LENGTH

  const fullNameClass = isFullNameValid ? '' : 'invalid-input'
  const addressClass = isAddressValid ? '' : 'invalid-input'
  const cityClass = isCityValid ? '' : 'invalid-input'
  const postalCodeClass = isPostalCodeValid ? '' : 'invalid-input'
  const countryClass = isCountryValid ? '' : 'invalid-input'

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (
      !isFullNameValid ||
      !isAddressValid ||
      !isCityValid ||
      !isPostalCodeValid ||
      !isCountryValid
    ) {
      toast.error('Invalid input')
    }

    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    })
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    )
    navigate('/payment')
  }
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className={`mb-3 ${fullNameClass}`} controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={`mb-3 ${addressClass}`} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={`mb-3 ${cityClass}`} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className={`mb-3 ${postalCodeClass}`}
            controlId="postalCode"
          >
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={`mb-3 ${countryClass}`} controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
