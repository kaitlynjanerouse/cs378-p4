import React, { useState } from 'react';

// Component to add a new city to the list when the user submits a new, valid, city name
const AddCity = ({ handleNewCity }) => {
  const [newCity, setNewCity] = useState('');
  const handleAddCity = () => {
    handleNewCity(newCity);
    setNewCity(''); 
  };

  return (
    <div className='add-city-container'>
      <input class='search-bar'
        placeholder="Add a new city" 
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
      />
      <button class='add-city-button' onClick={handleAddCity}>+</button>
    </div>
  );
};

export default AddCity;