import { FC } from 'react'
import { Dialog, DialogContentText, DialogTitle, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ModalUpdateCategoryForm from '../../forms/ModalUpdateCategoryForm/ModalUpdateCategoryForm'
import type { IModalUpdateCategory } from './interface'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
    },
  },
}))

const ModalUpdateCategory: FC<IModalUpdateCategory> = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  chosenCategory,
  setChosenCategory,
}) => {
  const handleClose = () => {
    setIsModalUpdateOpen(false)
    setChosenCategory({})
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', width: '80rem' } }}
      open={isModalUpdateOpen}
      onClose={handleClose}
    >
      <DialogTitle>Изменение категории</DialogTitle>

      <DialogContentText>Пожалуйста, измените нужные вам значения</DialogContentText>

      <ModalUpdateCategoryForm chosenCategory={chosenCategory} handleClose={handleClose} />
    </Dialog>
  )
}

export default ModalUpdateCategory
