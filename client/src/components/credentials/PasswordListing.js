import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr'
import useAuth from '../../hooks/useAuth';
import Loading from '../libs/Loading';
import NoData from '../libs/NoData';
import DataListing from './DataListing';
import Modal from '../libs/Modal';
import AddPassword from './AddPassword';

const PasswordListing = () => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [passwordListing, setPasswordListing] = useState([]);
  const [state, setState] = useState({ loading: false, error: '' });
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setState({ loading: true })
    axios.get('/passwords/read', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${auth.access_token}`
      }
    })
      .then((res) => {
        setPasswordListing(res.data.data);
        setState({
          loading: false,
          error: null
        })
      })
      .catch((error) => {
        setState({ error: error.response.data.error })
        setTimeout(() => {
          setState({ error: '' })
        }, 5000)
      })
  }, [auth.isAuthenticated, deleted])

  const handleModal = () => {
    setShowModal(show => !show)
  }

  const remove = (data) => {
    axios.post('/passwords/delete', { _id: data._id }, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${auth.access_token}`
      }
    }).then(res => {
      setDeleted(!deleted);
    })
  }

  return (
    <div className="mb-3 md:mb-6">
      <div className="mb-6">
        <button
          onClick={handleModal}
          className="flex items-center font-semibold text-sm text-black bg-white shadow-lg py-2 px-5 rounded-md"
        >
          <GrAdd className="mr-2" /><span>Add Item</span>
        </button>
      </div>
      <h1 className="text-lg md:text-2xl font-black text-gray-700 mb-3">Saved Passwords</h1>
      {state.loading && <Loading />}
      {!state.loading && state.error && <h1>Error while fetching data...</h1>}
      {
        passwordListing && passwordListing.length > 0 ?
          <DataListing data={passwordListing} remove={remove} /> : <NoData />
      }
      <Modal showModal={showModal} setShowModal={setShowModal} heading={"Add Password"}>
        <AddPassword passwordListing={passwordListing} setPasswordListing={setPasswordListing} />
      </Modal>
    </div>
  )
}

export default PasswordListing;