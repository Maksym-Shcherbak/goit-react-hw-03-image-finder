export const ImageGalleryItem = ({ largeImg, smallImg, showModal, tags }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={smallImg}
        alt={tags}
        data-source={largeImg}
        className="ImageGalleryItem-image"
        onClick={showModal}
      />
    </li>
  );
};
