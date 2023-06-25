import React, { useState } from 'react';
import { FormStyled } from './Form.styled';
import { FaPlus } from 'react-icons/fa';
import { addContact } from 'api-functions/api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value.trim());
    } else {
      setNumber(e.currentTarget.value.trim());
    }
  };

  const addContactItem = (name, number) => {
    if (
      contacts.find(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    const userObj = {
      name,
      number,
    };
    console.log(userObj);
    return userObj;
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(addContact(addContactItem(name, number)));
    setName('');
    setNumber('');
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

        <button type="submit">
          <FaPlus></FaPlus> Add Contact
        </button>
      </div>
    </FormStyled>
  );
};

export default Form;
