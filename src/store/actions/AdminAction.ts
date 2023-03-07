import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import AuthService from '../../api/AuthServices'
import { AdminActionEnum, AdminActionType } from '../../models/redux'

let timeout: ReturnType<typeof setTimeout> | null = null

const sendErrorToSnack = (dispatch: Dispatch<AdminActionType>, error: AxiosError): void => {
  if (timeout) {
    clearTimeout(timeout)
  }

  dispatch({
    type: AdminActionEnum.ADMIN_AUTHORIZED_ERROR,
    payload: { error: error?.response?.data.error, openSnack: true },
  })

  timeout = setTimeout(() => {
    dispatch({
      type: AdminActionEnum.ADMIN_ERROR_OPEN_SNACKBAR,
      payload: { error: '', openSnack: false },
    })
  }, 1000)
}

export const login =
  (email: string, password: string) => async (dispatch: Dispatch<AdminActionType>) => {
    try {
      const response = await AuthService.login(email, password)
      dispatch({
        type: AdminActionEnum.ADMIN_LOGIN,
        payload: {
          admin: response,
          isAuth: true,
        },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const logout = () => async (dispatch: Dispatch<AdminActionType>) => {
  try {
    await AuthService.logout()
    dispatch({
      type: AdminActionEnum.ADMIN_LOGOUT,
      payload: false,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const checkAuth = () => async (dispatch: Dispatch<AdminActionType>) => {
  try {
    dispatch({
      type: AdminActionEnum.START_LOADING,
      payload: true,
    })
    const response = await AuthService.checkAuth()
    dispatch({
      type: AdminActionEnum.ADMIN_AUTHORIZED_CHECK,
      payload: {
        admin: response,
        isAuth: true,
      },
    })
  } catch (error) {
    dispatch({
      type: AdminActionEnum.ADMIN_AUTHORIZED_CHECK,
      payload: {
        admin: undefined,
        isAuth: false,
      },
    })
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}
