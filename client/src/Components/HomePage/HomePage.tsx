import React, { FC, useEffect, useState } from 'react';
import {API_URL, APP_NAME, getFromStorage, verifyUser} from '../helpers';
import { Map } from '../Map/Map';
import { navigate, RouteComponentProps } from '@reach/router';

import './homePage.css';

const testData = [
  {
    "place_id": "38877324",
    "licence": "https://locationiq.com/attribution",
    "osm_type": "node",
    "osm_id": "2904954500",
    "boundingbox": [
      "50.0448426",
      "50.0449426",
      "19.9484385",
      "19.9485385"
    ],
    "lat": "50.0448926",
    "lon": "19.9484885",
    "display_name": "Wietnam, Staromostowa, Podgórze, Krakow, Lesser Poland Voivodeship, 30-506, Poland",
    "class": "amenity",
    "type": "restaurant",
    "importance": 0.101,
    "icon": "https://locationiq.org/static/images/mapicons/food_restaurant.p.20.png"
  }
]

export const HomePage: FC<RouteComponentProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState(testData);

  const handleSearch = async () => {
    if (searchQuery) {
      const searchForLocations = fetch(`${API_URL}location/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          place: removeAccents(searchQuery)
        })
      }).then(res => res.json())

      await searchForLocations
        .then(res => {
          if (res.success) {
            setLocations(res.locations)
          }
          else {
            console.log(res.message)
          }
        })
    }
  }

  const handleInputKeyPress = (e: any) => {
    if (e.key === 'Enter') {
        handleSearch()
    }
  }
 
  const removeAccents = (str: string) => {
    const accents = "ĄąÓóĘęĆćŃńŁłŚśŻŹżź";
    const accentsOut = "AaOoEeCcNnLlSsZZzz";
    return str
      .split("")
      .map((letter: string, index: number) => {
        const accentIndex = accents.indexOf(letter);
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
      })
      .join("");
  }

  return (
    <section className="homePage">
      <div className="home">
        <Map locations={locations}/>
        <div className="home__search">
          <input 
            className="home__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => handleInputKeyPress(e)}
          />
          <button
            className="home__search"
            onClick={() => handleSearch()}
          >
          </button>
        </div>
      </div>
    </section>
  )
}