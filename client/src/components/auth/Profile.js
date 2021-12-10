import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Spinner from '../libs/Spinner';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    axios.get('/auth/user-profile', {
      headers: {
        'Content-type': 'applicaiont/json',
        'Authorization': `Bearer ${auth.access_token}`
      }
    })
      .then(res => {
        setUser(res.data.user);
      })
  }, [auth.isAuthenticated])

  const onTabChange = (event) => {
    setTab(event.target.name)
  }

  return (
    !user ? <Spinner /> :
      <div>
        <div className="relative">
          <div className="w-full h-32 rounded-xl bg-gradient-to-b from-gray-900 to-gray-600">
          </div>
          <div className="relative -top-16 left-1/2 transform -translate-x-1/2">
            <img src="https://i.pravatar.cc/300" alt="Profile Picture" className="w-32 h-32 rounded-md border-4 mx-auto border-black" />
          </div>
          <div className="relative bottom-3">
            <ul className="flex justify-start">
              <li style={{ marginRight: '1px' }}>
                <button onClick={onTabChange} name='profile' className={`font-bold text-sm p-2 bg-gray-300 hover:bg-gray-200 ${tab === 'profile' ? 'border-b-4 border-purple-600' : ''}`}>
                  Account Overview
                </button>
              </li>
              <li style={{ marginRight: '1px' }}>
                <button onClick={onTabChange} name='edit_profile' className={`font-bold text-sm p-2 bg-gray-300 hover:bg-gray-200 ${tab === 'edit_profile' ? 'border-b-4 border-purple-600' : ''}`}>
                  Edit Profile
                </button>
              </li>
              <li style={{ marginRight: '1px' }}>
                <button onClick={onTabChange} name='change_password' className={`font-bold text-sm p-2 bg-gray-300 hover:bg-gray-200 ${tab === 'change_password' ? 'border-b-4 border-purple-600' : ''}`}>
                  Change Password
                </button>
              </li>
            </ul>
          </div>
        </div>
        {
          tab === 'profile' &&
          <div>
            <h1 className="text-xl md:text-3xl font-black text-gray-900">Account Overview</h1>
            <div className="py-8">
              <h2 className="mb-3 text-xl font-bold">Profile</h2>
              <table className="w-full">
                <tbody>
                  <tr className="bg-white">
                    <td className="text-base border-b p-2 leading-7 font-bold text-gray-800 text-left">Name</td>
                    <td className="text-base border-b p-2 leading-7 font-medium text-gray-600 text-right md:text-left">{user.firstName + ' ' + user.lastName}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="text-base border-b p-2 leading-7 font-bold text-gray-800 text-left">Username</td>
                    <td className="text-base border-b p-2 leading-7 font-medium text-gray-600 text-right md:text-left">{user.username}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="text-base p-2 leading-7 font-bold text-gray-800 text-left">Email</td>
                    <td className="text-base p-2 leading-7 font-medium text-gray-600 text-right md:text-left">{user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }

        {
          tab === 'edit_profile' &&
          <EditProfile user={user} />
        }

        {
          tab === 'change_password' &&
          <ChangePassword />
        }
      </div>
  );
}

export default Profile;
