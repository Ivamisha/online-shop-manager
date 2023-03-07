/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { FC, useEffect } from 'react'
import L, { BaseIconOptions } from 'leaflet'
import { LatLng } from 'leaflet'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { HandleClickMap } from '../'
import { IMapsProps } from './interface'
import { Grid, Typography } from '@mui/material'
import { useTypeSelector } from '../../hooks'
import {
  blueIconImage,
  blackIconImage,
  redIconImage,
  mapAttribution,
  mapUrl,
} from '../../constants'

const redIcon = new L.Icon(redIconImage as BaseIconOptions)
const blueIcon = new L.Icon(blueIconImage as BaseIconOptions)
const darkIcon = new L.Icon(blackIconImage as BaseIconOptions)

const Map: FC<IMapsProps> = ({
  pickUpPoint,
  setChosenMapPoint,
  chosenMapPoint,
  changeblePickUpPoint,
}) => {
  const { metricsArray } = useTypeSelector((state) => state.pickUpProduct)

  useEffect(() => {
    if (changeblePickUpPoint && setChosenMapPoint) {
      setChosenMapPoint(changeblePickUpPoint.coordinates)
    }
  }, [changeblePickUpPoint])

  return (
    <div>
      <MapContainer
        style={{ height: '500px' }}
        center={
          (pickUpPoint?.coordinates as unknown as LatLng) ||
          (changeblePickUpPoint?.coordinates as unknown as LatLng) || [47.2608, 40.0555]
        }
        zoom={10}
        scrollWheelZoom
      >
        {chosenMapPoint && <HandleClickMap setChosenMapPoint={setChosenMapPoint} />}

        <TileLayer attribution={mapAttribution} url={mapUrl} />
        {!!metricsArray.length &&
          metricsArray.map((element) => (
            <Marker
              icon={element.shown ? blueIcon : darkIcon}
              key={element.id}
              position={(element.coordinates as unknown as LatLng) || [47.2608, 40.0555]}
            >
              <Popup>
                <Grid container flexDirection="column" alignItems="center">
                  {!element.shown && (
                    <Typography variant="caption">Данный пункт выдачи не активен!</Typography>
                  )}
                  {element.description}
                </Grid>
              </Popup>
            </Marker>
          ))}

        {chosenMapPoint && (
          <Marker icon={redIcon} position={chosenMapPoint as unknown as LatLng}>
            <Popup autoPan>{pickUpPoint?.description}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default Map
