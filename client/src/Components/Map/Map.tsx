import React, { FC, useEffect, useState, useRef } from 'react';
import { 
  Map as LeafLetMap,
  TileLayer,
  FeatureGroup,
  ZoomControl,
} from 'react-leaflet';

import { Marker } from '../Marker/Marker';

import { LocationType } from '../../types';
import './Map.css';

type MapProps = {
  locations: LocationType[]
  handleSaveButtonClick: (
    display_name: string, lat: string, 
    lon: string, address: [] | string, type: string
  ) => void,
}

export const Map: FC<MapProps> = ({locations, handleSaveButtonClick}) => {
  const [zoom, setZoom] = useState(14);
  const [position, setPosition] = useState({lat: 50.06143, lng: 19.93658});
  
  const mapRef: any = useRef(null);
  const groupRef: any = useRef(null);

  useEffect(() => {
    if (locations.length === 1) {
      setZoom(25);
      setPosition({lat: +locations[0].lat, lng: +locations[0].lon})
    }

    if (groupRef.current) {
        const map = mapRef.current.leafletElement;
        const group = groupRef.current.leafletElement;
        map.fitBounds(group.getBounds());
      }
  }, [locations])

  return (
    <div className="map">
      <LeafLetMap
        ref={mapRef}
        center={position}
        zoom={zoom}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          // url='https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=jSLDONnAekC18DvuFFxC'
          url='https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jSLDONnAekC18DvuFFxC'
        />
        <FeatureGroup ref={groupRef}>
          {locations.map((location: any) => (
            <Marker handleSaveButtonClick={handleSaveButtonClick} key={location.place_id} {...location}/>
          ))}
        </FeatureGroup>
        <ZoomControl position="bottomright"/>
      </LeafLetMap>
    </div>
  );
};