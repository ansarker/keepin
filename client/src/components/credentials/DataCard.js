import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdDescription } from 'react-icons/md';
import { IoMail } from 'react-icons/io5';

const Datacard = ({ data, remove }) => {
  return (
    <div className="items-center justify-center w-full bg-white rounded-lg shadow p-4 md:p-6">
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
        <p className="text-left text-sm text-gray-500 font-normal flex items-center mb-2"><IoMail className="mr-1" /> {data?.email}</p>
      </div>
    </div>
  );
}

export default Datacard;
