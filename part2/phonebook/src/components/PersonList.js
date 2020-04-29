import React from 'react';

const PersonList = ({ list }) => {
  return list.map((person) => (
    <p>
      {person.name} - {person.number}
    </p>
  ));
};

export default PersonList;
