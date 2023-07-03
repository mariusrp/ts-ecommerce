import express, { Request, Response } from 'express'
import { sampleProduct } from './data'

const app = express()

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProduct)
})

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
