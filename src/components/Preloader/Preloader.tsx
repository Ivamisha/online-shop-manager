import { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  preloaderBox: {
    '&.MuiBox-root': {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    },
  },
  preloader: {
    '&.MuiCircularProgress-root': {
      color: theme.palette.primary.red,
      display: 'flex',
      margin: '0 auto',
      marginTop: '1rem',
      borderRadius: '50%',
    },
  },
}))

const Preloader: FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.preloaderBox}>
      <CircularProgress className={classes.preloader} size={100} />
    </Box>
  )
}

export default Preloader
