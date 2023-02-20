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
      <Part
        title={props.parts.parts[0].name}
        exercises={props.parts.parts[0].exercises}
      />
      <Part
        title={props.parts.parts[1].name}
        exercises={props.parts.parts[1].exercises}
      />
      <Part
        title={props.parts.parts[2].name}
        exercises={props.parts.parts[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises is{" "}
      {props.parts.parts[0].exercises +
        props.parts.parts[1].exercises +
        props.parts.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <>
      <Header text={course.name} />
      <Content parts={course} />
      <Total parts={course} />
    </>
  );
};

export default App;
