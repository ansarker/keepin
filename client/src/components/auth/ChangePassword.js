import React from 'react';

const Changepassword = () => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-black text-gray-900">Change Password</h1>
      <div className="py-8">
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3">
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Current password" />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3">
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="New password" />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3">
              <input class="appearance-none block w-full bg-white text-black border border-black rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Copnfirm new password" />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2 items-center justify-end">
            <button className="bg-white px-7 py-2 hover:text-gray-500 text-lg font-semibold mr-2 rounded-full">Cancel</button>
            <button className="bg-green-500 px-7 py-2 hover:text-white text-lg font-semibold rounded-full">Change password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Changepassword;
