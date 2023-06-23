export const getContacts = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
export const getFilter = state => state.filter;

export const getVisibleContacts = state => {
  const contacts = getContacts(state);
  const filterValue = getFilter(state);
  const lowerCaseFilterValue = filterValue.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(lowerCaseFilterValue)
  );
};
