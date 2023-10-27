import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li id={id} className={css.contactList__item}>
      <span className={css.contactName}>{name}</span>: {number}
      <button
        type="button"
        className={css.contactList__button}
        onClick={onDeleteContact}
      >
        Delete
      </button>
    </li>
  );
};
