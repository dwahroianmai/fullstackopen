import { useState } from "react";

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = (props) => <button onClick={props.click}>{props.text}</button>;

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;

  if (all === 0) {
    return <p>no feedback given</p>;
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine
            text="average"
            value={((good - bad) / all).toFixed(1)}
          />
          <StatisticLine
            text="positive"
            value={((good / all) * 100).toFixed(1) + " %"}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button click={() => setGood(good + 1)} text="good" />
      <Button click={() => setNeutral(neutral + 1)} text="neutral" />
      <Button click={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
