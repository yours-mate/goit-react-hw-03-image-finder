import { Component } from 'react';
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
        <SearchBar onSubmit={this.onFormSubmit} />
        <ImageGallery
          query={this.state.query}
          page={this.state.page}
          onFetchImages={this.onFetchImages}
          handleStatus={this.handleStatus}
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
