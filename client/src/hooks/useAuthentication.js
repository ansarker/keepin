import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const useAuthentication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memory, setMemory] = useState({
    token: null,
    token_expiry: null
  });

  const signin = async ({ username, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/signin', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setLoading(false);
      localStorage.setItem('auth', JSON.stringify({
        _id_token_: data.token,
        _id_token_expiry_: Date.now() + (1000 * 60 * 5)
      }));

      inMemory();

      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000)
    } finally {
      setLoading(false);
    }
  }

  const signup = async (user) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/auth/signup`, user, {
        headers: { 'Content-Type': 'application/json' }
      })
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000)
    } finally {
      setLoading(false);
    }
  }

  const signout = () => {
    localStorage.clear();
    navigate('/signin')
  }

  const inMemory = () => {
    let token = JSON.parse(localStorage.getItem('auth'));
    if (token) {
      setMemory({
        token: token._id_token_,
        token_expiry: token._id_token_expiry_
      })
    } else {
      return null;
    }
  }

  useEffect(() => {
    inMemory();
  }, [])

  return {
    error,
    loading,
    signin,
    signup,
    signout,
    memory
  };
}

export default useAuthentication;
