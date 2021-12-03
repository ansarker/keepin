import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Wrapper from './Wrapper';
import Dashboard from './Dashboard';
import Details from './Details';
import NotFound from './NotFound';
import Profile from './Profile';
import PrivateRoute from './routing/PrivateRoute';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Main = () => {
  const { memory } = useAuth();

  if (memory._id_token_) {
    return;
  }

  return (
    <Routes>
      <Route exact path="/" element={<PrivateRoute />}>
        <Route
          path='dashboard'
          element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
          }
        />
        <Route
          path="details/:detailId"
          element={
            <Wrapper>
              <Details />
            </Wrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <Wrapper>
              <Profile />
            </Wrapper>
          }
        />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword/:resetToken" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Main;
