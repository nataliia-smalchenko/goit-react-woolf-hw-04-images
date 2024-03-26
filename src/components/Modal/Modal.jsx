import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, close }) => {
  useEffect(() => {
    const closeByEscape = evt => {
      if (evt.code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [close]);

  return (
    <div
      className={css.Overlay}
      onClick={evt => {
        if (evt.target === evt.currentTarget) {
          close();
        }
      }}
    >
      <div className={css.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
