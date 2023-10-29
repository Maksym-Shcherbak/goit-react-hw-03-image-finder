import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => (
  <Gallery>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => {
      return (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          showModal={openModal}
          largeImg={largeImageURL}
          tags={tags}
        />
      );
    })}
  </Gallery>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  openModal: PropTypes.func.isRequired,
};
