import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import css from '../ImageGallery/ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;
const fetchKey = '31291056-02b52945dcd563b074a1c7cbe';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      this.props.handleStatus('pending');
      fetch(
        `${BASE_URL}?q=${this.props.query}&key=${fetchKey}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${this.props.page}`
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
            toast.error(`There are no images with query ${this.props.query}`);
            this.setState({ images: [] });
            this.props.onFetchImages(0);
            return;
          }
          if (prevProps.query !== this.props.query) {
            this.setState({ images: images.hits });
            this.props.onFetchImages(images.totalHits);
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
          }));
          this.props.onFetchImages(images.totalHits);
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.props.handleStatus('resolved'));
    }
  }
  render() {
    const { images, error } = this.state;
    return (
      <ul className={css.imageGallery}>
        {this.state.error && error.message}
        {images.map(image => {
          return (
            <ImageGalleryItem
              id={image.id}
              smallFormat={image.webformatURL}
              largeFormat={image.largeImageURL}
              key={image.id}
              handleModal={this.props.handleModal}
            />
          );
        })}
      </ul>
    );
  }
}
