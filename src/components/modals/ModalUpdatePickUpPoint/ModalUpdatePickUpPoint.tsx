import { FC, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Dialog, Typography } from '@mui/material'
import type { IModalUpdatePickUpPointProps } from './interface'
import { ModalUpdatePickUpPointForm } from '../..'
import { Theme } from '@mui/material'
import Map from '../../Maps/Maps'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
    },
  },
  title: {
    '&.MuiGrid-root': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  formPage: {
    '&.MuiGrid-root': {
      background: theme.palette.secondary.gray,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
}))

const ModalUpdatePickUpPoint: FC<IModalUpdatePickUpPointProps> = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  chosenPickUpPoint,
}) => {
  const [chosenMapPoint, setChosenMapPoint] = useState<number[]>(chosenPickUpPoint.coordinates)
  const classes = useStyles()
  const handleClose = () => {
    setIsModalUpdateOpen(false)
  }

  return (
    <Dialog
      maxWidth="md"
      PaperProps={{ style: { backgroundColor: 'white', width: '1200px' } }}
      open={isModalUpdateOpen}
      onClose={handleClose}
    >
      <Grid container>
        <Grid className={classes.title} item xs={12}>
          <h1>Изменение пункта выдачи</h1>
        </Grid>
        <Grid item xs={12} m={2}>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <Map
                setChosenMapPoint={setChosenMapPoint}
                chosenMapPoint={chosenMapPoint}
                changeblePickUpPoint={chosenPickUpPoint}
              />
            </Grid>

            <Grid item xs={6} pl={2} pr={2} className={classes.formPage}>
              <Typography fontWeight="bold" variant="h5">
                Пожалуйста, заполните поля
              </Typography>

              <ModalUpdatePickUpPointForm
                handleClose={handleClose}
                chosenMapPoint={chosenMapPoint}
                setChosenMapPoint={setChosenMapPoint}
                chosenPickUpPoint={chosenPickUpPoint}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default ModalUpdatePickUpPoint
