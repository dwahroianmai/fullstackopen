import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newContact = (contact) => {
  const request = axios.post(baseUrl, contact);
  return request.then((response) => response.data);
};

export default { getContacts, newContact };
