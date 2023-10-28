export const ImageGalleryItem = ({ largeImg, smallImg }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={smallImg} alt="" />
    </li>
  );
};
