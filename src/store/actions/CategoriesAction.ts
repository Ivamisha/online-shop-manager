import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import CategoriesServices from '../../api/CategoriesServices'
import {
  CategoryActionEnum,
  CategoriesActionType,
  AdminActionEnum,
  AdminActionType,
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

export const getPartOfCategories =
  (page: number, limit: number, sortWay?: 'asc' | 'desc', sortField?: string, shown?: boolean) =>
  async (dispatch: Dispatch<CategoriesActionType>) => {
    try {
      const response = await CategoriesServices.getPartOfCategories(
        page,
        limit,
        sortWay,
        sortField,
        shown
      )
      dispatch({
        type: CategoryActionEnum.GET_PART_OF_CATEGORIES,
        payload: { categories: response.categories, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const getAllCategories = () => async (dispatch: Dispatch<CategoriesActionType>) => {
  try {
    const response = await CategoriesServices.getPartOfCategories()
    dispatch({
      type: CategoryActionEnum.GET_ALL_CATEGORIES,
      payload: { categories: response.categories, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const getAllAvailableCategories = () => async (dispatch: Dispatch<CategoriesActionType>) => {
  try {
    const response = await CategoriesServices.getAllAvailableCategories()
    dispatch({
      type: CategoryActionEnum.GET_ALL_CATEGORIES,
      payload: { categories: response.categories, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const createCategory =
  (title: string, description: string) => async (dispatch: Dispatch<CategoriesActionType>) => {
    try {
      const response = await CategoriesServices.createCategory(title, description)
      dispatch({
        type: CategoryActionEnum.CREATE_CATEGORY,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const updateCategory =
  (id: string, title: string, description: string, shown: 'true' | 'false') =>
  async (dispatch: Dispatch<CategoriesActionType>) => {
    try {
      const response = await CategoriesServices.updateCategory(id, title, description, shown)
      dispatch({
        type: CategoryActionEnum.UPDATE_CATEGORY,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const findCategory =
  (categories: string, sortField?: string, sortWay?: 'asc' | 'desc') =>
  async (dispatch: Dispatch<CategoriesActionType>) => {
    try {
      const response = await CategoriesServices.findCategory(categories, sortField, sortWay)
      dispatch({
        type: CategoryActionEnum.FIND_CATEGORY,
        payload: { categories: response.categories, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }
