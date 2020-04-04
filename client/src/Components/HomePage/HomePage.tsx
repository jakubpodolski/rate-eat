import React, { FC, useEffect } from 'react';
import {API_URL, APP_NAME, getFromStorage, deleteInStorage, verifyUser} from '../helpers';
import { Map } from '../Map/Map';
import { navigate, RouteComponentProps } from '@reach/router';

import './homePage.css';

export const HomePage: FC<RouteComponentProps> = () => {
  
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

  return (
    <div className="homePage">
      Hi!
      <button onClick={() => handleLogOut()}>
        log out!
      </button>
      <Map />
    </div>
  )
}