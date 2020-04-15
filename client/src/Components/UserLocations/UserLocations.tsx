import React, { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from '@reach/router';
import { getFromStorage, API_URL } from '../helpers';

import './UserLocations.css';
import classNames from 'classnames';

interface IUserLocations extends RouteComponentProps {
  setLocations: Dispatch<SetStateAction<never[]>>
}

export const UserLocations: FC<IUserLocations> = ({setLocations}) => {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    const obj = getFromStorage();
    if (obj && obj.token) {
      const { token } = obj;
      fetch(`${API_URL}location/getall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
        })
      })
      .then(res => res.json())
      .then(res => setUserLocations(res.places))
    }
  },[]);

  console.log(userLocations)
  return (
    <div
      id="myLocations"
      className={classNames("userLocations", {
        'userLocations--hidden': true
      })}
    >
      <div className="userLocations__sort">
        <button>
          All
        </button>
        <button>
          C
        </button>
        <button>
          R
        </button>
        <button>
          P
        </button>
      </div>
      <div className="userLocations__inner">
        {userLocations.map((location: any) => (
          <div className="userLocations__location" key={location._id}>
            {location.name}, {location.type}
          </div>
        ))}
      </div>
      <button onClick={() => setLocations(userLocations)}>
          Show all locations
      </button>
    </div>
  )
}