import { User } from './models/userModel'
import { Product } from './models/productModel'
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: 'Sample Product',
    slug: 'sample-product',
    image: '/images/disc1.jpeg',
    category: 'Sample Category',
    brand: 'Sample Brand',
    price: 50,
    countInStock: 500,
    description: 'Sample Description',
    rating: 3,
    numReviews: 5000,
  },
  {
    name: 'Sample Product 2',
    slug: 'sample-product-2',
    image: '/images/disc2.jpg',
    category: 'Sample Category',
    brand: 'Sample Brand',
    price: 60,
    countInStock: 200,
    description: 'Sample Description',
    rating: 3.5,
    numReviews: 200,
  },
  {
    name: 'Sample Product 3',
    slug: 'sample-product-3',
    image: '/images/disc3.jpg',
    category: 'Sample Category',
    brand: 'Sample Brand',
    price: 82,
    countInStock: 10,
    description: 'Sample Description',
    rating: 4.5,
    numReviews: 5,
  },
  {
    name: 'Sample Product 4',
    slug: 'sample-product-4',
    image: '/images/disc4.webp',
    category: 'Sample Category',
    brand: 'Sample Brand',
    price: 20,
    countInStock: 0,
    description:
      'Sample Description lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.   ',
    rating: 4.5,
    numReviews: 5,
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Marius Phillips',
    email: 'Marius.e.phillips@gmail.com',
    password: bcrypt.hashSync('Villa117'),
    isAdmin: true,
  },
  {
    name: 'Lea Celine',
    email: 'LeaCelineGrandahl@gmail.com',
    password: bcrypt.hashSync('Villa117'),
    isAdmin: false,
  },
]
