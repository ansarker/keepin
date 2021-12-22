import React, { useContext, useEffect, useState } from "react";
import Spinner from "../libs/Spinner";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Loading from "../libs/Loading";

const Profile = () => {
  const { authTokens } = useContext(AuthContext);
  const [state, setState] = useState({ loading: false, message: "" });
  const [userProfile, setUserProfile] = useState(null);
  const [tab, setTab] = useState("profile");
  const onTabChange = (event) => {
    setTab(event.target.name);
  };

  useEffect(() => {
    let fetchUserProfile = async () => {
      setState({ loading: true, message: "" });
      try {
        let { access_token } = authTokens;
        let response = await axios.get("/auth/user-profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.status === 200) {
          setState({ loading: false, message: "" });
          let { data } = response;
          setUserProfile(data.user);
        } else {
          setState({ loading: false, message: "Something went wrong!" });
          setTimeout(() => {
            setState({ message: "" });
          }, 5000);
        }
      } catch (error) {
        setState({ loading: false, message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };
    fetchUserProfile();
  }, [authTokens]);

  return (
    <div>
      <div className="relative">
        <div className="w-full h-32 rounded-xl bg-gradient-to-b from-gray-900 to-gray-600"></div>
        <div className="relative -top-16 left-1/2 transform -translate-x-1/2">
          {!authTokens ? (
            <div className="border-4 border-gray-300 w-32 h-32 shadow flex items-center justify-center rounded-md p-4 mx-auto bg-gradient-to-b from-gray-900 to-gray-600">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 h-12 w-12"></div>
              </div>
            </div>
          ) : (
            <img
              src="https://i.pravatar.cc/300"
              alt="Profile Picture"
              className="w-32 h-32 rounded-md border-4 mx-auto border-gray-300"
            />
          )}
        </div>
        <div className="relative bottom-3">
          <ul className="flex justify-start">
            <li style={{ marginRight: "1px" }}>
              <button
                onClick={onTabChange}
                name="profile"
                className={`font-bold text-black text-sm p-2 bg-gray-300 hover:bg-gray-200 ${
                  tab === "profile" ? "border-b-4 border-purple-600" : ""
                }`}
              >
                Account Overview
              </button>
            </li>
            <li style={{ marginRight: "1px" }}>
              <button
                onClick={onTabChange}
                name="edit_profile"
                className={`font-bold text-black text-sm p-2 bg-gray-300 hover:bg-gray-200 ${
                  tab === "edit_profile" ? "border-b-4 border-purple-600" : ""
                }`}
              >
                Edit Profile
              </button>
            </li>
            <li style={{ marginRight: "1px" }}>
              <button
                onClick={onTabChange}
                name="change_password"
                className={`font-bold text-black text-sm p-2 bg-gray-300 hover:bg-gray-200 ${
                  tab === "change_password"
                    ? "border-b-4 border-purple-600"
                    : ""
                }`}
              >
                Change Password
              </button>
            </li>
          </ul>
        </div>
      </div>
      {tab === "profile" &&
        (state.loading ? (
          <Loading />
        ) : userProfile ? (
          <div>
            <h1 className="text-xl md:text-3xl font-black text-gray-900">
              Account Overview
            </h1>
            <div className="py-8">
              <h2 className="mb-3 text-gray-600 text-xl font-bold">Profile</h2>
              <table className="w-full">
                <tbody>
                  <tr className="bg-white">
                    <td className="text-base border-b p-2 leading-7 font-bold text-gray-800 text-left">
                      Name
                    </td>
                    <td className="text-base border-b p-2 leading-7 font-medium text-gray-600 text-right md:text-left">
                      {userProfile.firstName + " " + userProfile.lastName}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="text-base border-b p-2 leading-7 font-bold text-gray-800 text-left">
                      Username
                    </td>
                    <td className="text-base border-b p-2 leading-7 font-medium text-gray-600 text-right md:text-left">
                      {userProfile.username}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="text-base p-2 leading-7 font-bold text-gray-800 text-left">
                      Email
                    </td>
                    <td className="text-base p-2 leading-7 font-medium text-gray-600 text-right md:text-left">
                      {userProfile.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null)}

      {tab === "edit_profile" && <EditProfile user={userProfile} />}

      {tab === "change_password" && <ChangePassword />}
    </div>
  );
};

export default Profile;
