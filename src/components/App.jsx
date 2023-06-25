import React, { useEffect } from 'react';

import Form from './Form/Form';
import ContactsList from './contactsList/ContactsList';
import Filter from './Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { filterItems } from 'redux/slices/filterSlice';
// import { addContact, deleteContact } from 'redux/slices/contactsSlice';
import {
  getFilter,
  getIsLoading,
  getError,
} from 'redux/selectors';
import { fetchContacts } from 'api-functions/api';

const App = () => {
  
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const errorMessage = useSelector(getError);
  const dispatch = useDispatch();



  const changeFilter = e => {
    dispatch(filterItems(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const getVisibleContacts = () => {
  //   const lowerCaseFilterValue = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(lowerCaseFilterValue)
  //   );
  // };

  // const removeContact = id => {
  //   dispatch(deleteContact(id));
  // };

  return (
    <div>
      <Form></Form>
      <Filter value={filter} onChange={changeFilter}></Filter>
      {isLoading && !errorMessage && <b>Request in progress...</b>}
      <ContactsList
        // removeContact={removeContact}
      ></ContactsList>
    </div>
  );
};

export default App;
