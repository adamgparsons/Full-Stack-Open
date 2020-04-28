import React from 'react';
import Content from './Content';

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
