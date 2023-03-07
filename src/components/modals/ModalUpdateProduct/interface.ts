import { IProductsDate } from '../../../models/redux'

export interface IModalUpdateProduct {
  chosenProduct: IProductsDate
  isModalUpdateProductOpen: boolean
  setIsModalUpdateProductOpen: (arg: boolean) => void
}

export interface IProductUpdateForm {
  name: string
  image: File[]
  price: number
  quantity: number
  category: string
  description: string
}

export interface IUpdateProductMapForm {
  name: string
  price: string
  quantity: string
  description: string
}

export interface IProductModalUpdateForm {
  inputName: keyof IUpdateProductMapForm
  type: string
  label: string
}
