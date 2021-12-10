import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../config/config';
import categories from '../../data/categories.json';

const Edit = ({ data, setIsUpdated, setShowModal }) => {
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
      axios.put(`${api}/passwords/edit/${_id}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('__id_token__')}`
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

  return (
    <div>
      <div className="w-full px-6 pt-6">
        <h1 className="text-3xl text-gray-800 font-black">Update data</h1>
      </div>
      <div className="w-full px-6 pt-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="category">Select Category</label>
        <select name="category" onChange={onAccountInfoChange} value={updateData.category} className="block w-full bg-gray-200 text-gray-700 capitalize focus:border-gray-700 rounded py-3 px-4 focus:outline-none">
          {
            categories.map((category) => <option className="capitalize" value={category.value} key={category.value}>{category.label}</option>)
          }
        </select>
      </div>
      <div className="w-full box-border px-6 pt-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input value={updateData.title} name="title" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="Title" />
      </div>
      <div className="w-full box-border px-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input value={updateData.email} name="email" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="email" placeholder="johndoe@xxxxx.xxx" />
      </div>
      <div className="w-full box-border px-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input value={updateData.username} name="username" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="john_doe" />
      </div>
      <div className="w-full box-border px-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input value={updateData.password} name="password" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="password" placeholder="********" />
      </div>
      <button disabled={pending} onClick={onUpdateData} className="w-full py-3 bg-gray-700 hover:bg-gray-700 text-white uppercase text-lg font-bold tracking-wider">
        {pending ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}

export default Edit;
