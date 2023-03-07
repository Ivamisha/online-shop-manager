import { IProductsDate } from '../../../models/redux'

export interface IModalHideProduct {
  chosenProduct: IProductsDate
  isModalHideProductOpen: boolean
  setIsModalHideProductOpen: (arg: boolean) => void
}
