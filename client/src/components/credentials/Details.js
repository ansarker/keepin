import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { FaTrash, FaEdit } from 'react-icons/fa'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { api } from '../../config/config';
import { dateFormater } from "../../assets/js/helpers";
import Spinner from '../libs/Spinner';
import Modal from '../libs/Modal';
import Edit from './Edit';

const Details = () => {
  const { detailId } = useParams()
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [password, setPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(show => !show)
  }

  const showPassword = (salt, watchword) => {
    axios.get(`${api}/auth/decrypt`, {
      params: { salt, watchword },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => {
        setPassword(res.data);
        setShow(!show);
      })
  }


  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(`${api}/passwords/details/${detailId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('__id_token__')}`
        }
      });
      setDetails(data.data)
      setIsUpdated(false);
    }
    fetchDetails()
  }, [isUpdated])

  return details ? (
    <div className="bg-white p-6 md:p-8 w-full md:w-2/3 lg:w-1/2 mx-auto rounded-md shadow-md">
      <div className="flex items-center pb-2 mb-5 justify-between border-b border-gray-400">
        <div className="block">
          <h1 className="text-xl md:text-2xl font-bold md:font-black text-gray-700">{details.title}</h1>
        </div>
        <div className="flex items-center text-center">
          <button onClick={handleModal} className="text-gray-600 hover:text-green-400 text-xl font-bold mx-1"><FaEdit /></button>
          <button className="text-gray-600 hover:text-red-400 text-xl font-bold mx-1"><FaTrash /></button>
        </div>
      </div>
      <div className="block">
        <table>
          <tbody>
            <tr>
              <td><p className="text-black leading-7 text-sm font-normal text-right">Email</p></td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black"> {details.email}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">Username</p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black">{details.username}</p>
              </td>
            </tr>
            <tr>
              <td><p className="text-black leading-7 text-sm font-normal text-right">Password</p></td>
              <td className="flex items-center justify-between">
                <p className="ml-3 text-sm leading-7 font-bold text-black">
                  {show ? password ? password : details?.watchword : '•'.repeat(details.watchword.length)}
                </p>
                <button onClick={() => showPassword(details.salt, details.watchword)}>
                  {
                    show ?
                      <IoEye className="text-gray-600" />
                      :
                      <IoEyeOff className="text-gray-600" />
                  }
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">Category</p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black">{details.category}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <hr className="my-5" />
        <table>
          <tbody>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">Last modified</p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black">
                  {details.updatedAt ? dateFormater(details.updatedAt) : 'not available'}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">Created</p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black">
                  {details.createdAt ? dateFormater(details.createdAt) : 'not available'}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">URL</p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-normal text-black">
                  <a href="" target="_blank">https://www.facebook.com</a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <Modal showModal={showModal} setShowModal={setShowModal}>
          <Edit setIsUpdated={setIsUpdated} data={details} setShowModal={setShowModal} />
        </Modal>
      </div>
    </div>

  ) : <Spinner />
}

export default Details;
