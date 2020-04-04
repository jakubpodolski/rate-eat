import React, { FC, useEffect, useState } from 'react';
import {API_URL, APP_NAME, getFromStorage, deleteInStorage, verifyUser} from '../helpers';
import { Map } from '../Map/Map';
import { navigate, RouteComponentProps } from '@reach/router';

import './homePage.css';

export const HomePage: FC<RouteComponentProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect( () => {
    const obj = getFromStorage(APP_NAME);
    if (obj && obj.token) {
      const { token } = obj;
      verifyUser(token).then((res: Boolean) => {
        if(res) navigate('home')
        else navigate('/')
      })
    }
  }, [])


  const handleLogOut = () => {
    const obj = getFromStorage(APP_NAME);
    if (obj && obj.token) {
      const { token } = obj;

      fetch(`${API_URL}account/logout?token=${token}`)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            deleteInStorage(APP_NAME);
            navigate('/');
          }
          else {
            console.log("Error")
          }
        });
    } else {}
  }

  const handleSearch = async () => {
    if (searchQuery) {
      const searchForLocations = fetch(`${API_URL}location/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          place: searchQuery
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



  return (
    <div className="homePage">
      Hi!
      <button onClick={() => handleLogOut()}>
        log out!
      </button>
      <Map locations={locations}/>
      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={() => handleSearch()}>
        Search! 
      </button>
    </div>
  )
}