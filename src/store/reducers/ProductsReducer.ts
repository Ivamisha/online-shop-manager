import {
  ProductsActionType,
  ProductsActionEnum,
  IProductsInitialStateProps,
} from '../../models/redux'

const initialState: IProductsInitialStateProps = {
  products: [],
  product: undefined,
  error: '',
  openSnack: false,
  amount: 0,
}

export const ProductsReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: ProductsActionType
): IProductsInitialStateProps => {
  switch (action.type) {
    case ProductsActionEnum.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload?.products,
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload?.products,
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.GET_PART_OF_PRODUCTS:
      return {
        ...state,
        products: action.payload?.products,
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.GET_AVAILABLE_PRODUCTS:
      return {
        ...state,
        products: action.payload?.products,
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.CREATE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        products: [...state.products, action.payload],
        amount: state.amount + 1,
      }
    case ProductsActionEnum.UPDATE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        products: state.products?.map((products) =>
          products.id === action.payload.id ? action.payload : products
        ),
        amount: state.amount,
      }
    case ProductsActionEnum.FIND_PRODUCT:
      return {
        ...state,
        products: action.payload?.products,
        amount: action.payload?.amount,
      }
    case ProductsActionEnum.HIDE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        products: state.products
          ?.map((product) => (product.id === action.payload.id ? action.payload : product))
          .filter((product) => product.shown !== action.payload.shown),
        amount: state.amount - 1,
      }
    case ProductsActionEnum.SHOW_PRODUCT:
      return {
        ...state,
        product: action.payload,
        products: state.products
          ?.map((product) => (product.id === action.payload.id ? action.payload : product))
          .filter((product) => product.shown !== action.payload.shown),
        amount: state.amount - 1,
      }
    default:
      return state
  }
}
