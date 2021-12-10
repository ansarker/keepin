import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const useAuthentication = () => {
  const navigate = useNavigate();
  const [store, setStore] = useLocalStorage('auth', {
    isAuthenticated: false,
    access_token: null
  })

  const [auth, setAuth] = useState({
    isAuthenticated: store.isAuthenticated,
    access_token: store.access_token
  });

  const [state, setState] = useState({
    loading: false,
    error: null
  })

  useEffect(() => {
    localStorage.getItem('access_token') &&
      setAuth({
        isAuthenticated: store.isAuthenticated,
        access_token: store.access_token
      })

    return setTimeout(() => {
      setAuth(store)
      localStorage.clear();
    }, 1000 * 60 * 10)
  }, [localStorage.getItem('access_token')])

  const signin = async ({ username, password }) => {
    setState({
      loading: true,
      error: null
    });
    try {
      const { data } = await axios.post('/auth/signin', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setState({
        loading: false,
      });
      // localStorage.setItem('access_token', JSON.stringify(data.token));
      setStore(auth => ({
        ...auth,
        isAuthenticated: true,
        access_token: data.token
      }))
      navigate('/dashboard');
    } catch (error) {
      setState({
        loading: false,
        error: error.response.data.error
      });
      setTimeout(() => {
        setState({
          error: ''
        });
      }, 5000)
    }
  }

  const signup = async (user) => {
    setState({
      loading: true,
      error: null
    });
    try {
      const { data } = await axios.post(`/auth/signup`, user, {
        headers: { 'Content-Type': 'application/json' }
      })
      setState({
        loading: false,
      });
      navigate("/signin");
    } catch (error) {
      setState({
        loading: false,
        error: error.response.data.error
      });
      setTimeout(() => {
        setState({
          error: ''
        });
      }, 5000)
    }
  }

  const signout = () => {
    localStorage.clear();
    navigate('/signin')
  }

  return {
    state,
    signin,
    signup,
    signout,
    auth
  };
}

export default useAuthentication;
