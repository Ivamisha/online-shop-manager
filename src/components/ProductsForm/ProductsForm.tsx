import { FC } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button, MenuItem, TextField, Theme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useActions, useTypeSelector } from '../../hooks'
import type { IProductFormProps } from './interface'

const defaultValues = {
  chosenCategory: '',
}

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    '&.MuiButton-root ': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

const ProductsForm: FC<IProductFormProps> = ({
  setChosenCategory,
  setSearchValue,
  isShowHidedProducts,
  setIsShowHidedProducts,
  setIsModalCreateProductOpen,
  productTablePage,
  rowsPerPage,
}) => {
  const { control } = useForm({
    defaultValues,
  })
  const classes = useStyles()
  const { categories } = useTypeSelector((state) => state.categories)
  const { getGoodsByCategories, getAvailableProducts } = useActions()

  const getGoodsByCategoryCondition = (category: string): void => {
    setChosenCategory(category)
    getGoodsByCategories(category)
  }

  const hideOrShowDisableProducts = (status: boolean) => {
    if (status) {
      setIsShowHidedProducts(true)
      getAvailableProducts(productTablePage + 1, rowsPerPage, false)
    }
    if (!status) {
      getAvailableProducts(productTablePage + 1, rowsPerPage, true)
      setIsShowHidedProducts(false)
    }
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Button className={classes.buttonStyle} onClick={() => setIsModalCreateProductOpen(true)}>
          Добавить товар
        </Button>
      </Grid>

      <Grid item lg={5}>
        <Controller
          name="chosenCategory"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              onChange={(e) => getGoodsByCategoryCondition((e.target as HTMLInputElement).value)}
              label="Найти товары по категории"
              variant="filled"
              size="small"
              color="primary"
              margin="dense"
              fullWidth
            >
              {categories
                ?.filter((category) => category.shown)
                .map((category) => (
                  <MenuItem key={category.id} value={category.title}>
                    {category.title}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Поиск товаров"
          variant="filled"
          size="small"
          color="primary"
          margin="dense"
          onChange={(e) => setSearchValue(e.target.value.toString())}
        />
      </Grid>

      <Grid item>
        <Button
          className={classes.buttonStyle}
          onClick={() => hideOrShowDisableProducts(!isShowHidedProducts)}
        >
          {isShowHidedProducts ? 'показать только доступные' : 'показать скрытые товары'}
        </Button>
      </Grid>
    </Grid>
  )
}
export default ProductsForm
