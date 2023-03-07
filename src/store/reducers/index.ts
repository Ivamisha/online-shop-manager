import { combineReducers } from 'redux'
import { AdminReducer } from './AdminReducer'
import { CategoriesReducer } from './CategoriesReducers'
import { ProductsReducer } from './ProductsReducer'
import { PickUpPointReducer } from './PickUpPointsReducer'

export const rootReducer = combineReducers({
  admin: AdminReducer,
  categories: CategoriesReducer,
  products: ProductsReducer,
  pickUpProduct: PickUpPointReducer,
})

export type RootState = ReturnType<typeof rootReducer>
