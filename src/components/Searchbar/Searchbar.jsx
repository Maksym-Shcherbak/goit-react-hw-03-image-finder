import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onHandleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.setState({ searchQuery: '' });
    const form = e.currentTarget;
    form.reset();
  };

  saveName = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <header className="searchbar" onSubmit={this.onHandleSubmit}>
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
