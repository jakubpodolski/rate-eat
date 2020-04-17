import React, { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { RouteComponentProps } from '@reach/router';
import { SortLocations } from './SortLocations/SortLocations';
import { getFromStorage, API_URL } from '../helpers';

import './UserLocations.css';

interface IUserLocations extends RouteComponentProps {
  setLocations: Dispatch<SetStateAction<never[]>>
}

export const UserLocations: FC<IUserLocations> = ({setLocations}) => {
  const [userLocations, setUserLocations] = useState([]);
  const [locationsFilter, setLocationsFilter] = useState('')
  
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

  const showFilteredLocations = (): any => (
    userLocations.filter((location: any) => (
      location.type === locationsFilter || locationsFilter === '' 
    ))
  )

  return (
    <div
      id="myLocations"
      className={classNames("userLocations", {
        'userLocations--hidden': true
      })}
    >
      <SortLocations handleSortClick={setLocationsFilter}/>
      <div className="userLocations__inner">
        {showFilteredLocations().map((location: any) => (
          <div className="userLocations__location" key={location._id}>
            {location.display_name}, {location.type}
          </div>
        ))}
      </div>
      <button onClick={() => setLocations(userLocations)}>
          Show all locations
      </button>
    </div>
  )
}