import { FC } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button, TextField, Theme, Box, Typography } from '@mui/material'
import type { IPickUpPointsForm } from './interface'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    '&.MuiButton-root': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.lightGreen,
      height: '5rem',
      width: '15rem',
      '&:hover': {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.pink,
      },
    },
  },
  infoBox: {
    '&.MuiBox-root': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.pink,
      height: '5rem',
      minWidth: '20rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
    },
  },
}))

const PickUpPointsForm: FC<IPickUpPointsForm> = ({
  setSearchValue,
  isShowHidedPickUpPoints,
  setIsShowHidedPickUpPoints,
  setIsModalCreatePickUpPointsOpen,
}) => {
  const classes = useStyles()

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Button
          className={classes.buttonStyle}
          onClick={() => setIsModalCreatePickUpPointsOpen(true)}
        >
          <LocalShippingIcon />

          <Typography pl={0.5} variant="button">
            Добавить пункт выдачи
          </Typography>
        </Button>
      </Grid>

      <Grid item>
        <Box className={classes.infoBox}>
          <TextField
            label="Поиск пункт выдачи"
            variant="standard"
            size="small"
            color="primary"
            margin="dense"
            onChange={(e) => setSearchValue(e.target.value.toString())}
          />
        </Box>
      </Grid>

      <Grid item>
        <Button
          className={classes.buttonStyle}
          onClick={() => setIsShowHidedPickUpPoints(!isShowHidedPickUpPoints)}
        >
          {isShowHidedPickUpPoints ? (
            <>
              <RemoveRedEyeIcon />
              <Typography>показать только активные</Typography>
            </>
          ) : (
            <>
              <VisibilityOffIcon />
              <Typography>показать скрытые пункты выдачи</Typography>
            </>
          )}
        </Button>
      </Grid>
    </Grid>
  )
}
export default PickUpPointsForm
