import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import PickUpPointsServices from '../../api/PickUpPointServices'
import {
  PickUpPointActionEnum,
  PickUpPointsActionType,
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

export const getPartOfPickUpPoint =
  (
    page: number,
    limit: number,
    visibility: boolean,
    sortField?: string,
    sortWay?: 'asc' | 'desc'
  ) =>
  async (dispatch: Dispatch<PickUpPointsActionType>) => {
    try {
      const response = await PickUpPointsServices.getPartOfPickUpPoint(
        page,
        limit,
        visibility,
        sortField,
        sortWay
      )
      dispatch({
        type: PickUpPointActionEnum.GET_PART_OF_PICK_UP_POINTS,
        payload: {
          pickUpPoints: response.pickUpPoints,
          amount: response.amount,
          metricsArray: response.metricsArray,
        },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const createPickUpPoint =
  (address: string, description: string, coordinates: number[], workingHours: string) =>
  async (dispatch: Dispatch<PickUpPointsActionType>) => {
    try {
      const response = await PickUpPointsServices.createPickUpPoint(
        address,
        description,
        coordinates,
        workingHours
      )
      dispatch({
        type: PickUpPointActionEnum.CREATE_PICK_UP_POINTS,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const updatePickUpPoint =
  (id: string, address: string, description: string, coordinates: number[], workingHours: string) =>
  async (dispatch: Dispatch<PickUpPointsActionType>) => {
    try {
      const response = await PickUpPointsServices.updatePickUpPoint(
        id,
        address,
        description,
        coordinates,
        workingHours
      )
      dispatch({
        type: PickUpPointActionEnum.UPDATE_PICK_UP_POINTS,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const findPickUpPoint =
  (product: string, sortField?: string, sortWay?: 'asc' | 'desc') =>
  async (dispatch: Dispatch<PickUpPointsActionType>) => {
    try {
      const response = await PickUpPointsServices.findPickUpPoint(product, sortField, sortWay)
      dispatch({
        type: PickUpPointActionEnum.FIND_PICK_UP_POINTS,
        payload: { pickUpPoints: response.pickUpPoints, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const hidePickUpPoint =
  (id: string) => async (dispatch: Dispatch<PickUpPointsActionType>) => {
    try {
      const response = await PickUpPointsServices.hidePickUpProduct(id, false)
      dispatch({
        type: PickUpPointActionEnum.HIDE_PICK_UP_POINTS,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const showPickUpPoint =
  (id: string) => async (dispatch: Dispatch<PickUpPointsActionType>) => {
    try {
      const response = await PickUpPointsServices.hidePickUpProduct(id, true)
      dispatch({
        type: PickUpPointActionEnum.HIDE_PICK_UP_POINTS,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }
