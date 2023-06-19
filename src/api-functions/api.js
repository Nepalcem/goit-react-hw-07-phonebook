import axios from 'axios';
const BASE_URL = 'https://64909f371e6aa71680cb93a4.mockapi.io/contacts/';

export default async function fetchContacts() {
  const response = await axios.get(`${BASE_URL}contacts`);
  console.log(response);
  return response;
}
