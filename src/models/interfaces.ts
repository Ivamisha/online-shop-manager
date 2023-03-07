import { ILoginFormInputs } from '../pages'
import { IAdmin } from './redux/interfaces'
export interface ILoginInputMap {
  inputName: keyof ILoginFormInputs
  type: string
  label: string
}

export interface IAuthResponse extends IAdmin {}

export interface IDrawerList {
  name: string
  route: string
}
