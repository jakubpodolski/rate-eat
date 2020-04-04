import React, { FC } from 'react';
import { Map as LeafLetMap, TileLayer, Marker, Popup as MapPopup } from 'react-leaflet';

import './Map.css';

type MapProps = {
  locations: {}
}

// const createMarkers = () => (
//   <Marker position={position}>
//     <MapPopup>
//         A pretty CSS3 popup. <br/> Easily customizable.
//     </MapPopup>
//   </Marker>
// )

export const Map: FC<MapProps> = ({locations}) => {
  const position = {lat: 50.06143, lng: 19.93658}
  const zoom = 13;
  console.log(locations, 'MAP')
  return (
    
      <LeafLetMap center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </LeafLetMap>
    
  );
};