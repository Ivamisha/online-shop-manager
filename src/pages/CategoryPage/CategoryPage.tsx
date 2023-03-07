import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import {
  CategoriesTable,
  CategoriesForm,
  ModalCreateCategory,
  ModalUpdateCategory,
} from '../../components'
import { useActions, useDebounce } from '../../hooks'
import { ICategoryDate } from '../../models/redux'

const CategoryPage = () => {
  const { getPartOfCategories, findCategory } = useActions()
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false)
  const [isShowHidedProducts, setIsShowHidedProducts] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch = useDebounce(searchValue, 200)
  const [chosenCategory, setChosenCategory] = useState({})
  const [chosenSortingField, setChosenSortingField] = useState<string>('title')
  const [chosenSortingWay, setChosenSortingWay] = useState<'asc' | 'desc' | undefined>()
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  useEffect(() => {
    debounceSearch.length >= 3
      ? findCategory(debounceSearch, chosenSortingField, chosenSortingWay)
      : getPartOfCategories(
          page + 1,
          rowsPerPage,
          chosenSortingWay,
          chosenSortingField,
          isShowHidedProducts
        )
  }, [
    rowsPerPage,
    page,
    chosenSortingWay,
    chosenSortingField,
    isShowHidedProducts,
    chosenCategory,
    debounceSearch,
  ])

  return (
    <Grid container alignContent="flex-start">
      <CategoriesForm
        setSearchValue={setSearchValue}
        isShowHidedProducts={isShowHidedProducts}
        setIsShowHidedProducts={setIsShowHidedProducts}
        setIsModalCreateOpen={setIsModalCreateOpen}
      />

      <ModalCreateCategory
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
      />

      <ModalUpdateCategory
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        chosenCategory={chosenCategory as unknown as ICategoryDate}
        setChosenCategory={setChosenCategory}
      />

      <CategoriesTable
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        chosenSortingField={chosenSortingField}
        setChosenSortingField={setChosenSortingField}
        setChosenSortingWay={setChosenSortingWay}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        setChosenCategory={setChosenCategory}
      />
    </Grid>
  )
}

export default CategoryPage
