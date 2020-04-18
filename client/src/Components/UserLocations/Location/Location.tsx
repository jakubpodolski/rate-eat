import React, { FC } from 'react';


import './Location.css';

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
    <div className="location">
      <button className="location__name" onClick={() => handleSortClick(display_name, type)}>
        <span>{display_name}</span>
      </button>
      <div className="location__deleteButton">
        <button onClick={() => handleDeleteClick(display_name, type, userId)}>
          <span>
            Delete
          </span>
        </button>
      </div>
    </div>
  )
}