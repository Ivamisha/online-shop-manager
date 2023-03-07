import {
  AdminActionEnum,
  CategoryActionEnum,
  ProductsActionEnum,
  PickUpPointActionEnum,
} from './enums'

export interface IAdminInitialStateProps extends Partial<IError> {
  admin: IAdmin | undefined
  isAuth: boolean
  isLoading: boolean
}
export interface IAdmin {
  id: string
  name: string
  surname: string
  email: string
  address: string
  phoneNumber: string
  isAdmin: boolean
}

export interface ILoginDate {
  admin: IAdmin | undefined
  errors?: IError
  isAuth: boolean
}

export interface ICategoryInitialStateProps extends Partial<IError> {
  categories: ICategoryDate[] | undefined
  category: ICategoryDate | undefined
  amount: number
  isCategoryLoading: boolean
}

export interface IProductsInitialStateProps extends Partial<IError> {
  products: IProductsDate[]
  product?: IProductsDate
  amount: number
}

export interface IMetricsDate {
  id: string
  coordinates: [number, number]
  description: string
  shown: boolean
}

export interface IPickUpPointInitialStateProps extends Partial<IError> {
  pickUpPoints: IPickUpPointDate[]
  pickUpPoint?: IPickUpPointDate
  metricsArray: IMetricsDate[]
  amount: number
}

interface IError {
  error: string
  openSnack: boolean
}

export interface IStartLoading {
  type: AdminActionEnum.START_LOADING
  payload: boolean
}

export interface ICategoryStartLoading {
  type: CategoryActionEnum.START_LOADING
  payload: boolean
}

export interface IAdminLoginAction {
  type: AdminActionEnum.ADMIN_LOGIN
  payload: ILoginDate
}

export interface IAdminErrorOpenSnack {
  type: AdminActionEnum.ADMIN_ERROR_OPEN_SNACKBAR
  payload: IError
}

export interface IAdminAuthorizedErrorAction {
  type: AdminActionEnum.ADMIN_AUTHORIZED_ERROR
  payload: IError
}

export interface IAdminLogout {
  type: AdminActionEnum.ADMIN_LOGOUT
  payload: boolean
}

export interface IAdminCheckAuthrization {
  type: AdminActionEnum.ADMIN_AUTHORIZED_CHECK
  payload: ILoginDate
}

export interface ICategoryDate {
  id: string
  title: string
  description: string
  shown: boolean
  createdAt: string
  updatedAt: string
}
export interface ICategories {
  categories: ICategoryDate[] | []
  amount: number
}

export interface IGetAllCategoriesAction {
  type: CategoryActionEnum.GET_ALL_CATEGORIES
  payload: ICategories
}

export interface IGetAllAvailableCategoriesAction {
  type: CategoryActionEnum.GET_ALL_AVAILABLE_CAEGORIES
  payload: ICategories
}

export interface ICreateCategory {
  type: CategoryActionEnum.CREATE_CATEGORY
  payload: ICategoryDate
}

export interface IUpdateCategory {
  type: CategoryActionEnum.UPDATE_CATEGORY
  payload: ICategoryDate
}

export interface ICategoriesErrors {
  type: CategoryActionEnum.CATEGORIES_ERRORS
  payload: IError
}

export interface IGetPartOfCategories {
  type: CategoryActionEnum.GET_PART_OF_CATEGORIES
  payload: ICategories | undefined
}

export interface ICategoriesCloseSnack {
  type: CategoryActionEnum.CATEGORIES_ERROR_CLOSE_SNACKBAR
  payload: IError
}
export interface IProductsDate {
  id: string
  name: string
  picture: object
  price: number
  quantity: number
  category: string
  shown: boolean
  description: string
}

export interface IProducts {
  products: IProductsDate[]
  amount: number
}

export interface IGetAllProducts {
  type: ProductsActionEnum.GET_ALL_PRODUCTS
  payload: IProducts
}

export interface IGetProductsByCategory {
  type: ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY
  payload: IProducts
}

export interface ICreateProduct {
  type: ProductsActionEnum.CREATE_PRODUCT
  payload: IProductsDate
}

export interface IUpdateProduct {
  type: ProductsActionEnum.UPDATE_PRODUCT
  payload: IProductsDate
}

export interface IFindProduct {
  type: ProductsActionEnum.FIND_PRODUCT
  payload: IProducts
}

export interface IGetPartOfProducts {
  type: ProductsActionEnum.GET_PART_OF_PRODUCTS
  payload: IProducts
}

export interface IGetAvailableProducts {
  type: ProductsActionEnum.GET_AVAILABLE_PRODUCTS
  payload: IProducts
}

export interface IHideProduct {
  type: ProductsActionEnum.HIDE_PRODUCT
  payload: IProductsDate
}

export interface IShowProduct {
  type: ProductsActionEnum.SHOW_PRODUCT
  payload: IProductsDate
}

export interface IFindCategory {
  type: CategoryActionEnum.FIND_CATEGORY
  payload: ICategories
}

export interface IPickUpPointDate {
  id: string
  address: string
  workingHours: string
  coordinates: [number, number]
  description: string
  shown: boolean
  createdAt: string
  updatedAt: string
}

export interface IGetPartOfPickUpPoints {
  type: PickUpPointActionEnum.GET_PART_OF_PICK_UP_POINTS
  payload: IPickUpPoints
}

export interface IFindPickUpPoints {
  type: PickUpPointActionEnum.FIND_PICK_UP_POINTS
  payload: IFindPickUpPointsDate
}

export interface IUpdatePickUpPoints {
  type: PickUpPointActionEnum.UPDATE_PICK_UP_POINTS
  payload: IPickUpPointDate
}

export interface IHidePickUpPoints {
  type: PickUpPointActionEnum.HIDE_PICK_UP_POINTS
  payload: IPickUpPointDate
}

export interface IShowPickUpPoints {
  type: PickUpPointActionEnum.SHOW_PICK_UP_POINTS
  payload: IPickUpPointDate
}

export interface ICreatePickUpPoint {
  type: PickUpPointActionEnum.CREATE_PICK_UP_POINTS
  payload: IPickUpPointDate
}

export interface IPickUpPoints {
  pickUpPoints: IPickUpPointDate[]
  amount: number
  metricsArray: IMetricsDate[]
}

export interface ICreatePickUpFormBody {
  address: string
  description: string
  coordinates: [number, number]
  workingHours: string
}

export interface IFindPickUpPointsDate {
  pickUpPoints: IPickUpPointDate[]
  amount: number
}
