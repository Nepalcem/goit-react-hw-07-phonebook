import React, { useState } from 'react';
import { FormStyled } from './Form.styled';
import { FaPlus } from 'react-icons/fa';
import { LuLoader2 } from 'react-icons/lu';
import { addContact } from 'api-functions/api';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getIsAddContactPending } from 'redux/selectors';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isAddContactLoading = useSelector(getIsAddContactPending);

  const handleChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    } else {
      setNumber(e.currentTarget.value.trim());
    }
  };

  const addContactItem = (name, number) => {
    const existingContact = contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (existingContact) {
      return null;
    }
    const userObj = {
      name,
      number,
    };
    return userObj;
  };

  const submitHandler = e => {
    e.preventDefault();
    const newContact = addContactItem(name, number);
    if (newContact === null) {
      return alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(addContactItem(name, number)));
      setName('');
      setNumber('');
    }
  };

  return (
    <FormStyled onSubmit={submitHandler}>
      <h1>PhoneBook</h1>
      <div className="form__inputs">
        <label>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            pattern="^[A-Za-z\u0080-\uFFFF ']+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
            autoComplete="off"
          />
        </label>

        <label>
          <p>Phone:</p>
          <input
            type="tel"
            name="number"
            pattern="^(\+?[0-9.\(\)\-\s]*)$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
            autoComplete="off"
          />
        </label>

        <button type="submit" disabled={isAddContactLoading}>
          {isAddContactLoading ? (
            <LuLoader2 className="loading-icon"></LuLoader2>
          ) : (
            <FaPlus></FaPlus>
          )}{' '}
          Add Contact
        </button>
      </div>
    </FormStyled>
  );
};

export default Form;
