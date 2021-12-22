import React from "react";

const Editprofile = ({ user }) => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-black text-gray-900">
        Edit Profile
      </h1>
      <div className="py-8">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder={user.firstName}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder={user.lastName}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder={user.username}
                disabled={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder={user.email}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-2 items-center justify-end">
            <button className="bg-green-500 text-black px-7 py-2 hover:text-white text-lg font-semibold rounded-md">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;
