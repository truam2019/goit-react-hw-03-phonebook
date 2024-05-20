import React, { Component } from 'react';
import Contacts from './contacts/Contacts';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('contacts') === null)
      localStorage.setItem('contacts', JSON.stringify([]));
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts')),
    });
  }

  addContact = contact => {
    const json = localStorage.getItem('contacts');
    const items = JSON.parse(json);
    const result = items.filter(word =>
      word.name.toLowerCase().includes(contact.name.toLowerCase())
    );
    if (result.length > 0) return alert(`${result[0].name} already exists`);
    items.push(contact);
    localStorage.setItem('contacts', JSON.stringify(items));
    this.setState({
      contacts: [...items],
    });
  };

  findContact = param => {
    const json = localStorage.getItem('contacts');
    const items = JSON.parse(json);
    const result = items.filter(word =>
      word.name.toLowerCase().includes(param)
    );
    if (param === '') return this.setState({ contacts: items });
    this.setState({ contacts: result });
  };

  deleteContact = id => {
    const json = localStorage.getItem('contacts');
    const items = JSON.parse(json);
    const result = items.findIndex(contact => contact.id === id);
    items.splice(result, 1);
    localStorage.setItem('contacts', JSON.stringify(items));
    this.setState({
      contacts: [...items],
    });
  };

  render() {
    return (
      <div className="app">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filterContacts={this.findContact} />
        <Contacts
          contactsList={this.state.contacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
