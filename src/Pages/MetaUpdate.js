import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const MetaUpdate = (Data) => {
  const navigate = useNavigate();
  const baseUrl = `http://192.168.17.144:8888`;

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  // const [data, setData] = useState({
  //   meta_title: '',
  //   meta_url: '',
  //   meta_descrption: '',
  // });
  const [newData, getNewData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSumbit] = useState(false);

  const { id } = useParams();

  const handleSumbit = (e) => {
    e.preventDefault();
    // setFormErrors(validate(title, url, description));
    setIsSumbit((prev) => !prev);

    const setCookies = Cookies.get('refToken');

    axios.put(
      `${baseUrl}/meta/${id.metaId}`,
      {
        title,
        url,
        description,
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

  const metaID = useParams();

  // GET
  const fetchMeta = async () => {
    const setCookies = Cookies.get('refToken');
    const response = await axios.get(`${baseUrl}/meta/${metaID.metaId}`, {
      headers: {
        Token: `${setCookies}`,
      },
    });
    console.log(response.data.Data);
    getNewData(response.data.Data);
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  //Validate
  const validate = (values) => {
    const errors = {};

    if (!values.meta_title) {
      errors.meta_title = 'Field is required!';
    }
    if (!values.meta_url) {
      errors.meta_url = 'Field is required!';
    }
    if (!values.meta_descrption) {
      errors.meta_descrption = 'Field is required!';
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
              value={Data.meta_title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.meta_title}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Tag URL</span>
            </label>
            <input
              type='text'
              name='meta_url'
              className='input input-bordered w-full max-w-sm'
              value={Data.met_url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.meta_url}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Description</span>
            </label>
            <input
              type='text'
              name='meta_descrption'
              placeholder={newData.meta_descrption}
              className='input input-bordered w-full max-w-sm'
              value={newData.meta_descrption}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.meta_descrption}
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
