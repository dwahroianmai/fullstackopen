const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.title} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part title={props.one} exercises={props.onee} />
      <Part title={props.two} exercises={props.twoe} />
      <Part title={props.three} exercises={props.threee} />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises is {props.one + props.two + props.three}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header text={course} />
      <Content
        one={part1}
        onee={exercises1}
        two={part2}
        twoe={exercises2}
        three={part3}
        threee={exercises3}
      />
      <Total one={exercises1} two={exercises2} three={exercises3} />
    </>
  );
};

export default App;
