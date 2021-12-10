import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const AddPassword = ({ passwordListing, setPasswordListing, setShowModal }) => {
  const { auth } = useAuth();
  const [state, setState] = useState({ loading: false, error: '' });
  const [accountInfo, setAccountInfo] = useState({
    title: '',
    email: '',
    username: '',
    url: '',
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
      setState({ loading: true, error: null });
      axios.post(`passwords/create`, accountInfo, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${auth.access_token}`
        }
      })
        .then((response) => {
          setPasswordListing(response.data)
          setState({ loading: false, error: '' });
          setShowModal(false)
        })
        .catch((error) => {
          console.log(error.response);
          setPasswordListing([...passwordListing])
          // need to solve this khankir chele...
          error.response && setState({ loading: false, error: error.response.data.error })
          setTimeout(() => {
            setState({ error: '' })
          }, 5000)
        })
    }
    add();
  }

  return (
    <div>
      <div className="w-full box-border mb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input name="title" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="ex. Github" />
      </div>
      <div className="w-full box-border mb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input name="email" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="email" placeholder="ex. johndoe@xxxxx.xxx" />
      </div>
      <div className="w-full box-border mb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input name="username" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="ex. john_doe" />
      </div>
      <div className="w-full box-border mb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input name="password" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="password" placeholder="********" />
      </div>
      <div className="w-full box-border mb-6">
        <label className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2" htmlFor="url">Url</label>
        <input name="url" onChange={onAccountInfoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white" type="text" placeholder="ex. www.github.com" />
      </div>
      <div className="w-full flex items-center justify-end box-border mb-6">
        <button disabled={state.loading} onClick={submitAccountInfo} className="py-3 px-5 bg-gradient-to-b from-gray-600 to-gray-700 text-white text-lg font-bold tracking-wider rounded-2xl shadow-xl">
          {state.loading ? 'Saving...' : 'Save'}
        </button>
      </div>
      {state.error &&
        <div className="w-full flex items-center">
          <span className="bg-red-100 text-red-600 p-1 text-sm">There was an error: {state.error}</span>
        </div>
      }
    </div>
  );
}

export default AddPassword;
