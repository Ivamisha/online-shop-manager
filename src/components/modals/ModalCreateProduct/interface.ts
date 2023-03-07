export interface IModalCreateProduct {
  isModalCreateProductOpen: boolean
  setIsModalCreateProductOpen: (arg: boolean) => void
}

export interface IProductCreateForm {
  name: string
  image: File[]
  price: number
  quantity: number
  category: string
  description: string
}

export interface ICreateProductMapForm {
  name: string
  price: string
  quantity: string
  description: string
}

export interface IProductModalCreateForm {
  inputName: keyof ICreateProductMapForm
  type: string
  label: string
}
