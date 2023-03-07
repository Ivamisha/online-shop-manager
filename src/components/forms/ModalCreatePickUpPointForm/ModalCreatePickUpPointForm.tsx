import { FC, useEffect } from 'react'
import { useActions } from '../../../hooks'
import { makeStyles } from '@mui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { modalManagePickUpPointScheme } from '../../../helpers/validator'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Grid, TextField, Theme, Button } from '@mui/material'
import type { IModalCreatePickUpPointForm, IPickUpCreateForm } from './interface'

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

const ModalCreatePickUpPointForm: FC<IModalCreatePickUpPointForm> = ({
  handleClose,
  setChosenMapPoint,
  chosenMapPoint,
}) => {
  const { createPickUpPoint } = useActions()
  const classes = useStyles()
  const defaultValues = {
    address: '',
    latitude: 0,
    longitude: 0,
    description: '',
    timeOpen: '',
    timeClose: '',
  }
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm<IPickUpCreateForm>({
    resolver: yupResolver(modalManagePickUpPointScheme),
    defaultValues,
  })

  const onSubmit: SubmitHandler<IPickUpCreateForm> = (data) => {
    createPickUpPoint(
      data.address,
      data.description,
      [data.latitude, data.longitude],
      data.timeOpen + '-' + data.timeClose
    )
    handleClose()
    reset({})
  }

  useEffect(() => {
    setValue('latitude', chosenMapPoint ? chosenMapPoint[0] : 0)
    setValue('longitude', chosenMapPoint ? chosenMapPoint[1] : 0)
  }, [chosenMapPoint])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container pl={3}>
        <Grid item xl={6} pt={3}>
          <Controller
            control={control}
            name="latitude"
            render={({ field }) => (
              <TextField
                type="text"
                disabled
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                error={!!errors.latitude}
                fullWidth
                helperText={errors.latitude?.message ?? null}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xl={6} pt={3}>
          <Controller
            control={control}
            name="longitude"
            render={({ field }) => (
              <TextField
                type="text"
                disabled
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                error={!!errors.longitude}
                fullWidth
                helperText={errors.longitude?.message ?? null}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} pt={2}>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField
                type="text"
                label="Введите адрес"
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                error={!!errors.address}
                fullWidth
                helperText={errors.address?.message ?? null}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} pt={2}>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                type="text"
                label="Описание пункта выдачи"
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                error={!!errors.description}
                fullWidth
                helperText={errors.description?.message ?? null}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid xl={6} pt={2}>
          <Controller
            control={control}
            name="timeOpen"
            render={({ field }) => (
              <TextField
                type="time"
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                error={!!errors.timeOpen}
                fullWidth
                helperText={errors.timeOpen?.message ?? null}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid xl={6} pt={2}>
          <Controller
            control={control}
            name="timeClose"
            render={({ field }) => (
              <TextField
                type="time"
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                error={!!errors.timeClose}
                fullWidth
                helperText={errors.timeClose?.message ?? null}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="space-evenly" pt={3}>
        <Button className={classes.button} onClick={handleClose}>
          Отмена
        </Button>

        <Button className={classes.button} type="submit">
          Сохранить
        </Button>
      </Grid>
    </form>
  )
}

export default ModalCreatePickUpPointForm
