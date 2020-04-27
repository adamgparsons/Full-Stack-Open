import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const App = (props) => {
  let [counter, setCounter] = useState(0);

  const increaseByOne = () => {
    setCounter(counter + 1);
  };

  const setToZero = () => {
    setCounter(0);
  };
  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text={'Plus 1'} />
      <Button handleClick={setToZero} text={'Clear'} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
