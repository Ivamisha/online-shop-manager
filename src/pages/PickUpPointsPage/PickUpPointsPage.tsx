import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useActions, useDebounce, useTypeSelector } from '../../hooks'
import {
  PickUpPointsForm,
  PickUpPointsTable,
  ModalCreatePickUpPoint,
  ModalShowMap,
  ModalUpdatePickUpPoint,
  ModalHidePickUpPoint,
} from '../../components'
import { IPickUpPointDate } from '../../models/redux/interfaces'

const PickUpPointsPage = () => {
  const [isModalCreatePickUpPointOpen, setIsModalCreatePickUpPointOpen] = useState<boolean>(false)
  const [isModalShowMap, setIsModalShowMap] = useState<boolean>(false)
  const [isModalUpdatePickUpPointOpen, setIsModalUpdatePickUpPointOpen] = useState<boolean>(false)
  const [isModalHidePickUpPointOpen, setIsModalHidePickUpPointOpen] = useState<boolean>(false)
  const [chosenPickUpPoint, setChosenPickUpPoint] = useState<IPickUpPointDate | {}>({})
  const { getPartOfPickUpPoint, findPickUpPoint } = useActions()
  const { amount } = useTypeSelector((state) => state.products)
  const [pickUpPointTablePage, setPickUpPointTablePage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [isShowHidedPickUpPoint, setIsShowHidedPickUpPoint] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch = useDebounce(searchValue, 200)
  const [chosenSortingField, setChosenSortingField] = useState<string>('name')
  const [chosenSortingWay, setChosenSortingWay] = useState<'asc' | 'desc' | undefined>()

  useEffect(() => {
    debounceSearch.length >= 3
      ? findPickUpPoint(debounceSearch, chosenSortingField, chosenSortingWay)
      : getPartOfPickUpPoint(
          pickUpPointTablePage + 1,
          rowsPerPage,
          !isShowHidedPickUpPoint,
          chosenSortingField,
          chosenSortingWay
        )
  }, [
    pickUpPointTablePage,
    rowsPerPage,
    debounceSearch,
    chosenSortingField,
    chosenSortingWay,
    isShowHidedPickUpPoint,
    amount,
  ])

  return (
    <Grid container alignContent="flex-start">
      <PickUpPointsForm
        setSearchValue={setSearchValue}
        isShowHidedPickUpPoints={isShowHidedPickUpPoint}
        pickUpPointsTablePage={pickUpPointTablePage}
        rowsPerPage={rowsPerPage}
        setIsModalCreatePickUpPointsOpen={setIsModalCreatePickUpPointOpen}
        setIsShowHidedPickUpPoints={setIsShowHidedPickUpPoint}
      />

      <PickUpPointsTable
        setIsModalShowMap={setIsModalShowMap}
        chosenSortingField={chosenSortingField}
        setChosenSortingField={setChosenSortingField}
        setChosenSortingWay={setChosenSortingWay}
        pickUpPointTablePage={pickUpPointTablePage}
        rowsPerPage={rowsPerPage}
        setPickUpPointTablePage={setPickUpPointTablePage}
        setRowsPerPage={setRowsPerPage}
        setIsModalUpdatePickUpPointOpen={setIsModalUpdatePickUpPointOpen}
        setIsModalHidePickUpPointOpen={setIsModalHidePickUpPointOpen}
        setChosenPickUpPoint={setChosenPickUpPoint}
      />

      <ModalCreatePickUpPoint
        isModalCreateOpen={isModalCreatePickUpPointOpen}
        setIsModalCreateOpen={setIsModalCreatePickUpPointOpen}
      />

      <ModalShowMap
        chosenPickUpPoint={chosenPickUpPoint as IPickUpPointDate}
        isModalShowMap={isModalShowMap}
        setIsModalShowMap={setIsModalShowMap}
      />

      <ModalUpdatePickUpPoint
        chosenPickUpPoint={chosenPickUpPoint as IPickUpPointDate}
        isModalUpdateOpen={isModalUpdatePickUpPointOpen}
        setIsModalUpdateOpen={setIsModalUpdatePickUpPointOpen}
      />

      <ModalHidePickUpPoint
        chosenPickUpPoint={chosenPickUpPoint as IPickUpPointDate}
        isModalHidePickUpPointOpen={isModalHidePickUpPointOpen}
        setIsModalHidePickUpPoint={setIsModalHidePickUpPointOpen}
      />
    </Grid>
  )
}

export default PickUpPointsPage
