import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL }) => {
      console.log(webformatURL);
      return <ImageGalleryItem key={id} smallImg={webformatURL} />;
    })}
  </ul>
);
