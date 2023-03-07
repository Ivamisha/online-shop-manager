import * as AdminActionTypes from './AdminAction'
import * as CategoryActionTypes from './CategoriesAction'
import * as ProductsActionTypes from './ProductsAction'
import * as PickUpPointsActionTypes from './PickUpPointsAction'

export default {
  ...AdminActionTypes,
  ...CategoryActionTypes,
  ...ProductsActionTypes,
  ...PickUpPointsActionTypes,
}
