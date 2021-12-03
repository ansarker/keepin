import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdDescription } from 'react-icons/md';
import { IoMail } from 'react-icons/io5';

const Datacard = ({ data, remove }) => {
  return (
    <div className="w-full bg-white rounded-lg sahdow-lg p-3 md:p-6 justify-center items-center">
      <div className="text-left">
        <div className="flex items-center justify-between">
          <div className="block">
            <p className="text-left text-xl text-gray-800 font-bold mb-1">{data.title}</p>
          </div>
          <div className="flex items-center justify-end">
            <Link to={`/details/${data._id}`} className="text-2xl text-gray-600 hover:text-gray-400">
              <MdDescription />
            </Link>
            <button onClick={() => remove(data)} className="text-2xl text-red-600 hover:text-red-400">
              <MdDeleteOutline />
            </button>
          </div>
        </div>
        <p className="text-left text-sm text-gray-500 font-normal flex items-center mb-2"><IoMail className="mr-1" /> {data.email}</p>
        <span className="text-xs text-white py-1 px-2 bg-gray-700 rounded-xl font-bold tracking-wider">{data.category ? data.category : 'Unknown'}</span>
      </div>
    </div>
  );
}

export default Datacard;
