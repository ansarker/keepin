import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const Profile = (props) => {
  // const { auth, store } = useAuth();

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const userInfo = async () => {
  //     setLoading(true);
  //     let token = store;

  //     console.log(token);
  //     try {
  //       const { data } = await axios.get('/auth/user-profile', {
  //         headers: {
  //           'Application-Type': 'application/json',
  //           'Authorization': `Bearer ${token.__id_token__}`
  //         }
  //       });
  //       console.log(data);
  //       setUser(data.user);
  //       setLoading(false);
  //     } catch (error) {
  //       // console.log(error);
  //       // setError(error.response.data.error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   userInfo();
  // }, [])

  return (
    <div>
      <div className="relative">
        <div className="w-full h-32 rounded-xl bg-gradient-to-b from-gray-900 to-gray-600">
        </div>
        <div className="relative -top-16 left-1/2 transform -translate-x-1/2">
          <img src="https://i.pravatar.cc/300" alt="Profile Picture" className="w-32 h-32 rounded-md border-4 mx-auto border-black" />
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-xl md:text-3xl text-gray-800 tracking-wide">{"firstName"} {"lastName"}</h1>
        {/* <p className="text-gray-600 font-medium text-base">@{user?.username}</p>
        <span>{user?.email}</span> */}
      </div>
    </div>
  );
}

export default Profile;
