import { AdminActionType, AdminActionEnum, IAdminInitialStateProps } from '../../models/redux'

const initialState: IAdminInitialStateProps = {
  admin: undefined,
  isLoading: false,
  isAuth: false,
  error: '',
  openSnack: false,
}

export const AdminReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: AdminActionType
): IAdminInitialStateProps => {
  switch (action.type) {
    case AdminActionEnum.START_LOADING:
      return { ...state, isLoading: action.payload }
    case AdminActionEnum.ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload.admin,
        isAuth: action.payload.isAuth,
        isLoading: false,
      }
    case AdminActionEnum.ADMIN_ERROR_OPEN_SNACKBAR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case AdminActionEnum.ADMIN_AUTHORIZED_ERROR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case AdminActionEnum.ADMIN_LOGOUT:
      return { ...state, isAuth: action.payload, isLoading: false }
    case AdminActionEnum.ADMIN_AUTHORIZED_CHECK:
      return {
        ...state,
        admin: action.payload.admin,
        isAuth: action.payload.isAuth,
        isLoading: false,
      }
    default:
      return state
  }
}
