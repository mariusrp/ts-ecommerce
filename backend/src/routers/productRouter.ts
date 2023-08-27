import express from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'

export const productRouter = express.Router()

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find({})
    res.json(products)
  })
)
productRouter.get(
  '/categories',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct('category')
    res.json(categories)
  })
)

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

productRouter.get(
  '/search/:keyword',
  asyncHandler(async (req, res) => {
    const keyword = req.params.keyword
    if (keyword) {
      const products = await ProductModel.find({
        name: { $regex: keyword, $options: 'i' },
      })

      res.json(products)
    } else {
      const products = await ProductModel.find({})
      res.json(products)
    }
  })
)

//save product-review
productRouter.post(
  '/:productId/reviews',
  asyncHandler(async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.productId)

      if (!product) {
        res.status(404).json({ message: 'Product not found' })
        return
      }

      const { user, email, rating, comment, createdAt } = req.body

      if (!user || !rating || !comment || !createdAt || !email) {
        res.status(400).json({ message: 'Invalid review data' })
        return
      }

      const reviewId = new ObjectId().toHexString()

      const newReview = {
        _id: reviewId,
        user,
        email,
        rating,
        comment,
        createdAt,
      }

      product.reviews.push(newReview)
      await product.save()

      res.status(201).json({ message: 'Review added' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to add review' })
    }
  })
)

//delete product-review
productRouter.delete(
  '/:productId/reviews/:reviewId',
  asyncHandler(async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.productId)

      if (!product) {
        res.status(404).json({ message: 'Product not found' })
        return
      }

      const review = product.reviews.find(
        (review) => review._id === req.params.reviewId
      )

      if (!review) {
        res.status(404).json({ message: 'Review not found' })
        return
      }

      product.reviews = product.reviews.filter(
        (review) => review._id !== req.params.reviewId
      )

      await product.save()

      res.status(200).json({ message: 'Review deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete review' })
    }
  })
)

productRouter.put(
  '/:productId/rating',
  asyncHandler(async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.productId)

      if (!product) {
        res.status(404).json({ message: 'Product not found' })
        return
      }

      const { rating } = req.body

      if (!rating) {
        res.status(400).json({ message: 'Invalid rating data' })
        return
      }

      product.rating = rating
      await product.save()

      res.status(200).json({ message: 'Rating updated' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to update rating' })
    }
  })
)
productRouter.get(
  '/:productId',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.productId)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

productRouter.get(
  '/category/:category',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find({ category: req.params.category })
    if (products) {
      res.json(products)
    } else {
      res.status(404)
      throw new Error('Products not found')
    }
  })
)
