export interface ICategoryUpdateForm {
  categoryField: string
  description: string
  shown: number
}
export interface IProductUpdateForm {
  title: string
  description: string
  shown: number
}

export interface IProductFormProps {
  setChosenCategory: (arg: string) => void
  setSearchValue: (arg: string) => void
  isShowHidedProducts: boolean
  setIsShowHidedProducts: (arg: boolean) => void
  productTablePage: number
  rowsPerPage: number
  setIsModalCreateProductOpen: (arg: boolean) => void
}
