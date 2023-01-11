import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  handleOpenedModal = e => {
    if (e.code === 'Escape') {
      this.props.handleModal();
    }
  };

  componentDidMount() {
    console.log('mount');
    window.addEventListener('keydown', this.handleOpenedModal);
  }

  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('keydown', this.handleOpenedModal);
  }

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.props.handleModal}>
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
