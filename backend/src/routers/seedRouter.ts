import asyncHandler from 'express-async-handler'
import express, { Request, Response } from 'express'
import { ProductModel } from '../models/productModel'
import { sampleProducts, sampleUsers } from '../data'
import { UserModel } from '../models/userModel'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts)

    const createdUsers = await UserModel.insertMany(sampleUsers)
    res.json({ createdProducts, createdUsers })

    //delete all product-reviews
    // await ProductModel.updateMany({}, { $set: { reviews: [] } })
  })
)
