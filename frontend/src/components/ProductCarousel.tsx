import { Carousel } from 'react-bootstrap'

export default function ProductCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/cameras/arlo-pro-4.jpeg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/security/ultraloq-pro-6.jpeg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/displays/OS_3_WWW_Intro_2.webp"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}
