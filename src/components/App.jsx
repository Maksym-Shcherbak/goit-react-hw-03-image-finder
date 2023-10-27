import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Contactlist } from './ContactList/ContactList';
import { SearchFilter } from './SearchFilter/SearchFilter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const { name, number } = newContact;
    const isExist = this.isInPhonebook(name);
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const contact = {
      name,
      id: nanoid(),
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = e => {
    const { contacts } = this.state;
    const id = e.target.closest('li').id;
    const contactsAfterDelete = contacts.filter(contact => contact.id !== id);
    this.setState(prevState => ({ contacts: contactsAfterDelete }));
  };

  searchContact = e => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  isInPhonebook = name => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter } = this.state;
    return (
      <div className="container">
        <h1 className="phonebookTitle">Phonebook</h1>
        <ContactForm onAddContact={this.addContact}></ContactForm>
        <h2 className="contactsTitle">Contacts</h2>
        {this.state.contacts.length !== 0 && (
          <Contactlist
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          ></Contactlist>
        )}
        {this.state.contacts.length > 1 && (
          <SearchFilter
            filter={filter}
            onHandleChange={this.searchContact}
          ></SearchFilter>
        )}
      </div>
    );
  }
}
