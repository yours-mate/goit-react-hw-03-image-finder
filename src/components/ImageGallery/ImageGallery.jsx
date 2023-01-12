import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;
const fetchKey = '31291056-02b52945dcd563b074a1c7cbe';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page, onFetchImages, handleStatus } = this.props;
    const prevQuery = prevProps.query;
    const prevPage = prevProps.page;
    if (prevQuery !== query || prevPage !== page) {
      handleStatus('pending');
      fetch(
        `${BASE_URL}?q=${query}&key=${fetchKey}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${page}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`An error occured. Please try again`)
          );
        })
        .then(images => {
          if (images.hits.length === 0) {
            toast.error(`There are no images with query ${query}`);
            this.setState({ images: [] });
            onFetchImages(0);
            return;
          }
          if (prevQuery !== query) {
            this.setState({ images: images.hits });
            onFetchImages(images.totalHits);
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
          }));
          onFetchImages(images.totalHits);
        })
        .catch(error => this.setState({ error }))
        .finally(() => handleStatus('resolved'));
    }
  }
  render() {
    const { images, error } = this.state;
    const { handleModal } = this.props;
    return (
      <ul className={css.imageGallery}>
        {this.state.error && error.message}
        {images.map(image => {
          return (
            <ImageGalleryItem
              smallFormat={image.webformatURL}
              largeFormat={image.largeImageURL}
              alt={image.tags}
              handleModal={handleModal}
              key={image.id}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onFetchImages: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handleModal: PropTypes.func.isRequired,
};
