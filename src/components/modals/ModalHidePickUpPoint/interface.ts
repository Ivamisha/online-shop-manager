import { IPickUpPointDate } from '../../../models/redux/interfaces'

export interface IModalHidePickUpPoint {
  chosenPickUpPoint: IPickUpPointDate
  isModalHidePickUpPointOpen: boolean
  setIsModalHidePickUpPoint: (arg: boolean) => void
}
