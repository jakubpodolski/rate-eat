import React, { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { RouteComponentProps } from '@reach/router';

import { SortLocations } from './SortLocations/SortLocations';
import { Location } from './Location/Location';

import { getFromStorage, API_URL } from '../helpers';
import { LocationType } from '../../types';

import './UserLocations.css';
import { Popup } from '../Popup/Popup';


interface IUserLocations extends RouteComponentProps {
  setLocations: Dispatch<SetStateAction<never[]>>
}

export const UserLocations: FC<IUserLocations> = ({setLocations}) => {
  const [userLocations, setUserLocations] = useState([]);
  const [locationsFilter, setLocationsFilter] = useState('')
  const [serverResponse, setServerResponse] = useState({sucess: false, message: ''});
  
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

  const showFilteredLocations = (): LocationType[] => (
    userLocations.filter((location: any) => (
      location.type === locationsFilter || locationsFilter === '' 
    ))
  )

  const handleSortClick = (name: string, type: string): void => {
    setLocations(
      userLocations.filter((location: LocationType) => (
        location.display_name === name && location.type === type
      ))
    )
  }

  const handleDeleteClick = (name: string, type: string, userId: string) => {
    const obj = getFromStorage();
    if (obj && obj.token) {
      fetch(`${API_URL}location/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          display_name: name,
          type: type,
          userId: userId
        })
      })
      .then(res => res.json())
      .then(res => {
        setServerResponse(res);
      })
    }
  }

  return (
    <div
      id="myLocations"
      className={classNames("userLocations", {
        'userLocations--hidden': true
      })}
    >
      <SortLocations handleSortClick={setLocationsFilter}/>
      <div className="userLocations__inner">
        {showFilteredLocations().map((location: LocationType) => (
          <Location
            key={location._id}
            {...location}
            handleSortClick={handleSortClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      <button onClick={() => setLocations(userLocations)}>
          Show all locations
      </button>
      {serverResponse.message && <Popup data={serverResponse} />}
    </div>
  )
}