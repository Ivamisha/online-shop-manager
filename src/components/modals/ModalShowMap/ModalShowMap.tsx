import { FC } from 'react'
import { Dialog } from '@mui/material'
import { Maps } from '../..'
import type { IModalShowMapProps } from './interface'

const ModalShowMap: FC<IModalShowMapProps> = ({
  chosenPickUpPoint,
  isModalShowMap,
  setIsModalShowMap,
}) => {
  const handleClose = () => {
    setIsModalShowMap(false)
  }

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: 'white', width: '1200px' } }}
      open={isModalShowMap}
      onClose={handleClose}
    >
      <Maps pickUpPoint={chosenPickUpPoint} />
    </Dialog>
  )
}

export default ModalShowMap
