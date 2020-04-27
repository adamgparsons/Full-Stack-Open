import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td> {text}</td>
    <td> {value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const calcAvg = (good - bad) / total;
  const positivePercentage = (good / total) * 100;
  if (total > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="Total" value={total} />
            <Statistic text="Good" value={good} />
            <Statistic text="Average" value={calcAvg} />
            <Statistic text="Positive percentage" value={positivePercentage} />
          </tbody>
        </table>
      </>
    );
  } else {
    return null;
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // save clicks of each button to own state

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good 👍" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral😐" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad 👎" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
