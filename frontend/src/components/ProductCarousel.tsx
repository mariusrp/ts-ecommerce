import { Carousel } from 'react-bootstrap'

export default function ProductCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/images/products/OS_3_WWW_Intro_2.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/images/products/images-1693085782923-982304653.webp"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/images/products/ultraloq-u-bolt-pro-wi-fi-smart-lock.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}
