import React from 'react';

const Editprofile = ({ user }) => {

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-black text-gray-900">Edit Profile</h1>
      <div className="py-8">
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder={user.firstName} />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Last Name
              </label>
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={user.lastName} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Username
              </label>
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={user.username} disabled={true} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder={user.email} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2 items-center justify-end">
            <button className="bg-white px-7 py-2 hover:text-gray-500 text-lg font-semibold mr-2 rounded-full">Cancel</button>
            <button className="bg-green-500 px-7 py-2 hover:text-white text-lg font-semibold rounded-full">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editprofile;
