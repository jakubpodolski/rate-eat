import React, { FC, useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import classNames from 'classnames';
import { RouteComponentProps } from '@reach/router';

import { SortLocations } from './SortLocations/SortLocations';
import { Location } from './Location/Location';

import { getFromStorage, API_URL } from '../helpers';
import { LocationType } from '../../types';

import './UserLocations.css';
import { Popup } from '../Popup/Popup';


interface IUserLocations extends RouteComponentProps {
  setLocations: Dispatch<SetStateAction<never[]>>,
  mapServerResponse: {success: boolean, message: string}
}

export const UserLocations: FC<IUserLocations> = ({setLocations, mapServerResponse}) => {
  const [userLocations, setUserLocations] = useState([]);
  const [locationsFilter, setLocationsFilter] = useState('')
  const [serverResponse, setServerResponse] = useState({success: false, message: ''});
  const userLocationsRef = useRef(null);
  
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
  },[serverResponse, mapServerResponse]);

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
    setServerResponse({success: false, message: ''})
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

  const handleCloseClick = () => {
    let element: any = userLocationsRef.current;
    element?.classList.toggle("userLocations--hidden")
  }

  return (
    <div
      id="myLocations"
      ref={userLocationsRef}
      className={classNames("userLocations", {
        'userLocations--hidden': true
      })}
    >
      <div className="userLocations__container">
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
        <div className="userLocations__showAll">
          <button
            className="button--secondary"
            onClick={() => setLocations(userLocations)}
          >
              Show all locations
          </button>
        </div>
        {serverResponse.message && <Popup data={serverResponse} />}
        <div className="userLocations__closeButton">
          <button onClick={() => handleCloseClick()}>
            <span>
              Close
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}