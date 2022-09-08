import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const MetaUpdate = () => {
  const navigate = useNavigate();
  const baseUrl = `http://192.168.17.144:8888`;

  // state
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSumbit] = useState(false);

  const metaID = useParams();

  // UPDATE
  const handleSumbit = (e) => {
    e.preventDefault();
    setFormErrors(validate(title, url, description));
    setIsSumbit((prev) => !prev);

    const setCookies = Cookies.get('refToken');

    axios.put(
      `${baseUrl}/meta/${metaID.metaId}`,
      {
        meta_title: title,
        meta_url: url,
        meta_descrption: description,
      },
      {
        headers: {
          Token: `${setCookies}`,
        },
      }
    );
    alert('Data berhasil di update!');
    navigate(`/meta`);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(title, url, description);
    }
  }, [formErrors]);

  // GET
  const fetchMeta = async () => {
    const setCookies = Cookies.get('refToken');
    const response = await axios.get(`${baseUrl}/meta/${metaID.metaId}`, {
      headers: {
        Token: `${setCookies}`,
      },
    });
    console.log(response.data.Data);
    setTitle(response.data.Data.meta_title);
    setUrl(response.data.Data.meta_url);
    setDescription(response.data.Data.meta_descrption);
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  //Validate
  const validate = (values) => {
    const errors = {};

    if (title.length === 0) {
      errors.title = 'Field is required!';
    }
    if (url.length === 0) {
      errors.url = 'Field is required!';
    }
    if (description.length === 0) {
      errors.description = 'Field is required!';
    }
    return errors;
  };

  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 pt-12 pb-12'>
      <div className='mx-auto mt-12 form-control w-full px-6 py-6 max-w-lg bg-base-100 rounded-md shadow-xl'>
        <h1 className='text-center text-2xl font-bold py-2 mb-4'>
          Meta Update
        </h1>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Title</span>
            </label>
            <input
              type='text'
              name='meta_title'
              placeholder='title'
              className='input input-bordered w-full max-w-sm'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.title}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Tag URL</span>
            </label>
            <input
              type='text'
              name='meta_url'
              placeholder='url'
              className='input input-bordered w-full max-w-sm'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.url}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Description</span>
            </label>
            <input
              type='text'
              name='meta_descrption'
              placeholder='description'
              className='input input-bordered w-full max-w-sm'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.descrption}
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

export default MetaUpdate;
