const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Total = ({ exercises }) => {
  return <p>total of {exercises.reduce((a, b) => a + b, 0)} exercises</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts.map((part) => part.exercises)} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
