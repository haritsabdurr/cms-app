import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDataFromArya, getDataFromArya2 } from '../api/member';

const Register = () => {
  let navigate = useNavigate();
  const url = `http://192.168.17.144:8888/users/signup`;

  const [data, setData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: '',
  });

  //   const initialValues = { fName: '', lName: '', email: '', password: '' };
  //   const [formValues, setFormValues] = useState(initialValues);
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
        fname: data.fname,
        lname: data.lname,
        phone: data.phone,
        email: data.email,
        password: data.password,
      })
      .then((response) => response.json())
      .then((data) => setData(data));

    // e.preventDefault();
    // const response = getDataFromArya()
    //   .then((response) => response.json())
    //   .then((data) => setData(data.fname));
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

    if (!values.fname) {
      errors.fname = 'Field is required!';
    }
    if (!values.lname) {
      errors.lname = 'Field is required!';
    }
    if (!values.phone) {
      errors.phone = 'Field is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'Email is invalid!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 character';
    } else if (values.password.length > 12) {
      errors.password = 'Password cannot be more than 12 character';
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
              name='fname'
              placeholder='first name'
              className='input input-bordered w-full max-w-sm'
              value={data.fname}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.fname}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Last Name</span>
            </label>
            <input
              type='text'
              name='lname'
              placeholder='last name'
              className='input input-bordered w-full max-w-sm'
              value={data.lname}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.lname}</p>
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
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.lname}</p>
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
              name='password'
              placeholder='password'
              className='input input-bordered w-full max-w-sm'
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.password}
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
