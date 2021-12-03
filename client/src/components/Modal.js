import React, { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();
  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }
  return (
    <>
      {showModal ?
        <div className="absolute top-0 bottom-0 right-0 left-0" style={{ background: 'rgba(0,0,0,0.7)', zIndex: '9999' }} ref={modalRef} onClick={closeModal}>
          <div className="bg-white w-full md:w-2/3 lg:w-2/5 relative top-1/2 left-1/2" style={{ transform: 'translateY(-50%) translateX(-50%)' }}>
            <button className="bg-white text-black p-2 absolute -top-10 -right-10 rounded-full hover:text-red-600" onClick={() => setShowModal(show => !show)}><FaTimes className="text-xl" /></button>
            {children}
          </div>
        </div>
        : null
      }
    </>
  );
}

export default Modal;
