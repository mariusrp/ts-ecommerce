import { ModelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@ModelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  public _id?: string
  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public email!: string

  @prop({ required: true })
  public password!: string

  @prop({ default: false })
  public isAdmin!: boolean
}

export const UserModel = getModelForClass(User)
