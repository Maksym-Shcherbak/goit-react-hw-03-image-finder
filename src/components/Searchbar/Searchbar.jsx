import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onHandleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert('Enter query');
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
      <header className="Searchbar" onSubmit={this.onHandleSubmit}>
        <form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.query}
            onChange={this.saveName}
          />
        </form>
      </header>
    );
  }
}
