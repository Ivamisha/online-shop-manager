import { FC } from 'react'
import { useActions } from '../../../hooks'
import { makeStyles } from '@mui/styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Grid,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import type { ICategoryCreateForm, IModalCreateCategory } from './interface'
import { modalManageCategoryScheme } from '../../../helpers/validator'
import { createCategoryForm } from '../../../constants'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
    },
  },
}))

const defaultValues = {
  title: '',
  description: '',
}

const ModalCreateCategory: FC<IModalCreateCategory> = ({
  isModalCreateOpen,
  setIsModalCreateOpen,
}) => {
  const { createCategory } = useActions()
  const classes = useStyles()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<ICategoryCreateForm>({
    resolver: yupResolver(modalManageCategoryScheme),
    defaultValues,
  })

  const handleClose = () => {
    setIsModalCreateOpen(false)
    reset({})
  }

  const onSubmit: SubmitHandler<ICategoryCreateForm> = (data) => {
    createCategory(data.title, data.description)
    setIsModalCreateOpen(false)
    reset({})
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', maxWidth: '80rem' } }}
      open={isModalCreateOpen}
      onClose={handleClose}
    >
      <DialogTitle textAlign="center" fontWeight="bold">
        Создание категории
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText color="secondary.main" fontWeight="bold">
            Пожалуйста, введите название категории и дополнительную информацию
          </DialogContentText>

          <Grid>
            {createCategoryForm.map(({ label, inputName, type }, index) => (
              <Box key={`input ${index}`}>
                <Controller
                  name={inputName}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={label}
                      variant="filled"
                      size="small"
                      color="primary"
                      type={type}
                      margin="dense"
                      error={!!errors[inputName]}
                      fullWidth
                      helperText={errors[inputName] ? errors[inputName]?.message : null}
                      {...field}
                    />
                  )}
                />
              </Box>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button className={classes.button} onClick={handleClose}>
            Отмена
          </Button>

          <Button className={classes.button} type="submit">
            Создать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModalCreateCategory
