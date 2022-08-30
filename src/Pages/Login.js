import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const baseUrl = `http://192.168.17.144:8888`;

  const [data, setData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSumbit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSumbit(true);

    axios
      .post(`${baseUrl}/users/login`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => response)
      .then((data) => {
        var token = data.data.token;
        var decoded = jwt_decode(token);

        Cookies.set('token', data.data.token);
        Cookies.set('refToken', data.data.refresh_token);
        console.log(decoded);

        navigate('/');
      })
      .catch((err) => {
        alert('Data login tidak sesuai!');
        console.log(err.message);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    }
    return errors;
  };

  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 h-[90vh] pt-12'>
      <div className='mx-auto mt-12 form-control w-full px-6 py-6 max-w-lg bg-base-100 rounded-md shadow-xl'>
        <h1 className='text-center text-2xl font-bold py-2 mb-4'>Login</h1>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='text'
              name='email'
              placeholder='email'
              className='input input-bordered w-full max-w-xs'
              value={data.email}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.email}</p>
          </div>
          <div className='flex flex-col justify-center items-center mt-4'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='password'
              className='input input-bordered w-full max-w-xs'
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.password}
            </p>
          </div>
          <div className='flex justify-center items-center py-6 mt-2'>
            <button>
              <a className='btn btn-primary px-3 py-1' onClick={handleSumbit}>
                Login
              </a>
            </button>
          </div>
        </form>
        <div>
          <p className='text-center'>
            Dont have an account?{' '}
            <a
              className='underline underline-offset-1 cursor-pointer'
              onClick={() => {
                navigate('/register');
              }}
            >
              Register Here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
