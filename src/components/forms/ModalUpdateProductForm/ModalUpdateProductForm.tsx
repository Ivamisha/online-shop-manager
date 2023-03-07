import { FC } from 'react'
import { useActions, useTypeSelector } from '../../../hooks'
import { makeStyles } from '@mui/styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import {
  Grid,
  Box,
  TextField,
  DialogActions,
  MenuItem,
  Button,
  Paper,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Select,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { modalManageProductScheme } from '../../../helpers/validator'
import type { IProductUpdateForm } from '../../modals/ModalUpdateProduct/interface'
import { createProductForm } from '../../../constants'
import { Theme } from '@mui/material'
import { IModalUpdateFormProps } from '.'

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

const ModalUpdateProductForm: FC<IModalUpdateFormProps> = ({ chosenProduct, handleClose }) => {
  const defaultValues = {
    name: chosenProduct.name,
    image: [],
    price: chosenProduct.price,
    quantity: chosenProduct.quantity,
    description: chosenProduct.description,
    category: chosenProduct.category,
  }

  const { updateProducts } = useActions()
  const { categories } = useTypeSelector((state) => state.categories)
  const classes = useStyles()
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IProductUpdateForm>({
    resolver: yupResolver(modalManageProductScheme),
    defaultValues,
  })

  const onSubmit: SubmitHandler<IProductUpdateForm> = (data) => {
    const formData = new FormData()
    formData.append('file', data.image[0])
    formData.append('name', data.name)
    formData.append('price', data.price.toString())
    formData.append('quantity', data.quantity.toString())
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('shown', 'true')
    updateProducts(chosenProduct.id, formData)
    handleClose()
    reset({})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Select
                    {...field}
                    label="категория"
                    variant="filled"
                    size="small"
                    color="primary"
                    margin="dense"
                    fullWidth
                  >
                    {categories
                      ?.filter((filterCategory) => filterCategory.shown)
                      .map((category, index) => (
                        <MenuItem key={index} value={category.title}>
                          {category.title}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DialogActions>
        <Button className={classes.button} onClick={handleClose}>
          Отмена
        </Button>

        <Button className={classes.button} type="submit">
          Изменить
        </Button>
      </DialogActions>
    </form>
  )
}
export default ModalUpdateProductForm
