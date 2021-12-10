import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, signup } = useAuth();

  const onSignup = () => {
    const user = { username, email, password };
    signup(user);
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full lg:w-1/3 md:w-1/2 md:rounded-lg md:bg-white p-6 md:p-12" style={{width: "480px"}}>
        {state.error &&
          <div className={`absolute top-0 left-0 right-0 text-center bg-red-100 py-1`}>
            <p className="text-xs text-red-700">{state.error}</p>
          </div>
        }
        <div className="mb-6">
          <h1 className="text-lg text-white md:text-gray-900 md:text-2xl md:mb-2 font-bold">Sign up</h1>
          <p className="text-sm text-white md:text-gray-700">Join with us</p>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full px-3 py-2 rounded border outline-none text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-3 py-2 rounded border outline-none text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" className="w-full px-3 py-2 rounded border outline-none text-gray-700" />
          </div>
          <div className="mb-4">
            <button onClick={onSignup} className="bg-green-500 hover:bg-green-700 text-white tracking-wider w-full p-3 rounded-md shadow-md font-bold">
              {state.loading ? 'Signing up...' : 'Signup'}
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-white md:text-gray-700 mb-6">OR</p>
        <div className="grid grid-cols-1 gap-4 mb-5">
          <button className="text-base font-bold bg-white hover:bg-gray-50 shadow-md hover:text-gray-700 flex items-center justify-center py-2 rounded-md" style={{ color: "#3B5998" }}> <FaFacebookSquare className="mx-2" /> <span>Facebook</span></button>
          <button className="text-base font-bold bg-white hover:bg-gray-50 shadow-md hover:text-gray-700 flex items-center justify-center py-2 rounded-md" style={{ color: "#cc0033" }}> <FaGoogle className="mx-2" /> <span>Google</span></button>
        </div>
        <div className="flex flex-row items-center justify-center mt-6">
          <span className="text-white md:text-gray-700 text-sm font-medium mr-3">Already a member?</span>
          <Link to="/signin" className="text-sm font-medium text-blue-700 hover:text-blue-500">Signin</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
