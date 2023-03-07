import { IPickUpPointDate } from '../../models/redux/interfaces'

export interface IPickUpPointsTable {
  setIsModalShowMap: (arg: boolean) => void
  chosenSortingField: string
  setChosenSortingField: (arg: string) => void
  setChosenSortingWay: (arg?: 'asc' | 'desc') => void
  pickUpPointTablePage: number
  rowsPerPage: number
  setPickUpPointTablePage: (arg: number) => void
  setRowsPerPage: (arg: number) => void
  setIsModalUpdatePickUpPointOpen: (arg: boolean) => void
  setIsModalHidePickUpPointOpen: (arg: boolean) => void
  setChosenPickUpPoint: (arg: IPickUpPointDate) => void
}
