import React, { FC, useState } from 'react';
import { API_URL, removeAccents } from '../helpers';
import { Map } from '../Map/Map';
import { UserLocations } from '../UserLocations/UserLocations';
import { RouteComponentProps } from '@reach/router';

import './homePage.css';


export const HomePage: FC<RouteComponentProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);

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
        <UserLocations setLocations={setLocations}/>
      </div>
    </section>
  )
}