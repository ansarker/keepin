import React from 'react';
import Datalisting from './DataListing';
import Spinner from './Spinner';

const Dashboard = ({ loading, error }) => {
  // if (loading) return <Spinner />
  // if (error) return
  // <div className="bg-red-100 p-6 md:p-12 text-center rounded">
  //   <p className="text-red-700">{error}</p>
  // </div>

  return (
    <div>
      <div className="mb-3 md:mb-6">
        <h1 className="text-lg md:text-2xl font-black text-gray-700 mb-3">All Credentials</h1>
        {
          // data.length > 0 ?
          //   <Datalisting data={data} remove={remove} />
          //   :
          <div className="bg-white shadow-md flex flex-col items-center justify-center p-6 md:p-12 rounded-md">
            <h1 className="text-base md:text-lg font-bold mb-2 text-gray-500">No data</h1>
            <p className="text-xs font-normal text-gray-400">Looks like you haven't kept any data yet</p>
          </div>
        }

      </div>
    </div>
  );
}

export default Dashboard;
