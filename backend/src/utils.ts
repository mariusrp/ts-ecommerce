import jws from 'jsonwebtoken'
import { User } from './models/userModel'

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
