import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./auth/Profile";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Dashboard from "./credentials/Dashboard";
import NotFound from "./libs/NotFound";
import Wrapper from "./libs/Wrapper";
import PrivateRoute from "./routing/PrivateRoute";
import PasswordListing from "./credentials/PasswordListing";
import { AuthProvider } from "../context/AuthContext";

const Main = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route
          exact
          path="/"
          element={
            <Wrapper>
              <PrivateRoute />
            </Wrapper>
          }
        > */}
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Wrapper>
                  <Dashboard />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Wrapper>
                  <Profile />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="passwords"
            element={
              <PrivateRoute>
                <Wrapper>
                  <PasswordListing />
                </Wrapper>
              </PrivateRoute>
            }
          />
          {/* </Route> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default Main;
