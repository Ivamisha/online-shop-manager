import { IPickUpPointDate } from '../../../models/redux/interfaces'

export interface IModalUpdatePickUpPointProps {
  chosenPickUpPoint: IPickUpPointDate
  isModalUpdateOpen: boolean
  setIsModalUpdateOpen: (arg: boolean) => void
}
