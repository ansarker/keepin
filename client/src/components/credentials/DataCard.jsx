import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdDescription } from 'react-icons/md';
import { IoStar, IoStarOutline, IoMail } from 'react-icons/io5';

const Datacard = ({ data, remove }) => {
  const [favorite, setFavorite] = useState(false);
  const addToFavorite = (item) => {
    console.log(item);
  }
  return (
    <div className="items-center justify-center w-full bg-white rounded-lg shadow p-4 pl-0 md:p-6 md:pl-0">
      <div className="flex items-center justify-between">
        <button onClick={() => addToFavorite(data)} className="text-2xl px-2">
          {
            !favorite ? <IoStar className="text-yellow-500" /> : <IoStarOutline className="text-black" />
          }
        </button>
        <div className="text-left flex-grow">
          <p className="text-left text-xl text-gray-800 font-bold mb-1">{data.title}</p>
          <p className="text-left text-sm text-gray-500 font-normal flex items-center mb-2"><IoMail className="mr-1" /> {data?.email}</p>
        </div>
        <div className="flex flex-col items-center justify-end">
          <Link to={`/details/${data._id}`} className="text-2xl text-gray-600 hover:text-gray-400">
            <MdDescription />
          </Link>
          <button onClick={() => remove(data)} className="text-2xl text-red-600 hover:text-red-400">
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Datacard;