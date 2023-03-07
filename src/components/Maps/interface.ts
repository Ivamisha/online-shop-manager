import { IPickUpPointDate } from '../../models/redux/interfaces'

export interface IMapsProps {
  pickUpPoint?: IPickUpPointDate
  setChosenMapPoint?: (arg: number[]) => void
  chosenMapPoint?: number[]
  changeblePickUpPoint?: IPickUpPointDate
}
