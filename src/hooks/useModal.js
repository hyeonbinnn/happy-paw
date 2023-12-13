import { useEffect } from 'react';

const useModal = ({ onClose, modalRef }) => {
  useEffect(() => {
    const clickOutside = (e) => {
      if (modalRef.current && modalRef.current === e.target) {
        onClose();
      }
    };

    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [onClose, modalRef]);

  return { modalRef };
};

export default useModal;
