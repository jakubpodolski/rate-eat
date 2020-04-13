import React, { FC } from 'react';
import {
  Marker as Mark,
  Popup as MapPopup,
  Tooltip
} from 'react-leaflet';

import './Marker.css'

type MarkProps = {
  place_id: string,
  lat: string,
  lon: string,
  display_name: string,
  icon: string
}

export const Marker: FC<MarkProps> = ({lat, lon, display_name}) => {
  const [name, address] =  [display_name.split(',')[0], display_name.split(',').slice(1, 3)]
  return (
    <Mark position={{lat: +lat, lng: +lon}}>
      <MapPopup className="marker__popup">
        <p className="marker__address">
          {address}
        </p>
        <button className="marker__button button--primary">
          Add to favorites
        </button>
      </MapPopup>
      <Tooltip
        className="marker__title"
        direction="bottom"
        offset={[0, -5]}
        opacity={1}
        permanent
      >
        {name}
      </Tooltip>
    </Mark>
  )
};