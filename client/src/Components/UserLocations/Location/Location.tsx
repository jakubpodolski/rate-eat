import React, { FC, Dispatch, SetStateAction } from 'react';

type Location = { 
  display_name: string,
  type: string,
  userId: string,
  handleSortClick: (name: string, type: string) => void,
  handleDeleteClick: (name: string, type: string, userId: string) => void

}

export const Location: FC<Location> = ({
display_name,
type,
userId,
handleSortClick,
handleDeleteClick
}) => {
  return (
    <div className="userLocations__location">
      {display_name}, {type}
      <button onClick={() => handleSortClick(display_name, type)}>
        show
      </button>
      <button onClick={() => handleDeleteClick(display_name, type, userId)}>
        delete
      </button>
    </div>
  )
}