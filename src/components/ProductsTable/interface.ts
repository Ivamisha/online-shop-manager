import { IProductsDate } from '../../models/redux'

export interface IProductTableProps {
  chosenSortingField: string
  setChosenSortingField: (arg: string) => void
  setChosenSortingWay: (arg?: 'asc' | 'desc') => void
  productTablePage: number
  rowsPerPage: number
  setProductTablePage: (arg: number) => void
  setRowsPerPage: (arg: number) => void
  setIsModalUpdateProductOpen: (arg: boolean) => void
  setIsModalHideProductOpen: (arg: boolean) => void
  setChosenProduct: (arg: IProductsDate) => void
}
