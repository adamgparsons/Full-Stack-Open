import React from 'react';

const Filter = ({ nameSearch, handleNameSearch }) => {
  return (
    <div>
      Search for a number:{' '}
      <input value={nameSearch} onChange={handleNameSearch} />
    </div>
  );
};

export default Filter;
