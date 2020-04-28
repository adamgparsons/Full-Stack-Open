import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  const total = parts.reduce((a, v) => a + v.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Content;
