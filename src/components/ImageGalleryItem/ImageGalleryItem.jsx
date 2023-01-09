import { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { id, smallFormat, largeFormat } = this.props;
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItem_image}
          src={smallFormat}
          alt={id}
        />
      </li>
    );
  }
}
