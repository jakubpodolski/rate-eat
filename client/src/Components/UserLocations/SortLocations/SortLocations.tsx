import React, { FC, Dispatch, SetStateAction } from 'react';

import './SortLocations.css';

type SortLocations = {
  handleSortClick: Dispatch<SetStateAction<string>>
}

const locationsTypes = {
  cafe: 'cafe',
  pub: 'pub',
  restaurant: 'restaurant'
}

export const SortLocations: FC<SortLocations> = ({ handleSortClick }) => {
  return (
    <div className="sortLocations">
      <button
        className="sortLocations__button--all"
        onClick={() => handleSortClick('')}
      >
        <span>
          All
        </span>
      </button>
      <button
        className="sortLocations__button--cafe"
        onClick={() => handleSortClick(locationsTypes.cafe)}
      >
        <span>
          Cafe
        </span>
      </button>
      <button
        className="sortLocations__button--restaurant"
        onClick={() => handleSortClick(locationsTypes.restaurant)}
      >        
        <span>
          Restaurant
        </span>
      </button>
      <button
        className="sortLocations__button--pub"
        onClick={() => handleSortClick(locationsTypes.pub)}
      >        
        <span>
          Pub
        </span>
      </button>
    </div>
  );
};