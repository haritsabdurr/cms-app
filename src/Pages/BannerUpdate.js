import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';

const BannerUpdate = (Data) => {
  const navigate = useNavigate();
  const baseUrl = `http://192.168.17.144:8888/auth`;

  const [data, setData] = useState({
    banner: '',
    alt: '',
    link: '',
  });

  const [newData, setNewData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSumbit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // POST
  const handleSumbit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSumbit((prev) => !prev);

    const kue = Cookies.get('token');

    axios
      .put(
        `${baseUrl}/banner/${id}`,
        {
          banner: data.banner,
          alt: data.alt,
          link: data.link,
        },
        {
          headers: {
            Authorization: `Bearer ${kue}`,
          },
        }
      )
      .then(alert('Data berhasil di update!'));
    navigate('/banner')
      .then((response) => response.json())
      .then((data) => {});
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  const { id } = useParams();

  // GET
  const fetchBanner = (data) => {
    const kueBaru = Cookies.get('token');
    axios
      .get(`${baseUrl}/banner/${id}`, {
        headers: {
          Authorization: `Bearer ${kueBaru}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNewData(res.data.Data);
      });
  };

  useEffect(() => {
    fetchBanner();
  }, [isSubmit]);

  useEffect(() => {
    const isLogin = Cookies.get('token');
    if (!isLogin) {
      alert('Anda harus login!');
      navigate('/login');
    }
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.banner) {
      errors.banner = 'Field is required!';
    }
    if (!values.alt) {
      errors.alt = 'Field is required!';
    }
    if (!values.link) {
      errors.link = 'Field is required!';
    }
    return errors;
  };
  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 pt-12 pb-12'>
      <div className='mx-auto mt-12 form-control w-full px-6 py-6 max-w-lg bg-base-100 rounded-md shadow-xl'>
        <h1 className='text-center text-2xl font-bold py-2 mb-4'>
          Banner Update
        </h1>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Banner Name</span>
            </label>
            <input
              type='text'
              name='banner'
              placeholder='banner'
              className='input input-bordered w-full max-w-sm'
              value={Data.banner}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.banner}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Alternative</span>
            </label>
            <input
              type='text'
              name='alt'
              placeholder='alt'
              className='input input-bordered w-full max-w-sm'
              value={data.alt}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.alt}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Link</span>
            </label>
            <input
              type='text'
              name='link'
              placeholder='link'
              className='input input-bordered w-full max-w-sm'
              value={data.link}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.link}</p>
          </div>
          <div className='flex justify-center items-center py-6 mt-2'>
            <button>
              <a className='btn btn-primary px-3 py-1'>Update</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerUpdate;
