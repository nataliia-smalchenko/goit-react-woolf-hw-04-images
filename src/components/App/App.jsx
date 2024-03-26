import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { useEffect, useState } from 'react';
import { getImagesApi } from '../../api/images';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openedImage, setOpenedImage] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  const handleSubmitSearchForm = searchText => {
    setSearch(searchText.toLowerCase());
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenImage = id => {
    const largeImageUrl = images.find(img => img.id === id).largeImageURL;
    setOpenedImage(largeImageUrl);
  };

  useEffect(() => {
    if (search === '') {
      return;
    }
    const getImages = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getImagesApi(search, page, 12);
        setImages(prev => (page !== 1 ? [...prev, ...data.hits] : data.hits));
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(true);
        setLoadMore(false);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [page, search]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmitSearchForm} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleOpenImage} />
      )}
      {loadMore && <Button onClick={handleLoadMoreClick} />}
      {openedImage && (
        <Modal
          image={openedImage}
          close={() => {
            setOpenedImage(null);
          }}
        />
      )}
      {error && <h2>Something went wrong...</h2>}
    </div>
  );
};
