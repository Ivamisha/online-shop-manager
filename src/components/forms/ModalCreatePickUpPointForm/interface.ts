export interface IModalCreatePickUpPointForm {
  handleClose: () => void
  setChosenMapPoint: (arg: number[]) => void
  chosenMapPoint?: number[]
}

export interface IPickUpCreateForm {
  address: string
  latitude: number
  longitude: number
  description: string
  timeOpen: string
  timeClose: string
}
