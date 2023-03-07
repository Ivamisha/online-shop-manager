import { FC } from 'react'
import type { ICategoryUpdateForm } from '../../modals/ModalUpdateCategory/interface'
import { useActions } from '../../../hooks'
import { makeStyles } from '@mui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Grid, Box, TextField, MenuItem, Theme, Button } from '@mui/material'
import { modalManageCategoryScheme } from '../../../helpers/validator'
import { createCategoryForm } from '../../../constants'
import { ICategoryDate } from '../../../models/redux'

export interface IModalUpdateCategoryFormProps {
  chosenCategory: ICategoryDate
  handleClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
    },
  },
}))

const ModalUpdateCategoryForm: FC<IModalUpdateCategoryFormProps> = ({
  chosenCategory: { id, title, description, shown },
  handleClose,
}) => {
  const { updateCategory } = useActions()
  const classes = useStyles()
  const defaultValues = {
    title: title,
    description: description,
    shown: shown,
  }
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<ICategoryUpdateForm>({
    resolver: yupResolver(modalManageCategoryScheme),
    defaultValues,
  })

  const onSubmit: SubmitHandler<ICategoryUpdateForm> = (data) => {
    updateCategory(id, data.title, data.description, `${data.shown}`)
    handleClose()
    reset({})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        {createCategoryForm.map(({ label, inputName }, index) => (
          <Box key={`input ${index}`}>
            <Controller
              control={control}
              name={inputName}
              render={({ field }) => (
                <TextField
                  label={label}
                  variant="filled"
                  size="small"
                  color="primary"
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

        <Box>
          <Controller
            name="shown"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="категория"
                variant="filled"
                size="small"
                color="primary"
                margin="dense"
                fullWidth
              >
                <MenuItem value="false">Скрыть</MenuItem>

                <MenuItem value="true">Открыть</MenuItem>
              </TextField>
            )}
          />
        </Box>
      </Grid>

      <Button className={classes.button} onClick={handleClose}>
        Отмена
      </Button>

      <Button className={classes.button} type="submit">
        Сохранить
      </Button>
    </form>
  )
}

export default ModalUpdateCategoryForm
