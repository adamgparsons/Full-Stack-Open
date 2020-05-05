import Axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = Axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = Axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (personID) => {
  const deleteURL = `${baseUrl}/${personID}`;
  const request = Axios.delete(deleteURL);
  return request.then((response) => response.data);
};

const update = (personID, newObject, showError) => {
  const request = Axios.put(`${baseUrl}/${personID}`, newObject);
  return request.then((response) => response.data);
  // .catch((error) => showError());
};

export default { getAll, create, deletePerson, update };
