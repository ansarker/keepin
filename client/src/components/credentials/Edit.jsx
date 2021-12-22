import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../libs/Modal';
import './ButtonSpin.css';

const Edit = ({ data, setIsUpdated, showModal, setShowModal }) => {
  const [updateData, setUpdateData] = useState(data);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(undefined);

  const onAccountInfoChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    })
  }

  const onUpdateData = () => {
    const update = () => {
      setPending(true);
      setError(undefined);
      const { _id } = updateData;
      axios.put(`/passwords/edit/${_id}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.access_token}`
        }
      })
        .then((res) => {
          setIsUpdated(true);
          setPending(false);
          setError(undefined);
          setShowModal(false);
        })
        .catch((err) => {
          setPending(false);
          setError(err);
          setUpdateData(updateData);
        })
    }
    update();
  }

  const ButtonSpin = () => {
    return (
      <div className="progress">
            <div className="overlay"></div>
            <div className="left"></div>
            <div className="right"></div>
        </div>
    );
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} heading="Edit Detail">
      <div className="w-full box-border">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input value={updateData.title} name="title" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="Title" />
      </div>
      <div className="w-full box-border">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input value={updateData.email} name="email" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="email" placeholder="johndoe@xxxxx.xxx" />
      </div>
      <div className="w-full box-border">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input value={updateData.username} name="username" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="john_doe" />
      </div>
      <div className="w-full box-border">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input value={updateData.password} name="password" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="password" placeholder="********" />
      </div>
      <div className="w-full box-border">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="url">Url</label>
        <input value={updateData.url} name="url" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="ex. github.com" />
      </div>
      <button disabled={pending} onClick={onUpdateData} className="w-full py-3 bg-gray-700 hover:bg-gray-700 text-white uppercase text-lg font-bold tracking-wider">
        {pending ? 'Updating...' : 'Update'}
        <ButtonSpin />
      </button>
    </Modal>
  );
}

export default Edit;
