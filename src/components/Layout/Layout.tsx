import { useState, FC } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Grid, Theme } from '@mui/material'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AdminPanelList from '../AdminPanelList/AdminPanelList'
import { drawerWidth } from '../../constants'
import { ILayOutProps } from './interface'

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    '&.MuiGrid-root': {
      background: '#FBFBFB',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
  outletContainer: {
    display: 'flex',
    width: '80%',
    alignSelf: 'center',
    [theme.breakpoints.down('xl')]: {
      maxHeight: '100vh',
    },
  },
}))

const Layout: FC<ILayOutProps> = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <AdminPanelList />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <AdminPanelList />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: '100vh' }}
      >
        <Grid container flexDirection="column">
          <Grid
            container
            className={classes.mainContainer}
            alignItems="space-between"
            flexDirection="column"
            width="100%"
          >
            <Grid item>
              <Header setOpenDrawer={setMobileOpen} />
            </Grid>

            <Grid flexGrow={1} className={classes.outletContainer}>
              <Outlet />
            </Grid>
          </Grid>

          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Layout
