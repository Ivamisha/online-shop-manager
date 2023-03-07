import { FC } from 'react'
import { Grid, Button, Theme, Box, Typography, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { ICategoriesForm } from './interface'
import ClassRoundedIcon from '@mui/icons-material/ClassRounded'
import DataThresholdingRoundedIcon from '@mui/icons-material/DataThresholdingRounded'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import { useTypeSelector } from '../../hooks'

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    '&.MuiButton-root': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.lightGreen,
      height: '5rem',
      width: '15rem',
    },
  },
  infoBox: {
    '&.MuiBox-root': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.pink,
      height: '5rem',
      minWidth: '13rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      flexDirection: 'column',
    },
  },
}))

const CategoriesForm: FC<ICategoriesForm> = ({
  setSearchValue,
  setIsModalCreateOpen,
  setIsShowHidedProducts,
  isShowHidedProducts,
}) => {
  const classes = useStyles()
  const { amount } = useTypeSelector((state) => state.categories)

  return (
    <Grid container justifyContent="space-between" pb={4}>
      <Grid item>
        <Button className={classes.buttonStyle} onClick={() => setIsModalCreateOpen(true)}>
          <ClassRoundedIcon />

          <Typography variant="button">Создать новую категорию</Typography>
        </Button>
      </Grid>

      <Grid item>
        <Box className={classes.infoBox} width="300px">
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            fontSize="20px"
          >
            <FindInPageIcon />
            <TextField label="Поиск" onChange={(e) => setSearchValue(e.target.value.toString())} />
          </Grid>
        </Box>
      </Grid>

      <Grid item max-width="50%">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Box className={classes.infoBox}>
              <Typography variant="h6">Всего категорий</Typography>

              <Grid container justifyContent="center" fontWeight="bold" fontSize="20px">
                <DataThresholdingRoundedIcon />

                {amount}
              </Grid>
            </Box>
          </Grid>

          <Grid item>
            {isShowHidedProducts && (
              <Button className={classes.buttonStyle} onClick={() => setIsShowHidedProducts(false)}>
                <ClassRoundedIcon />

                <Typography variant="button">Показать скрытые категории</Typography>
              </Button>
            )}

            {!isShowHidedProducts && (
              <Button className={classes.buttonStyle} onClick={() => setIsShowHidedProducts(true)}>
                <ClassRoundedIcon />

                <Typography variant="button">Показать доступные </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default CategoriesForm
