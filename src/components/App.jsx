import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: 1,
    query: '',
  };

  onFormSubmit = query => {
    this.setState({ query });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
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
        <ImageGallery query={this.state.query} page={this.state.page} />
        <Button onLoadMore={this.onLoadMore} />
        <ToastContainer />
      </div>
    );
  }
}
