import React, { FC, useState } from 'react';
import {
  Marker as Mark,
  Popup as MapPopup,
  Tooltip
} from 'react-leaflet';
import { API_URL, getFromStorage } from '../helpers';
import './Marker.css'

type MarkProps = {
  lat: string,
  lon: string,
  display_name: string,
  address: [] | string,
  type: string
}

export const Marker: FC<MarkProps> = ({lat, lon, display_name, address, type}) => {
  const [displayPopUp, setDisplayPopUp] = useState(false);
 

  const handleSaveButtonClick = () => {
    const obj = getFromStorage();
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token)
      fetch(`${API_URL}location/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          display_name: display_name.split(',')[0],
          lat: lat,
          lon: lon,
          address: address,
          type: type
        })
      })
      .then(res => res.json())
      .then(res => console.log(res))
    }
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
          onClick={() => handleSaveButtonClick()}
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