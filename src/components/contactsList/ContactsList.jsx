import React from 'react';
import { useDispatch } from 'react-redux';
import { ContactsStyled } from './ContactsList.styled';
import StyledTrashIcon from './TrashIcon.styled';
import { getVisibleContacts } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { deleteContact } from 'api-functions/api';

const ContactsList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getVisibleContacts);
  return (
    <div className="contacts">
      <h2>Contacts List:</h2>
      <ContactsStyled>
        {contacts.map(({ name, id, number }) => (
          <li key={id} className="item">
            <span className="name">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
            : <span>{number} </span>
            <StyledTrashIcon
              onClick={() => {
                dispatch(deleteContact(id));
              }}
            ></StyledTrashIcon>
          </li>
        ))}
      </ContactsStyled>
    </div>
  );
};

export default ContactsList;
