import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { userRouter } from './routers/userRouter'

dotenv.config()

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
{
  /* NEW*/
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
