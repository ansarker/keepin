import React from 'react'
import './Loading.css';

const Loading = () => {
  return (
    <div className="load_container w-full h-full absolute flex items-center justify-center top-0 left-0 bg-black opacity-80 z-50">
      <div className="loader"></div>
    </div>
  )
}

export default Loading
