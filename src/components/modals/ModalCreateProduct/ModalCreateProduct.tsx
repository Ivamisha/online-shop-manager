import { FC } from 'react'
import { useActions, useTypeSelector } from '../../../hooks'
import { makeStyles } from '@mui/styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Dropzone from 'react-dropzone'
import {
  Grid,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Button,
  Paper,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import type { IModalCreateProduct, IProductCreateForm } from './interface'
import { modalManageProductScheme } from '../../../helpers/validator'
import { createProductForm } from '../../../constants'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    '&.MuiPaper-root': {
      maxWidth: '800px',
    },
  },
  dropZone: {
    '&.MuiPaper-root': {
      height: ' 60%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      width: '88%',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'gray',
    },
  },
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      width: '10rem',
    },
  },
}))

const defaultValues = {
  name: '',
  image: undefined,
  price: 0,
  quantity: 0,
  description: '',
  category: '',
}

const ModalCreateCategory: FC<IModalCreateProduct> = ({
  isModalCreateProductOpen,
  setIsModalCreateProductOpen,
}) => {
  const { createProduct } = useActions()
  const { categories } = useTypeSelector((state) => state.categories)
  const classes = useStyles()
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IProductCreateForm>({
    resolver: yupResolver(modalManageProductScheme),
    defaultValues,
  })

  const handleClose = () => {
    setIsModalCreateProductOpen(false)
    reset({})
  }

  const onSubmit: SubmitHandler<IProductCreateForm> = (data) => {
    const formData = new FormData()
    formData.append('file', data.image[0])
    formData.append('name', data.name)
    formData.append('price', data.price.toString())
    formData.append('quantity', data.quantity.toString())
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('shown', 'true')
    createProduct(formData)
    setIsModalCreateProductOpen(false)
    reset({})
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', maxWidth: '80rem' } }}
      open={isModalCreateProductOpen}
      onClose={handleClose}
      className={classes.background}
    >
      <DialogTitle>Создание</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText textAlign="center" fontWeight="bold">
            Пожалуйста, введите данные о товаре
          </DialogContentText>

          <Grid container>
            <Grid item lg={6}>
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Dropzone onDrop={onChange}>
                      {({ getRootProps, getInputProps }) => (
                        <Paper className={classes.dropZone} variant="outlined" {...getRootProps()}>
                          <AddAPhotoIcon />
                          <input {...getInputProps()} name="image" onBlur={onBlur} />
                          <p>Перетащите файлы в данное поле</p>
                        </Paper>
                      )}
                    </Dropzone>

                    <List>
                      {value?.map((f, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <img
                              style={{ width: '25px', height: '25px' }}
                              src={URL.createObjectURL(f)}
                              alt="img"
                            />
                          </ListItemIcon>
                          <ListItemText primary={f.name} secondary={f.size} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              />
            </Grid>

            <Grid item lg={6}>
              <Grid container>
                <Grid item lg={12}>
                  {createProductForm.map(({ label, inputName, type }, index) => (
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
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Статус"
                        variant="filled"
                        size="small"
                        color="primary"
                        margin="dense"
                        fullWidth
                      >
                        {categories
                          ?.filter((categories) => categories.shown)
                          .map((category, index) => (
                            <MenuItem key={index} value={category.id}>
                              {category.title}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
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
