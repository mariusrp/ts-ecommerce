import { User } from './models/userModel'
import { Product } from './models/productModel'
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: 'Arlo Pro 4',
    slug: 'Wire-Free-Security-Camera',
    images: ['/images/products/arlo-pro-4-wire-free-security-camera.jpg'],
    category: 'Security Cameras',
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
    images: ['/images/products/ezviz-db1c-wi-fi-video-doorbell.jpg'],
    category: 'doorbell cameras',
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
    images: ['/images/products/ultraloq-u-bolt-pro-wi-fi-smart-lock.jpg'],
    category: 'smart locks',
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
    images: ['/images/products/amazon-echo-4th-gen_q9mv.3840.jpg'],
    category: 'smart speakers',
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
    images: ['/images/products/OS_3_WWW_Intro_2.jpg'],
    category: 'tablets',
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
      '/images/products/google-nest-hub-2-generasjon-charcoal01.jpg',
      '/images/products/google-nest-hub-2-generasjon-charcoal02.jpg',
    ],
    category: 'tablets',
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
