import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ largeImg, smallImg, showModal, tags }) => {
  return (
    <GalleryItem>
      <ItemImage
        src={smallImg}
        alt={tags}
        data-source={largeImg}
        onClick={showModal}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImg: PropTypes.string,
  smallImg: PropTypes.string,
  showModal: PropTypes.func.isRequired,
  tags: PropTypes.string,
};
