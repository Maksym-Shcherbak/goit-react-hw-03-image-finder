import { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onHandleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.setState({ name: '', number: '' });
    const form = e.currentTarget;
    form.reset();
  };

  saveName = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.onHandleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className={css.contactForm__input}
          id="name"
          value={this.name}
          onChange={this.saveName}
          pattern={
            "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          }
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          className={css.contactForm__input}
          id="number"
          value={this.number}
          onChange={this.saveName}
          pattern={
            '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}'
          }
          required
        />
        <button type="submit" className={css.contactForm__button}>
          Add contact
        </button>
      </form>
    );
  }
}
