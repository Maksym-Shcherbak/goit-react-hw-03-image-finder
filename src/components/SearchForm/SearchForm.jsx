import {
  Form,
  FormButton,
  FormButtonLabel,
  FormInput,
} from './SearchForm.styled';
import PropTypes from 'prop-types';

export const SearchForm = ({ query, saveName }) => {
  return (
    <Form>
      <FormButton type="submit">
        <FormButtonLabel>Search</FormButtonLabel>
      </FormButton>

      <FormInput
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="searchQuery"
        value={query}
        onChange={saveName}
      />
    </Form>
  );
};

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  saveName: PropTypes.func.isRequired,
};
