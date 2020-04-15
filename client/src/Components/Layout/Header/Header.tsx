import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import { 
  APP_NAME,
  API_URL,
  getFromStorage,
  deleteInStorage,
  verifyUser
} from '../../helpers';
import { navigate } from '@reach/router';

import './Hamburger.css';
import './Header.css';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    const obj = getFromStorage();
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
    }
  }

  const handleToLocationPage = () => {
    let el = document.getElementById("myLocations");
    el?.classList.toggle("userLocations--hidden")

  }

  useEffect( () => {
    const obj = getFromStorage();
    if (obj && obj.token) {
      const { token } = obj;
      verifyUser(token).then((res: Boolean) => {
        if(res) navigate('home')
        else navigate('/')
      })
    }
    else navigate('/')
  }, [])

  return (
    <header className="header">
      <div className="header__logo">
        logo
      </div>
      <div className="header__menuButton">
        <button
          className={classNames("hamburger hamburger--arrowalt-r", {
            "is-active": isMenuOpen
          })}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      {isMenuOpen && (
      <div className="header__menu">
        <div className="header__menuItems">
          <button 
            onClick={() => handleToLocationPage()}
            className="button--secondary"
          >
            My locations
          </button>
          <button 
            onClick={() => handleLogOut()}
            className="button--secondary"
          >
            LogOut
          </button>
        </div>
      </div>
      )}
    </header>
  );
};