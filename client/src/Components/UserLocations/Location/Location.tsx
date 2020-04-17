import React, { FC, Dispatch, SetStateAction } from 'react';

type Location = { 
  display_name: string,
  type: string,
  handleSortClick: (name: string, type: string) => void
}

export const Location: FC<Location> = ({display_name, type, handleSortClick}) => {
  return (
    <div className="userLocations__location">
      {display_name}, {type}
      <button onClick={() => handleSortClick(display_name, type)}>
        show
      </button>
    </div>
  )
}