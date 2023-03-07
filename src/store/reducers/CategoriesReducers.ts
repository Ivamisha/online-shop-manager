import {
  CategoriesActionType,
  CategoryActionEnum,
  ICategoryInitialStateProps,
  ICategoryDate,
} from '../../models/redux'

const initialState: ICategoryInitialStateProps = {
  categories: undefined,
  category: undefined,
  error: '',
  openSnack: false,
  amount: 0,
  isCategoryLoading: false,
}

export const CategoriesReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: CategoriesActionType
): ICategoryInitialStateProps => {
  switch (action.type) {
    case CategoryActionEnum.START_LOADING:
      return { ...state, isCategoryLoading: action.payload }
    case CategoryActionEnum.CATEGORIES_ERRORS:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case CategoryActionEnum.CATEGORIES_ERROR_CLOSE_SNACKBAR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case CategoryActionEnum.GET_PART_OF_CATEGORIES:
      return {
        ...state,
        categories: (action.payload?.categories as ICategoryDate[]) ?? [],
        amount: action.payload?.amount as number,
        isCategoryLoading: false,
      }
    case CategoryActionEnum.GET_ALL_AVAILABLE_CAEGORIES:
      return {
        ...state,
        categories: (action.payload?.categories as ICategoryDate[]) ?? [],
        amount: action.payload?.amount as number,
        isCategoryLoading: false,
      }
    case CategoryActionEnum.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: (action.payload?.categories as ICategoryDate[]) ?? [],
        amount: action.payload?.amount as number,
        isCategoryLoading: false,
      }
    case CategoryActionEnum.CREATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        categories: state.categories?.concat(action.payload),
        amount: state.amount + 1,
        isCategoryLoading: false,
      }
    case CategoryActionEnum.FIND_CATEGORY:
      return {
        ...state,
        categories: action.payload?.categories,
        amount: action.payload?.amount,
      }
    case CategoryActionEnum.UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        categories: state.categories?.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        amount: state.amount,
        isCategoryLoading: false,
      }
    default:
      return state
  }
}
