import css from './SearchFilter.module.css';

export const SearchFilter = ({ filter, onHandleChange }) => {
  return (
    <>
      <label htmlFor="filter" className={css.filterLabel}>
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        className={css.filterInput}
        id="filter"
        value={filter}
        onChange={onHandleChange}
      />
    </>
  );
};
