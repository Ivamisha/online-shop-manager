import { IPickUpPointDate } from '../../../models/redux/interfaces'

export interface IModalUpdatePickUpPointForm {
  handleClose: () => void
  setChosenMapPoint: (arg: number[]) => void
  chosenMapPoint?: number[]
  chosenPickUpPoint: IPickUpPointDate
}

export interface IPickUpCreateForm {
  address: string
  latitude: number
  longitude: number
  description: string
  timeOpen: string
  timeClose: string
}
