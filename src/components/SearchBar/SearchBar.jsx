import { Component } from 'react';
import css from '../SearchBar/SearchBar.module.css';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleNameChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warning('Enter search query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    e.target.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <FcSearch style={{ height: 24, width: 24 }} />
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
