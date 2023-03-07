import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Grid, Theme, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import CategoryIcon from '@mui/icons-material/Category'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import PlaceIcon from '@mui/icons-material/Place'
import { logo } from '../../img'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.MuiButton-root': {
      display: 'flex',
      width: '70%',
      margin: '0 auto',
      marginTop: '1rem',
    },
  },
  links: {
    '&.MuiTypography-root': {
      fontSize: 15,
      color: theme.palette.primary.main,
    },
  },
  title: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      fontSize: 30,
      marginBottom: '3rem',
    },
  },
  categoryTitle: {
    '&.MuiTypography-root': {
      fontWeight: 'lighter',
      color: theme.palette.primary.main,
      fontSize: 20,
      marginBottom: '2rem',
      textAlign: 'left',
    },
  },
  categoryGridItem: {
    '&MuiGrid-item': {
      display: 'flex',
      background: 'white',
    },
  },
  svgTheme: {
    '&.MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  logo: {
    '&.MuiBox-root': {
      mt: 1,
      maxWidth: 110,
      height: 110,
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.secondary.main,
    },
  },
}))

const AdminPanelList: FC = () => {
  const navigate = useNavigate()
  const classes = useStyles()

  return (
    <Grid container alignContent="space-between" textAlign="center">
      <Grid item md={12}>
        <Box
          component="img"
          alt="logo"
          src={logo}
          onClick={() => navigate('../admin/main')}
          className={classes.logo}
        />
      </Grid>

      <Grid item md={12}>
        <Typography className={classes.title}>Панель управления</Typography>
      </Grid>

      <Grid item md={12}>
        <Grid container height="50vh" paddingLeft={2}>
          <Grid item md={12}>
            <Typography className={classes.categoryTitle}>Меню</Typography>
          </Grid>

          <Link to="categories" style={{ width: '100%' }}>
            <Grid item md={12} display="flex" className={classes.categoryGridItem}>
              <CategoryIcon className={classes.svgTheme} />
              <Typography className={classes.links}>Категории</Typography>
            </Grid>
          </Link>

          <Link to="products" style={{ width: '100%' }}>
            <Grid item md={12} display="flex" className={classes.categoryGridItem}>
              <ProductionQuantityLimitsIcon className={classes.svgTheme} />
              <Typography className={classes.links}>Товары</Typography>
            </Grid>
          </Link>

          <Link to="pickupPoint" style={{ width: '100%' }}>
            <Grid item md={12} display="flex" className={classes.categoryGridItem}>
              <PlaceIcon className={classes.svgTheme} />
              <Typography className={classes.links}>Пункты выдачи</Typography>
            </Grid>
          </Link>

          <Link to="statistics" style={{ width: '100%' }}>
            <Grid item md={12} display="flex" className={classes.categoryGridItem}>
              <ShowChartIcon className={classes.svgTheme} />
              <Typography className={classes.links}>Статистика</Typography>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default AdminPanelList
