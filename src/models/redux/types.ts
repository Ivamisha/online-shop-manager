import {
  IAdminLoginAction,
  IAdminErrorOpenSnack,
  IAdminAuthorizedErrorAction,
  IGetAllCategoriesAction,
  ICategoriesCloseSnack,
  ICategoriesErrors,
  IAdminLogout,
  IAdminCheckAuthrization,
  IStartLoading,
  IGetPartOfCategories,
  ICreateCategory,
  IUpdateCategory,
  IGetAllProducts,
  IGetProductsByCategory,
  IGetAllAvailableCategoriesAction,
  ICreateProduct,
  IUpdateProduct,
  IFindProduct,
  IGetPartOfProducts,
  IGetAvailableProducts,
  ICategoryStartLoading,
  IHideProduct,
  IShowProduct,
  IFindCategory,
  IFindPickUpPoints,
  IGetPartOfPickUpPoints,
  IUpdatePickUpPoints,
  IHidePickUpPoints,
  ICreatePickUpPoint,
  IShowPickUpPoints,
} from './interfaces'

export type AdminActionType =
  | IStartLoading
  | IAdminLoginAction
  | IAdminErrorOpenSnack
  | IAdminAuthorizedErrorAction
  | IAdminLogout
  | IAdminCheckAuthrization

export type CategoriesActionType =
  | IGetAllAvailableCategoriesAction
  | IGetAllCategoriesAction
  | ICategoriesErrors
  | ICategoriesCloseSnack
  | IGetPartOfCategories
  | ICreateCategory
  | IUpdateCategory
  | ICategoryStartLoading
  | IFindCategory

export type ProductsActionType =
  | IGetAllProducts
  | IGetProductsByCategory
  | IGetAvailableProducts
  | IGetPartOfProducts
  | ICreateProduct
  | IUpdateProduct
  | IFindProduct
  | IHideProduct
  | IShowProduct

export type PickUpPointsActionType =
  | IFindPickUpPoints
  | IGetPartOfPickUpPoints
  | IUpdatePickUpPoints
  | IHidePickUpPoints
  | ICreatePickUpPoint
  | IShowPickUpPoints
