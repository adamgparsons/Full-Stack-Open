import React from 'react';
import Person from './Person';

const PersonList = ({ list, handleDelete }) =>
  list.map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  ));

export default PersonList;
