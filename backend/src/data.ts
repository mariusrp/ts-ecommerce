import { User } from './models/userModel'
import { Product } from './models/productModel'
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: 'Arlo Pro 4',
    slug: 'Wire-Free-Security-Camera',
    images: [
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/cameras/arlo-pro-4.jpeg',
    ],
    category: 'cameras',
    brand: 'Arlo',
    price: 110,
    countInStock: 100,
    description:
      'The Arlo Pro 4 Spotlight Camera is a wireless outdoor security camera that installs in minutes, delivers stunning 2K video, and offers a wealth of features with plenty of integration options.',
    rating: 4.5,
    numReviews: 209,
    reviews: [],
  },
  {
    name: 'Ezviz DB1C',
    slug: 'Wi-Fi-Video-Doorbell',
    images: [
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/cameras/Ezviz-db1c-video-doorbel.jpg',
    ],
    category: 'cameras',
    brand: 'Ezviz',
    price: 119.99,
    countInStock: 200,
    description:
      'The Ezviz DB1C Wi-Fi Video Doorbell is an affordable smart doorbell that delivers sharp HD video with a wide viewing angle, cloud and local video storage, and support for voice control and lots of third-party smart devices.',
    rating: 4.0,
    numReviews: 143,
    reviews: [],
  },
  {
    name: 'Ultraloq U-Bolt',
    slug: 'Wi-Fi-Smart-Lock',
    images: [
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/security/ultraloq-pro-6.jpeg',
    ],
    category: 'security',
    brand: 'Ultraloq',
    price: 309.99,
    countInStock: 49,
    description:
      'The Ultraloq U-Bolt Pro Wi-Fi is a dependable and versatile smart lock that lets you lock and unlock your door with your voice and fingerprint, as well as via keypad, mobile app, or traditional key.',
    rating: 5.5,
    numReviews: 60,
    reviews: [],
  },
  {
    name: 'Amazon Echo 4',
    slug: 'Amazon-Echo-4th-Gen',
    images: [
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/speakers/amazon-echo-4th-gen.jpg',
    ],
    category: 'speakers',
    brand: 'Amazon',
    price: 79.99,
    countInStock: 320,
    description:
      'The fourth-generation Amazon Echo speaker takes the sound quality and smart home hub capabilities of the Echo Plus and puts it in a new round package.',
    rating: 4.5,
    numReviews: 502,
    reviews: [],
  },
  {
    name: 'Control4 Tablet',
    slug: 'Control4-Tablet',
    images: [
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/displays/OS_3_WWW_Intro_2.webp',
    ],
    category: 'displays',
    brand: 'Control4',
    price: 19.99,
    countInStock: 210,
    description:
      ' The Control4 T4 Series Tabletop Touch Screen delivers always-on, dedicated, and mobile control over all the technology in your home or business.',
    rating: 4.5,
    numReviews: 502,
    reviews: [],
  },
  {
    name: 'Google Nest Hub 2',
    slug: 'Google-Nest-Hub-2',
    images: [
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/displays/google-nest-hub-2-generasjon-charcoal--pdp_zoom-3000--pdp_main-960.avif',
      'https://ecommerce-image-bucket.s3.eu-north-1.amazonaws.com/prodcucts/displays/google-nest-hub-2-generasjon-charcoal--pdp_zoom-3000.avif',
    ],
    category: 'displays',
    brand: 'Google',
    price: 119.99,
    countInStock: 320,
    description:
      ' The Google Nest Hub 2nd Generation is a smart display that doubles as a digital photo frame and a control panel for smart home devices.',
    rating: 4.0,
    numReviews: 142,
    reviews: [],
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Marius Phillips',
    email: 'a@gmail.com',
    password: bcrypt.hashSync('123', 8),
    isAdmin: true,
  },
  {
    name: 'Lea Celine',
    email: 'LeaCelineGrandahl@gmail.com',
    password: bcrypt.hashSync('y7h8uyg'),
    isAdmin: false,
  },
]

export const sampleReviews = [
  {
    user: '5f9d88d8e8b4a4b4b4b4b4b4',
    rating: 4.5,
    comment: 'Great product',
    createdAt: '2020-10-30T12:00:00.000Z',
  },
  {
    user: '5f9d88d8e8b4a4b4b4b4b4b4',
    rating: 4.5,
    comment: 'Great product',
    createdAt: '2020-10-30T12:00:00.000Z',
  },
  {
    user: '5f9d88d8e8b4a4b4b4b4b4b4',
    rating: 4.5,
    comment: 'Great product',
    createdAt: '2020-10-30T12:00:00.000Z',
  },
  {
    user: '5f9d88d8e8b4a4b4b4b4b4b4',
    rating: 4.5,
    comment: 'Great product',
    createdAt: '2020-10-30T12:00:00.000Z',
  },
]
