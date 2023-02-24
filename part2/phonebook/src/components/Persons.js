import services from "../services/persons";

const Persons = ({ people, f }) => {
  return (
    <table>
      <tbody>
        {people.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  f(person.name, person.id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Persons;
