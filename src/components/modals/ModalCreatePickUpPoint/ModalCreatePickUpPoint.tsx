import { FC, useState } from 'react'
import { Grid, Dialog, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { IModalCreatePickUpPoint } from './interface'
import { ModalCreatePickUpPointForm } from '../../'
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

const ModalCreatePickUpPoint: FC<IModalCreatePickUpPoint> = ({
  isModalCreateOpen,
  setIsModalCreateOpen,
}) => {
  const [chosenMapPoint, setChosenMapPoint] = useState<number[]>([47.2608, 40.0555])
  const classes = useStyles()

  const handleClose = () => {
    setIsModalCreateOpen(false)
  }

  return (
    <Dialog
      maxWidth="md"
      PaperProps={{ style: { backgroundColor: 'white', width: '1200px' } }}
      open={isModalCreateOpen}
      onClose={handleClose}
    >
      <Grid container>
        <Grid className={classes.title} item xs={12}>
          <h1>Добавить пункт выдачи</h1>
        </Grid>

        <Grid item xs={12} m={2}>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <Map setChosenMapPoint={setChosenMapPoint} chosenMapPoint={chosenMapPoint} />
            </Grid>

            <Grid item xs={6} pl={2} pr={4} className={classes.formPage}>
              <Typography fontWeight="bold" variant="h5">
                Введите информацию о пункте выдачи
              </Typography>

              <ModalCreatePickUpPointForm
                handleClose={handleClose}
                chosenMapPoint={chosenMapPoint}
                setChosenMapPoint={setChosenMapPoint}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default ModalCreatePickUpPoint
