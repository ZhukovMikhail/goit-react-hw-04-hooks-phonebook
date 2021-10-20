import React from 'react';
// import PropTypes from 'prop-types';
import ContactForm from './Components/ContactForm/ContactForm.jsx';
import ContactList from './Components/Contacts/Contacts.jsx';
import Filter from './Components/Filter/Filter.jsx';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import Modal from './Components/Modal/Modal.jsx';
import { useState } from 'react';
import useLocalStorage from './hucks/useLocalStorage.jsx';

const App = () => {
  const [filter, setfilter] = useState('');
  const [showModal, setModal] = useState(false);
  const defaultValue = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContacts] = useLocalStorage('contacts', defaultValue);

  const hendleOnchange = e => {
    const { value } = e.currentTarget;
    setfilter(value);
  };

  const toggleModal = () => {
    setModal(showModal => !showModal);
  };

  function onSubmitForm(name, number) {
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { name: name, id: uuidv4(), number: number },
    ]);
    toggleModal();
  }
  const deleteHandler = e => {
    setContacts(
      contacts.filter(
        contact => contact.id !== e.currentTarget.parentElement.id,
      ),
    );
  };

  return (
    <div className={styles.section}>
      <div className={styles.phonebook}>
        <div>
          <h2 className={styles.titleMain}>Phonebook</h2>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => {
              setModal(showModal => !showModal);
            }}
          >
            Add Contact
          </button>
        </div>
        <div>
          <Filter filterValue={filter} onFilterChange={hendleOnchange} />
          <h2 className={styles.title}>Contacts</h2>
          <ul className={styles.itemList}>
            <ContactList
              contItems={contacts}
              filteredValue={filter}
              deleteHandler={deleteHandler}
            />
          </ul>
        </div>
      </div>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <ContactForm onSubmitForm={onSubmitForm} />
          <button type="button" className={styles.btn} onClick={toggleModal}>
            X
          </button>
        </Modal>
      )}
    </div>
  );
};

export default App;
