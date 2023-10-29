import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { SearchBarHeader } from './SearchBar.styled';
import { SearchForm } from 'components/SearchForm/SearchForm';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onHandleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.info('Enter query');
      return;
    }
    this.props.onGetImages(this.state.searchQuery);
    this.setState({ searchQuery: '' });
    const form = e.target;
    form.reset();
  };

  saveName = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SearchBarHeader onSubmit={this.onHandleSubmit}>
        <SearchForm query={this.state.searchQuery} saveName={this.saveName} />
      </SearchBarHeader>
    );
  }
}

Searchbar.propTypes = {
  onGetImages: PropTypes.func.isRequired,
};
