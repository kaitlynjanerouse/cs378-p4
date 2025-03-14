import React from 'react';

const City = ({ city, onClick }) => {
    return (
        <button onClick={onClick} className='city-button'>
            {city}
        </button>
    );
  };
  
export default City;