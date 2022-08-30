import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  let navigate = useNavigate();
  const url = `http://192.168.17.144:8888/users/signup`;

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    user_type: '',
    email: '',
    Password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSumbit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSumbit((prev) => !prev);

    axios
      .post(url, {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        user_type: data.user_type,
        email: data.email,
        Password: data.Password,
      })
      .then((response) => response.json())
      .then(alert('Registrasi Berhasil'));
    navigate('/login');
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!values.first_name) {
      errors.first_name = 'Field is required!';
    }
    if (!values.last_name) {
      errors.last_name = 'Field is required!';
    }
    if (!values.phone) {
      errors.phone = 'Field is required!';
    }
    if (!values.user_type) {
      errors.user_type = 'Field is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'Email is invalid!';
    }
    if (!values.Password) {
      errors.Password = 'Password is required!';
    } else if (values.Password.length < 8) {
      errors.Password = 'Password must be more than 8 character';
    } else if (values.Password.length > 12) {
      errors.Password = 'Password cannot be more than 12 character';
    }
    return errors;
  };
  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 pt-12 pb-12'>
      <div className='mx-auto mt-12 form-control w-full px-6 py-6 max-w-lg bg-base-100 rounded-md shadow-xl'>
        <h1 className='text-center text-2xl font-bold py-2 mb-4'>
          Registration
        </h1>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>First Name</span>
            </label>
            <input
              type='text'
              name='first_name'
              placeholder='first name'
              className='input input-bordered w-full max-w-sm'
              value={data.first_name}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.first_name}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Last Name</span>
            </label>
            <input
              type='text'
              name='last_name'
              placeholder='last name'
              className='input input-bordered w-full max-w-sm'
              value={data.last_name}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.last_name}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Phone Number</span>
            </label>
            <input
              type='text'
              name='phone'
              placeholder='phone number'
              className='input input-bordered w-full max-w-sm'
              value={data.phone}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.phone}</p>
          </div>
          {/* <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>User Type</span>
            </label>
            <input
              type='text'
              name='user_type'
              placeholder='ADMIN or USER'
              className='input input-bordered w-full max-w-sm'
              value={data.user_type}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.user_type}
            </p>
          </div> */}
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>User Type</span>
            </label>
            <div className='flex gap-4'>
              <input
                type='radio'
                name='user_type'
                placeholder='ADMIN'
                className='radio radio-primary'
                id='radioAdmin'
                value='ADMIN'
                onChange={(e) => handleChange(e)}
              />
              <label for='radioAdmin'>ADMIN</label>
              <input
                type='radio'
                name='user_type'
                placeholder='USER'
                className='radio radio-primary'
                id='radioUser'
                value='USER'
                onChange={(e) => handleChange(e)}
                // onClick={() => setData.user_type('USER')}
              />
              <label for='radioUser'>USER</label>
            </div>
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.user_type}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='text'
              name='email'
              placeholder='email'
              className='input input-bordered w-full max-w-sm'
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
              name='Password'
              placeholder='password'
              className='input input-bordered w-full max-w-sm'
              value={data.Password}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.Password}
            </p>
          </div>
          <div className='flex justify-center items-center py-6 mt-2'>
            <button>
              <a className='btn btn-primary px-3 py-1'>Submit</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
