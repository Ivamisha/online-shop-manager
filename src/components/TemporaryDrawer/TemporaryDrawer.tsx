import { FC } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import type { ITemporaryDrawer } from './interface'
import MainList from '../AdminPanelList/AdminPanelList'

const TemporaryDrawer: FC<ITemporaryDrawer> = ({ openDrawer, setOpenDrawer }) => {
  return (
    <Box>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <MainList />
        </Box>
      </Drawer>
    </Box>
  )
}

export default TemporaryDrawer
