import { ICategoryDate } from '../../models/redux'

export interface ICategoryTable {
  setPage: (arg: number) => void
  chosenSortingField: string
  setChosenSortingField: (arg: string) => void
  setChosenSortingWay: (arg?: 'asc' | 'desc') => void
  rowsPerPage: number
  page: number
  setRowsPerPage: (arg: number) => void
  setIsModalUpdateOpen: (arg: boolean) => void
  setChosenCategory: (arg: ICategoryDate) => void
}
