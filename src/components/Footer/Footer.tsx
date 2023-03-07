import { FC } from 'react'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import { Grid, Theme } from '@mui/material'
import { logo } from '../../img'
import { drawerList } from '../../constants'
import { Typography } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.main,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
  },
  fontStyle: {
    '&.MuiTypography-root': {
      color: theme.palette.secondary.main,
    },
  },
  images: {
    '&.MuiGrid-root': {
      display: 'flex',
      width: 90,
      height: 90,
    },
  },
}))

const Footer: FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.footer} spacing={1}>
      <Grid item ml={5} component="img" src={logo} alt="footerLogo" className={classes.images} />

      <Grid item xs={7}>
        <Grid container justifyContent="space-between" alignItems="center">
          {drawerList.map((category, index) => (
            <Grid item key={index}>
              <Link to={`/admin/main/${category.route}`}>
                <Typography className={classes.fontStyle}>{category.name}</Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <Typography fontWeight="bold" className={classes.fontStyle} mr={5}>
          Все права защищены © 2022
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
