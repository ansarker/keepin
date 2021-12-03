import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../config/config';

const AddNew = ({ categories, setData, data, setShowModal }) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(undefined);
  const [accountInfo, setAccountInfo] = useState({
    category: categories[0].label,
    title: '',
    email: '',
    username: '',
    password: ''
  });

  const onAccountInfoChange = (evt) => {
    const value = evt.target.value;
    setAccountInfo({
      ...accountInfo,
      [evt.target.name]: value
    })
  }

  const submitAccountInfo = () => {
    const add = () => {
      setPending(true);
      setError(undefined);
      axios.post(`${api}/passwords/create`, accountInfo)
        .then((response) => {
          setPending(false);
          setData([response.data, ...data])
          setError(undefined);
          setShowModal(false)
        })
        .catch((error) => {
          setPending(false);
          setData(undefined)
          setError(error)
        })
    }
    add();
  }

  return (
    <div>
      <div className="w-full px-6 pt-6">
        <h1 className="text-3xl text-gray-800 font-black">Add to list</h1>
      </div>
      <div className="w-full px-6 pt-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="category">Select Category</label>
        <select name="category" onChange={onAccountInfoChange} className="block w-full bg-gray-200 text-gray-700 capitalize focus:border-gray-700 rounded py-3 px-4 focus:outline-none">
          {
            categories.map((category) => {
              console.log(category.label)
              return (<option className="capitalize" value={category.label} key={category._id}>
                <span className="capitalize">{category.label}</span>
              </option>)
            })
          }
        </select>
      </div>
      <div className="w-full box-border px-6 pt-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input name="title" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="Title" />
      </div>
      <div className="w-full box-border px-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input name="email" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="email" placeholder="johndoe@xxxxx.xxx" />
      </div>
      <div className="w-full box-border px-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input name="username" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="john_doe" />
      </div>
      <div className="w-full box-border px-6 pb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input name="password" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="password" placeholder="********" />
      </div>
      <button disabled={pending} onClick={submitAccountInfo} className="w-full py-3 bg-gray-700 hover:bg-gray-700 text-white uppercase text-lg font-bold tracking-wider">
        {pending ? 'Submiting...' : 'Submit'}
      </button>
      {error && <span>There was an error {error}</span>}
    </div>
  );
}

export default AddNew;
