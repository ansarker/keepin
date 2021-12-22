import React from "react";

const Changepassword = () => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-black text-gray-900">
        Change Password
      </h1>
      <div className="py-8">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="Current password"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="New password"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="Copnfirm new password"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-2 items-center justify-end">
            <button className="bg-green-500 text-black px-7 py-2 hover:text-white text-lg font-semibold rounded-md">
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Changepassword;
