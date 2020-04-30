import React from 'react';
import Person from './Person';

const PersonList = ({ list }) =>
  list.map((person) => <Person key={person.id} person={person} />);

export default PersonList;
