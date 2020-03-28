import React, { FC } from 'react';
import {API_URL, APP_NAME, getFromStorage, deleteInStorage} from '../helpers';

type HomePage = {
  moveToLandingPage: (ar: boolean) => void
}

export const HomePage: FC<HomePage> = (props) => {
  const handleLogOut = () => {
    const obj = getFromStorage(APP_NAME);
    if (obj && obj.token) {
      const { token } = obj;

      fetch(`${API_URL}account/logout?token=${token}`)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            deleteInStorage(APP_NAME)
          }
          //Move to LandingPage
          props.moveToLandingPage(false)
        });
    } else {}
  }

  return (
    <div>
      Hi!
      <button onClick={() => handleLogOut()}>
        log out!
      </button>
    </div>
  )
}