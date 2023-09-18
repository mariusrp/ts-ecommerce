import jws from 'jsonwebtoken'
import { User } from './models/userModel'
import { NextFunction, Request, Response } from 'express'

export const generateToken = (user: User) => {
  return jws.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    console.log('JWT Secret:', process.env.JWT_SECRET)
    const decoded = jws.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as {
      _id: string
      name: string
      email: string
      isAdmin: boolean
      token: string
    }
    next()
  } else {
    res.status(401).send({ message: 'No token' })
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: 'Not authorized as admin' })
  }
}
