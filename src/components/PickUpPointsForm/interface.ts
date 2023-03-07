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

export interface IPickUpPointsForm {
  setSearchValue: (arg: string) => void
  isShowHidedPickUpPoints: boolean
  setIsShowHidedPickUpPoints: (arg: boolean) => void
  pickUpPointsTablePage: number
  rowsPerPage: number
  setIsModalCreatePickUpPointsOpen: (arg: boolean) => void
}
