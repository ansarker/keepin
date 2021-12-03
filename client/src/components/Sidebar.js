import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoApps } from 'react-icons/io5';
import { FaSignOutAlt } from 'react-icons/fa';
import Header from './Header';
import useAuth from '../hooks/useAuth';

const Sidebar = ({ user, categories, handleModal }) => {
  const { signout } = useAuth()
  const [open, setOpen] = useState(true);

  const handleSidebar = () => {
    setOpen(!open)
  }

  const renderedCategories = categories.map((category) =>
    <button key={category.value} className="flex w-full text-sm font-semibold text-gray-700 bg-transparent hover:bg-gray-200 px-4 py-2 rounded-lg">
      <span className="capitalize">{category.label}</span>
    </button>
  )
  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <Header open={open} handleSidebar={handleSidebar} />
      <div className={`bg-white ${open ? 'hidden' : ''} md:w-60 md:visible md:mt-20 md:block md:fixed md:top-0 md:bottom-0 p-4`}>
        <div className="relative flex flex-col">
          <button onClick={handleModal} className="flex w-full items-center justify-center bg-gray-700 hover:bg-gray-600 text-white mb-2 text-sm font-normal px-4 py-2 rounded-lg">Add new credential</button>
          <Link to="/dashboard">
            <button className="flex w-full items-center text-base text-gray-700 bg-gray-100 hover:bg-gray-200 mb-3 font-semibold px-4 py-2 rounded-lg"><IoApps /> <span className="ml-2">Dashboard</span></button>
          </Link>
          <hr />
          <div className="my-3">
            <p className="font-bold text-base text-gray-400">Categories</p>
            <div className="flex flex-col items-start mt-3 max-h-96 overflow-y-auto">
              {renderedCategories}
            </div>
          </div>
          <button className="flex w-full items-center justify-center bg-gray-700 hover:bg-gray-600 text-white mb-2 text-sm font-normal px-4 py-2 rounded-lg">Add new category</button>
        </div>
        <div className="md:absolute md:bottom-4 md:left-4 md:right-4 flex items-center justify-between">
          <Link to="/profile" className="flex items-center">
            <div className="rounded-full shadow-md w-12 h-12 border-2 border-gray-900 mr-2">
              <img src="https://i.pravatar.cc/300" alt="Profile Picture" className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-700 font-bold">
                {user?.username}
              </p>
              <span className="font-normal text-xs text-gray-500">{user?.email}</span>
            </div>
          </Link>
          <button onClick={signout} className="text-gray-700 text-2xl">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
