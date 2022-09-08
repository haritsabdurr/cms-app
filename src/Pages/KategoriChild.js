import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const KategoriChild = () => {
  const baseUrl = `http://192.168.17.144:8888`;

  const [data, setData] = useState({
    nama_produk: '',
    image_produk: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSumbit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  //POST
  const handleSumbit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSumbit((prev) => !prev);

    const setCookies = Cookies.get('refToken');

    axios
      .post(
        `${baseUrl}/kategori/child`,
        {
          kategori_produk: data.nama_produk,
          image: data.image_produk,
        },
        {
          headers: {
            Token: `${setCookies}`,
          },
        }
      )
      .then(alert('Data berhasil di input!'))
      .then((response) => response.json());
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  //Validate
  const validate = (values) => {
    const errors = {};

    if (!values.nama_produk) {
      errors.nama_produk = 'Field is required!';
    }
    if (!values.image_produk) {
      errors.image_produk = 'Field is required!';
    }

    return errors;
  };
  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 pt-12 pb-24'>
      <div className='mx-auto mt-12 form-control w-full px-6 py-6 max-w-lg bg-base-100 rounded-md shadow-xl'>
        <h1 className='text-center text-2xl font-bold py-2 mb-4'>
          Kategori input
        </h1>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>ID Kategori</span>
            </label>
            <input
              type='text'
              name='nama_produk'
              placeholder='nama produk'
              className='input input-bordered w-full max-w-sm'
              value='02398847777232'
              onChange={(e) => handleChange(e)}
              disabled
            />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Nama Produk</span>
            </label>
            <input
              type='text'
              name='nama_produk'
              placeholder='nama produk'
              className='input input-bordered w-full max-w-sm'
              value={data.nama_produk}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.nama_produk}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Image Produk</span>
            </label>
            <input
              type='text'
              name='image_produk'
              placeholder='gambar produk'
              className='input input-bordered w-full max-w-sm'
              value={data.image_produk}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.image_produk}
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

export default KategoriChild;
