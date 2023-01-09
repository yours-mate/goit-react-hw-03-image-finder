import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;
const fetchKey = '31291056-02b52945dcd563b074a1c7cbe';

export class ImageGallery extends Component {
  state = {
    images: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      fetch(
        `${BASE_URL}?q=${this.props.query}&key=${fetchKey}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${this.props.page}`
      )
        .then(res => res.json())
        .then(images => this.setState({ images: images.hits }));
    }
  }
  render() {
    const { images } = this.state;
    return (
      <ul className={css.imageGallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              id={image.id}
              smallFormat={image.webformatURL}
              largeFormat={image.largeImageURL}
              key={image.id}
            />
          );
        })}
      </ul>
    );
  }
}
