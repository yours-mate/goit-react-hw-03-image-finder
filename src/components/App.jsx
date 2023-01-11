import { Component } from 'react';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    imagesQuantity: 0,
    status: '',
    showModal: false,
    modalContent: {
      src: '',
      alt: '',
    },
  };

  onFormSubmit = query => {
    this.setState({ query, page: 1 });
  };

  onFetchImages = imagesQuantity => {
    this.setState({ imagesQuantity });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleStatus = statusValue => {
    this.setState({ status: statusValue });
  };

  handleModal = (src, alt) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalContent: {
        src,
        alt,
      },
    }));
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        {this.state.showModal && (
          <Modal handleModal={this.handleModal}>
            <img
              src={this.state.modalContent.src}
              alt={this.state.modalContent.alt}
            />
          </Modal>
        )}
        <SearchBar onSubmit={this.onFormSubmit} />
        <ImageGallery
          query={this.state.query}
          page={this.state.page}
          onFetchImages={this.onFetchImages}
          handleStatus={this.handleStatus}
          handleModal={this.handleModal}
        />
        {this.state.status === 'pending' && <Loader />}

        {this.state.imagesQuantity > 12 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
