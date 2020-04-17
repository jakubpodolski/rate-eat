import React, { FC, useState } from 'react';
import {
  Marker as Mark,
  Popup as MapPopup,
  Tooltip
} from 'react-leaflet';

import './Marker.css'

type MarkProps = {
  lat: string,
  lon: string,
  display_name: string,
  address: [] | string,
  type: string,
  handleSaveButtonClick: (
    display_name: string, lat: string, 
    lon: string, address: [] | string, type: string
  ) => void,
}

export const Marker: FC<MarkProps> = ({
  display_name,
  lat,
  lon,
  address,
  type, 
  handleSaveButtonClick
}) => {

  const handleClick = () => {
    handleSaveButtonClick(display_name, lat, lon, address, type)
  }

  return (
    <Mark position={{lat: +lat, lng: +lon}}>
      <MapPopup className="marker__popup">
        <p className="marker__address">
          {display_name.includes(',') 
            ? display_name.split(',').slice(1, 3)
            : address
          }
        </p>
        <button
          className="marker__button button--primary"
          onClick={() => handleClick()}
        >
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
        {display_name.includes(',') 
          ? display_name.split(',')[0]
          : display_name
        }
      </Tooltip>
    </Mark>
  )
};