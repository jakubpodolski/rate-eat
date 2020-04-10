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

export const Marker: FC<MarkProps> = ({lat, lon, display_name}) => (
  <Mark position={{lat: +lat, lng: +lon}}>
    <MapPopup>
      {display_name}
    </MapPopup>
    <Tooltip
      className="marker__title"
      direction="bottom"
      offset={[0, -5]}
      opacity={1}
      permanent
    >
      {display_name.split(',')[0]}
    </Tooltip>
  </Mark>
);