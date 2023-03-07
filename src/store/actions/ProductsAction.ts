import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import ProductsServices from '../../api/ProductsServices'
import {
  ProductsActionEnum,
  ProductsActionType,
  AdminActionType,
  AdminActionEnum,
} from '../../models/redux'

let timeout: ReturnType<typeof setTimeout> | null = null

const sendErrorToSnack = (dispatch: Dispatch<AdminActionType>, error: AxiosError): void => {
  if (timeout) {
    clearTimeout(timeout)
  }
  dispatch({
    type: AdminActionEnum.ADMIN_ERROR_OPEN_SNACKBAR,
    payload: { error: error?.response?.data.error, openSnack: true },
  })
  timeout = setTimeout(() => {
    dispatch({
      type: AdminActionEnum.ADMIN_ERROR_OPEN_SNACKBAR,
      payload: { error: '', openSnack: false },
    })
  }, 5000)
}

export const getAllProducts = () => async (dispatch: Dispatch<ProductsActionType>) => {
  try {
    const response = await ProductsServices.getAllProducts()
    dispatch({
      type: ProductsActionEnum.GET_ALL_PRODUCTS,
      payload: { products: response.products, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const getAvailableProducts =
  (
    page: number,
    limit: number,
    visibility: boolean,
    sortField?: string,
    sortWay?: 'asc' | 'desc'
  ) =>
  async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.getPartOfProducts(
        page,
        limit,
        visibility,
        sortField,
        sortWay
      )
      dispatch({
        type: ProductsActionEnum.GET_AVAILABLE_PRODUCTS,
        payload: { products: response.products, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const getPartOfProducts =
  (page: number, limit: number) => async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.getPartOfProducts(page, limit)
      dispatch({
        type: ProductsActionEnum.GET_PART_OF_PRODUCTS,
        payload: { products: response.products, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const getGoodsByCategories =
  (category: string, sortField?: string, sortWay?: 'asc' | 'desc') =>
  async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.getProductsByCategories(category, sortField, sortWay)
      dispatch({
        type: ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY,
        payload: { products: response.products, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const createProduct =
  (formdata: FormData) => async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.createProduct(formdata)
      dispatch({
        type: ProductsActionEnum.CREATE_PRODUCT,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const updateProducts =
  (id: string, data: FormData) => async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.updateProducts(id, data)
      dispatch({
        type: ProductsActionEnum.UPDATE_PRODUCT,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const findProduct =
  (product: string, sortField?: string, sortWay?: 'asc' | 'desc') =>
  async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.findProducts(product, sortField, sortWay)
      dispatch({
        type: ProductsActionEnum.FIND_PRODUCT,
        payload: { products: response.products, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const hideProduct = (id: string) => async (dispatch: Dispatch<ProductsActionType>) => {
  try {
    const response = await ProductsServices.changeProductVisibility(id, false)
    dispatch({
      type: ProductsActionEnum.HIDE_PRODUCT,
      payload: response,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const showProduct = (id: string) => async (dispatch: Dispatch<ProductsActionType>) => {
  try {
    const response = await ProductsServices.changeProductVisibility(id, true)
    dispatch({
      type: ProductsActionEnum.SHOW_PRODUCT,
      payload: response,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}
