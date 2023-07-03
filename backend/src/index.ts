import cors from 'cors'
import express, { Request, Response } from 'express'
import { sampleProduct } from './data'

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProduct)
})

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
