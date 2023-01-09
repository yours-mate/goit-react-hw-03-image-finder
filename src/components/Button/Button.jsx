import { Component } from 'react';
import css from '../Button/Button.module.css';

export class Button extends Component {
  render() {
    return (
      <button
        className={css.button}
        type="button"
        onClick={this.props.onLoadMore}
      >
        Load more
      </button>
    );
  }
}
