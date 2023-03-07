import { ICategoryDate } from '../../../models/redux'

export interface IModalUpdateCategory {
  isModalUpdateOpen: boolean
  setIsModalUpdateOpen: (arg: boolean) => void
  chosenCategory: ICategoryDate
  setChosenCategory: (arg: ICategoryDate | {}) => void
}

export interface ICategoryUpdateForm {
  title: string
  description: string
  shown: boolean
}

export interface ICategoryModalUpdateForm {
  inputName: keyof ICategoryUpdateForm
  type: string
  label: string
}
