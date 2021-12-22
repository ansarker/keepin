import React from 'react';
import NoData from '../libs/NoData';

const Dashboard = () => {
  return (
    <div className="mb-3 md:mb-6">
      <h1 className="text-lg md:text-2xl font-black text-gray-700 mb-3">All Credentials</h1>
      <NoData />
    </div>
  );
}

export default Dashboard;
