import axios from "axios";

const baseUrl = "/api/persons";

const getContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newContact = (contact) => {
  const request = axios.post(baseUrl, contact);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const services = { getContacts, newContact, deletePerson };

export default services;
