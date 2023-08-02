import express, { Request, Response } from 'express'

export const keyRouter = express.Router()

// api/keys/paypal
keyRouter.get('/paypal', async (req: Request, res: Response) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' })
})
