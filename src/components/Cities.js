import React from 'react';
import City from './City';

const Cities = ({ locations, handleCityClick}) => {
    return (
    <div className="city-buttons-container">
        {locations.map((location) => (
          <City 
            city={location.city}
            onClick={() => handleCityClick(location)}
          />
        ))}
      </div>
    );
};

export default Cities;