import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css['ImageGalleryItem-image']}
        src={src}
        alt={alt}
        onClick={onClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
