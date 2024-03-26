import css from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          onClick={() => {
            onClick(image.id);
          }}
          alt=""
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
