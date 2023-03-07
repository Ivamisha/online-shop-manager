import { FC, useState } from 'react'
import { useActions } from '../../hooks/useAction'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Box, IconButton, Toolbar, Button, Menu, MenuItem, Grid, Typography } from '@mui/material'
import type { IHeaderProps } from './interface'
import MenuIcon from '@mui/icons-material/Menu'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    '&.MuiToolbar-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  position: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  accountButton: {
    '&.MuiButton-root': {
      border: '1px solid black',
      borderRadius: '10px',
      width: '10rem',
      height: '3rem',
    },
  },
}))

const Header: FC<IHeaderProps> = ({ setOpenDrawer }) => {
  const { logout } = useActions()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { admin } = useTypeSelector((state) => state.admin)

  return (
    <Toolbar className={classes.header}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={classes.position}>
          <IconButton
            onClick={() => setOpenDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography color="secondary.main" fontWeight="bold">
              С возвращением, {admin?.name}
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <Button
            className={classes.accountButton}
            id="basic-button"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Grid container>
              <AccountIcon />
              <Typography fontSize={11} color="secondary.main">
                {`${admin?.name} ${admin?.surname}`}
              </Typography>
            </Grid>
          </Button>

          <Menu
            PaperProps={{ style: { color: 'white' } }}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
          >
            <MenuItem color="primary.main" onClick={logout}>
              Выйти из системы
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default Header
