import React, { useState } from 'react';
import AddNew from './AddNew';
import Modal from './Modal';
import Sidebar from './Sidebar';
import categories from '../data/categories.json';

const Wrapper = ({ children, user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(show => !show)
  }

  return (
    <div className="bg-gray-100 md:min-h-screen w-full">
      <Sidebar categories={categories} user={user} handleModal={handleModal} />
      <div className="mt-20 relative min-h-screen md:ml-60 p-2 md:p-4">
        {children}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <AddNew categories={categories} setShowModal={setShowModal} />
        </Modal>
      </div>
    </div>
  );
}

export default Wrapper;
