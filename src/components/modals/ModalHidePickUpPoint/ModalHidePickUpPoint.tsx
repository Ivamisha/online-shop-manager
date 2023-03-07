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
import type { IModalHidePickUpPoint } from './interface'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
      '&:hover': {
        background: theme.palette.secondary.main,
      },
    },
  },
}))

const ModalHidePickUpPoint: FC<IModalHidePickUpPoint> = ({
  chosenPickUpPoint,
  isModalHidePickUpPointOpen,
  setIsModalHidePickUpPoint,
}) => {
  const { showPickUpPoint, hidePickUpPoint } = useActions()
  const handleClose = () => {
    setIsModalHidePickUpPoint(false)
  }
  const classes = useStyles()

  const handleChangeDisableValue = (shown: boolean) => {
    shown ? hidePickUpPoint(chosenPickUpPoint.id) : showPickUpPoint(chosenPickUpPoint.id)
    setIsModalHidePickUpPoint(false)
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', maxWidth: '80rem' } }}
      open={isModalHidePickUpPointOpen}
      onClose={handleClose}
    >
      <form>
        <DialogTitle>
          {chosenPickUpPoint.shown ? 'скрыть пункт выдачи' : 'открыть доступ к пункту выдачи'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {chosenPickUpPoint.shown
              ? 'Вы точно хотите скрыть продукт?'
              : 'Вы точно хотите открыть доступ к продукту?'}
          </DialogContentText>

          <DialogActions>
            <Button className={classes.button} onClick={handleClose}>
              Отмена
            </Button>

            <Button
              className={classes.button}
              onClick={() => handleChangeDisableValue(chosenPickUpPoint.shown)}
            >
              {chosenPickUpPoint.shown ? 'скрыть' : 'открыть доступ'}
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default ModalHidePickUpPoint
