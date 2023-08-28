import cors from 'cors'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { userRouter } from './routers/userRouter'
import { orderRouter } from './routers/orderRouter'
import { keyRouter } from './routers/keyRouter'
import { adminRouter } from './routers/adminRouter'

require('dotenv').config()

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const app = express()
mongoose.set('strictQuery', true)
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seed', seedRouter)
app.use('/api/keys', keyRouter)
app.use('/api/admin', adminRouter)
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT: number = parseInt(process.env.PORT || '4000', 10)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
