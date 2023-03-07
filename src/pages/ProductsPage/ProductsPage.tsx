import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useActions, useDebounce, useTypeSelector } from '../../hooks'
import {
  ProductsForm,
  ProductsTable,
  ModalCreateProduct,
  ModalUpdateProduct,
  ModalHideProduct,
} from '../../components'
import { IProductsDate } from '../../models/redux'

const ProductsPage = () => {
  const [isModalCreateProductOpen, setIsModalCreateProductOpen] = useState<boolean>(false)
  const [isModalUpdateProductOpen, setIsModalUpdateProductOpen] = useState<boolean>(false)
  const [isModalHideProductOpen, setIsModalHideProductOpen] = useState<boolean>(false)
  const [chosenProduct, setChosenProduct] = useState({})
  const { getAllAvailableCategories, getAvailableProducts, findProduct, getGoodsByCategories } =
    useActions()
  const { amount } = useTypeSelector((state) => state.products)
  const [productTablePage, setProductTablePage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [isShowHidedProducts, setIsShowHidedProduct] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [chosenCategory, setChosenCategory] = useState<string>('')
  const debounceSearch = useDebounce(searchValue, 200)
  const [chosenSortingField, setChosenSortingField] = useState<string>('name')
  const [chosenSortingWay, setChosenSortingWay] = useState<'asc' | 'desc' | undefined>(undefined)

  useEffect(() => {
    if (!searchValue) {
      chosenCategory
        ? getGoodsByCategories(chosenCategory, chosenSortingField, chosenSortingWay)
        : getAvailableProducts(
            productTablePage + 1,
            rowsPerPage,
            !isShowHidedProducts,
            chosenSortingField,
            chosenSortingWay
          )
    }

    debounceSearch.length >= 3
      ? findProduct(debounceSearch, chosenSortingField, chosenSortingWay)
      : chosenCategory
      ? getGoodsByCategories(chosenCategory, chosenSortingField, chosenSortingWay)
      : getAvailableProducts(
          productTablePage + 1,
          rowsPerPage,
          !isShowHidedProducts,
          chosenSortingField,
          chosenSortingWay
        )
  }, [
    productTablePage,
    rowsPerPage,
    debounceSearch,
    chosenSortingField,
    chosenSortingWay,
    chosenCategory,
    amount,
  ])

  useEffect(() => {
    getAllAvailableCategories()
  }, [])

  return (
    <Grid container alignContent="flex-start">
      <ProductsForm
        setChosenCategory={setChosenCategory}
        setSearchValue={setSearchValue}
        isShowHidedProducts={isShowHidedProducts}
        setIsShowHidedProducts={setIsShowHidedProduct}
        productTablePage={productTablePage}
        rowsPerPage={rowsPerPage}
        setIsModalCreateProductOpen={setIsModalCreateProductOpen}
      />

      <ProductsTable
        chosenSortingField={chosenSortingField}
        setChosenSortingField={setChosenSortingField}
        setChosenSortingWay={setChosenSortingWay}
        productTablePage={productTablePage}
        rowsPerPage={rowsPerPage}
        setProductTablePage={setProductTablePage}
        setRowsPerPage={setRowsPerPage}
        setIsModalUpdateProductOpen={setIsModalUpdateProductOpen}
        setIsModalHideProductOpen={setIsModalHideProductOpen}
        setChosenProduct={setChosenProduct}
      />

      <ModalCreateProduct
        isModalCreateProductOpen={isModalCreateProductOpen}
        setIsModalCreateProductOpen={setIsModalCreateProductOpen}
      />

      <ModalUpdateProduct
        chosenProduct={chosenProduct as IProductsDate}
        isModalUpdateProductOpen={isModalUpdateProductOpen}
        setIsModalUpdateProductOpen={setIsModalUpdateProductOpen}
      />

      <ModalHideProduct
        chosenProduct={chosenProduct as IProductsDate}
        isModalHideProductOpen={isModalHideProductOpen}
        setIsModalHideProductOpen={setIsModalHideProductOpen}
      />
    </Grid>
  )
}

export default ProductsPage
