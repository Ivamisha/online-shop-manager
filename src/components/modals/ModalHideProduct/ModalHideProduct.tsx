import { FC } from 'react'
import { useActions } from '../../../hooks'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Theme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { IModalHideProduct } from './interface'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
    },
  },
}))

const ModalHideProduct: FC<IModalHideProduct> = ({
  chosenProduct,
  isModalHideProductOpen,
  setIsModalHideProductOpen,
}) => {
  const { showProduct, hideProduct } = useActions()
  const handleClose = () => {
    setIsModalHideProductOpen(false)
  }
  const classes = useStyles()

  const handleChangeDisableValue = (shown: boolean) => {
    shown ? hideProduct(chosenProduct.id) : showProduct(chosenProduct.id)

    setIsModalHideProductOpen(false)
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', maxWidth: '80rem' } }}
      open={isModalHideProductOpen}
      onClose={handleClose}
    >
      <form>
        <DialogTitle>
          {chosenProduct.shown ? 'скрыть продукт' : 'открыть доступ к продукту'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {chosenProduct.shown
              ? 'Вы точно хотите скрыть продукт?'
              : 'Вы точно хотите открыть доступ к продукту?'}
          </DialogContentText>

          <DialogActions>
            <Button className={classes.button} onClick={handleClose}>
              Отмена
            </Button>

            <Button
              className={classes.button}
              onClick={() => handleChangeDisableValue(chosenProduct.shown)}
            >
              {chosenProduct.shown ? 'скрыть' : 'открыть доступ'}
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default ModalHideProduct
