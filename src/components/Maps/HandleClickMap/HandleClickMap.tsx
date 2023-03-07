import { FC } from 'react'
import { useMapEvents } from 'react-leaflet'
import type { IHandleClickMapProps } from './interface'

const HandleClickMap: FC<IHandleClickMapProps> = ({ setChosenMapPoint }) => {
  const map = useMapEvents({
    click: (e) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setChosenMapPoint ? setChosenMapPoint([e.latlng.lat, e.latlng.lng]) : undefined
    },
  })

  return null
}

export default HandleClickMap
