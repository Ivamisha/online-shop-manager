import {
  PickUpPointsActionType,
  PickUpPointActionEnum,
  IPickUpPointInitialStateProps,
} from '../../models/redux'

const initialState: IPickUpPointInitialStateProps = {
  pickUpPoints: [],
  pickUpPoint: undefined,
  error: '',
  openSnack: false,
  amount: 0,
  metricsArray: [],
}

export const PickUpPointReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: PickUpPointsActionType
): IPickUpPointInitialStateProps => {
  switch (action.type) {
    case PickUpPointActionEnum.GET_PART_OF_PICK_UP_POINTS:
      return {
        ...state,
        pickUpPoints: action.payload?.pickUpPoints,
        amount: action.payload?.amount as number,
        metricsArray: action.payload.metricsArray,
      }
    case PickUpPointActionEnum.CREATE_PICK_UP_POINTS:
      return {
        ...state,
        pickUpPoint: action.payload,
        pickUpPoints: [...state.pickUpPoints, action.payload],
        amount: state.amount + 1,
        metricsArray: [
          ...state.metricsArray,
          {
            description: action.payload.description,
            id: action.payload.id,
            shown: action.payload.shown,
            coordinates: action.payload.coordinates,
          },
        ],
      }
    case PickUpPointActionEnum.UPDATE_PICK_UP_POINTS:
      return {
        ...state,
        pickUpPoint: action.payload,
        pickUpPoints: state.pickUpPoints?.map((products) =>
          products.id === action.payload.id ? action.payload : products
        ),
        amount: state.amount,
        metricsArray: state.metricsArray.map((element) =>
          element.id === action.payload.id
            ? { ...element, coordinates: action.payload.coordinates }
            : element
        ),
      }
    case PickUpPointActionEnum.FIND_PICK_UP_POINTS:
      return {
        ...state,
        pickUpPoints: action.payload?.pickUpPoints,
        amount: action.payload?.amount,
      }
    case PickUpPointActionEnum.HIDE_PICK_UP_POINTS:
      return {
        ...state,
        pickUpPoint: action.payload,
        pickUpPoints: state.pickUpPoints
          ?.map((pickUpPoint) =>
            pickUpPoint.id === action.payload.id ? action.payload : pickUpPoint
          )
          .filter((pickUpPoint) => pickUpPoint.shown !== action.payload.shown),
        amount: state.amount - 1,
        metricsArray: state.metricsArray.map((element) =>
          element.id === action.payload.id ? { ...element, shown: false } : element
        ),
      }
    case PickUpPointActionEnum.SHOW_PICK_UP_POINTS:
      return {
        ...state,
        pickUpPoint: action.payload,
        pickUpPoints: state.pickUpPoints
          ?.map((pickUpPoint) =>
            pickUpPoint.id === action.payload.id ? action.payload : pickUpPoint
          )
          .filter((pickUpPoint) => pickUpPoint.shown !== action.payload.shown),
        amount: state.amount - 1,
        metricsArray: state.metricsArray.map((element) =>
          element.id === action.payload.id ? { ...element, shown: true } : element
        ),
      }
    default:
      return state
  }
}
