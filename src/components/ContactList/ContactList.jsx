import css from './ContactList.module.css';
import { ContactItem } from 'components/ContactItem/ContactItem';

export const Contactlist = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        ></ContactItem>
      ))}
    </ul>
  );
};
