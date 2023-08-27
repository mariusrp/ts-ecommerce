import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel'
import { OrderModel } from '../models/orderModel'
import { ProductModel } from '../models/productModel'
import path from 'path'
import multer from 'multer'
import { isAdmin, isAuth } from '../utils'

export const adminRouter = express.Router()

adminRouter.get(
  '/users',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find({})
    res.json(users)
  })
)

adminRouter.get(
  '/orders',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({}).populate('user', 'name')
    res.json(orders)
  })
)

adminRouter.put(
  '/products/:id/edit',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id)
    if (product) {
      product.name = req.body.name || product.name
      product.price = req.body.price || product.price
      product.images = req.body.images || product.images
      product.brand = req.body.brand || product.brand
      product.category = req.body.category || product.category
      product.countInStock = req.body.countInStock || product.countInStock
      product.description = req.body.description || product.description
      const updatedProduct = await product.save()
      res.json({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        images: updatedProduct.images,
        brand: updatedProduct.brand,
        category: updatedProduct.category,
        countInStock: updatedProduct.countInStock,
        description: updatedProduct.description,
      })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

adminRouter.delete(
  '/users/:id/delete',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      await user.deleteOne()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

const storage = multer.diskStorage({
  destination: '../frontend/public/images/products',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileExtension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
  },
})
const upload = multer({ storage: storage })

adminRouter.post(
  '/products/create',
  isAuth,
  isAdmin,
  upload.array('images', 5),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).json({ message: 'Product data not found' })
      return
    }

    const {
      name,
      rating,
      numReviews,
      reviews,
      slug,
      price,
      brand,
      category,
      countInStock,
      description,
    } = req.body

    const images = (req.files as Express.Multer.File[]).map(
      (file: Express.Multer.File) => '/images/products/' + file.filename
    )

    console.log(reviews)

    const product = new ProductModel({
      name,
      slug,
      price,
      brand,
      category,
      countInStock,
      description,
      images,
      rating,
      numReviews,
      reviews,
    })

    try {
      const createdProduct = await product.save()
      res.status(201).json(createdProduct)
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ message: 'Failed to create product' })
    }
  })
)

adminRouter.put(
  '/orderlist/:id/deliver',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = new Date()

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
)

adminRouter.delete(
  '/products/:id/delete',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id)
    if (product) {
      await product.deleteOne()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

adminRouter.get(
  '/users/:id/orders',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.params.id })
    res.json(orders)
  })
)
