import { FC } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import type { IModalUpdateProduct } from './interface'
import { ModalUpdateProductForm } from '../..'

const ModalUpdateProduct: FC<IModalUpdateProduct> = ({
  chosenProduct,
  isModalUpdateProductOpen,
  setIsModalUpdateProductOpen,
}) => {
  const handleClose = () => {
    setIsModalUpdateProductOpen(false)
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', maxWidth: '80rem' } }}
      open={isModalUpdateProductOpen}
      onClose={handleClose}
    >
      <DialogTitle>Редактируйте товар</DialogTitle>

      <DialogContent>
        <DialogContentText>Пожалуйста, измените желаемую информацию о товаре</DialogContentText>
      </DialogContent>

      <ModalUpdateProductForm chosenProduct={chosenProduct} handleClose={handleClose} />
    </Dialog>
  )
}

export default ModalUpdateProduct
