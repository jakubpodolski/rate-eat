import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Popup } from '../Popup/Popup';
import { UserLocations } from '../UserLocations/UserLocations';
import { Map } from '../Map/Map';

import { API_URL, removeAccents, getFromStorage } from '../helpers';
import './homePage.css';


export const HomePage: FC<RouteComponentProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [serverResponse, setServerResponse] = useState({success: false, message: ''});

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

  const handleSaveButtonClick = (display_name: string, lat: string, 
    lon: string, address: [] | string, type: string) => {
    setServerResponse({success: false, message: ''})
    const obj = getFromStorage();
    if (obj && obj.token) {
      const { token } = obj;
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
      .then(res => {
        setServerResponse(res);
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
        <Map
          locations={locations}
          handleSaveButtonClick={handleSaveButtonClick}
        />
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
        <UserLocations setLocations={setLocations} mapServerResponse={serverResponse}/>
        {serverResponse.message && <Popup data={serverResponse} />}
      </div>
    </section>
  )
}


/*
TODO: 
- Style homePage
- Hosting and deploy
*/