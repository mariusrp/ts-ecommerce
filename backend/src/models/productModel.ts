import { ModelOptions, prop, getModelForClass } from '@typegoose/typegoose'

export class Review {
  @prop({ required: true })
  public _id!: string

  @prop({ required: true })
  public user!: string

  @prop({ required: true })
  public rating!: number

  @prop({ required: true })
  public email!: string

  @prop({ required: true })
  public comment!: string

  @prop({ required: true })
  public createdAt!: Date
}

@ModelOptions({ schemaOptions: { collection: 'products', timestamps: true } })
export class Product {
  public _id?: string

  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public slug!: string

  @prop({ required: true })
  public images!: string[]

  @prop({ required: true })
  public category!: string

  @prop({ required: true })
  public brand!: string

  @prop({ required: true, default: 0 })
  public price!: number

  @prop({ required: true, default: 0 })
  public countInStock!: number

  @prop({ required: true })
  public description!: string

  @prop({ required: true, default: 0 })
  public rating!: number

  @prop({ required: true, default: 0 })
  public numReviews!: number

  @prop({ required: true, default: [] })
  public reviews!: Review[]
}

export const ProductModel = getModelForClass(Product)
