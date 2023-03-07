import { IPickUpPointDate } from '../../../models/redux/interfaces'

export interface IModalShowMapProps {
  chosenPickUpPoint: IPickUpPointDate
  isModalShowMap: boolean
  setIsModalShowMap: (arg: boolean) => void
}
