import React, { FC, Dispatch, SetStateAction } from 'react';

type SortLocations = { 
  handleSortClick: Dispatch<SetStateAction<string>>
}

const locationsTypes = {
  cafe: 'cafe',
  pub: 'pub',
  restaurant: 'restaurant'
}

export const SortLocations: FC<SortLocations> = ({handleSortClick}) => {
  return (
    <div className="sortLocations">
      <button onClick={() => handleSortClick('')}>
        All
      </button>
      <button onClick={() => handleSortClick(locationsTypes.cafe)}>
        C
      </button>
      <button onClick={() => handleSortClick(locationsTypes.restaurant)}>
        R
      </button>
      <button onClick={() => handleSortClick(locationsTypes.pub)}>
        P
      </button>
    </div>
  );
};