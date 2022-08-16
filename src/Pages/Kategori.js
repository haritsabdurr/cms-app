import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const Kategori = () => {
  const url = `http://192.168.17.144:8888/kategori`;
  const urlGet = `http://192.168.17.144:8888/kategoris`;
  const [data, setData] = useState({
    kode_produk: null,
    kategori_produk: '',
    nama_produk: '',
    banner: '',
    link_banner: '',
    qty: '',
    harga_jual: '',
    harga_beli: '',
  });

  //   const initialValues = { fName: '', lName: '', email: '', password: '' };
  //   const [formValues, setFormValues] = useState(initialValues);
  const [newData, setNewData] = useState([]);
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

    const kue = Cookies.get('refToken');

    axios
      .post(
        url,
        {
          kode_produk: data.kode_produk,
          kategori_produk: data.kategori_produk,
          nama_produk: data.nama_produk,
          banner: data.banner,
          link_banner: data.link_banner,
          qty: data.qty,
          harga_jual: data.harga_jual,
          harga_beli: data.harga_beli,
        },
        {
          headers: {
            Token: `${kue}`,
          },
        }
      )
      .then(alert('Data berhasil di input!'))
      .then((response) => response.json())
      .then((data) => {});
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  //GET
  const fetchKategori = () => {
    const kueBaru = Cookies.get('refToken');
    axios
      .get(urlGet, {
        headers: {
          Token: `${kueBaru}`,
        },
      })
      .then((res) => {
        console.log(res.data.Data);
        setNewData(res.data.Data);
      });
  };

  useEffect(() => {
    fetchKategori();
  }, [isSubmit]);

  //Validate
  const validate = (values) => {
    const errors = {};

    if (!values.kode_produk) {
      errors.kode_produk = 'Field is required!';
    } else if (values.kode_produk.type !== Number) {
      errors.kode_produk = 'Invalid input! Must number';
    }
    if (!values.kategori_produk) {
      errors.kategori_produk = 'Field is required!';
    }
    if (!values.nama_produk) {
      errors.nama_produk = 'Field is required!';
    }
    if (!values.banner) {
      errors.banner = 'Field is required!';
    }
    if (!values.link_banner) {
      errors.link_banner = 'Field is required!';
    }
    if (!values.qty) {
      errors.qty = 'Field is required!';
    }
    if (!values.harga_jual) {
      errors.harga_jual = 'Field is required!';
    }
    if (!values.harga_beli) {
      errors.harga_beli = 'Field is required!';
    }
    return errors;
  };
  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 pt-12 pb-12'>
      <div className='mx-auto mt-12 form-control w-full px-6 py-6 max-w-lg bg-base-100 rounded-md shadow-xl'>
        <h1 className='text-center text-2xl font-bold py-2 mb-4'>
          Kategori input
        </h1>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Kode Produk</span>
            </label>
            <input
              type='text'
              name='kode_produk'
              placeholder='kode produk'
              className='input input-bordered w-full max-w-sm'
              value={data.kode_produk}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.kode_produk}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Kategori Produk</span>
            </label>
            <input
              type='text'
              name='kategori_produk'
              placeholder='kategori'
              className='input input-bordered w-full max-w-sm'
              value={data.kategori_produk}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.kategori_produk}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Nama Produk</span>
            </label>
            <input
              type='text'
              name='nama_produk'
              placeholder='name'
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
              <span className='label-text'>Banner</span>
            </label>
            <input
              type='text'
              name='banner'
              placeholder='banner'
              className='input input-bordered w-full max-w-sm'
              value={data.banner}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.banner}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Link Banner</span>
            </label>
            <input
              type='text'
              name='link_banner'
              placeholder='link banner'
              className='input input-bordered w-full max-w-sm'
              value={data.link_banner}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.link_banner}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Quantity</span>
            </label>
            <input
              type='text'
              name='qty'
              placeholder='quantity'
              className='input input-bordered w-full max-w-sm'
              value={data.qty}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>{formErrors.qty}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Harga Jual</span>
            </label>
            <input
              type='text'
              name='harga_jual'
              placeholder='selling price'
              className='input input-bordered w-full max-w-sm'
              value={data.harga_jual}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.harga_jual}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <label className='label'>
              <span className='label-text'>Harga Beli</span>
            </label>
            <input
              type='text'
              name='harga_beli'
              placeholder='buy price'
              className='input input-bordered w-full max-w-sm'
              value={data.harga_beli}
              onChange={(e) => handleChange(e)}
            />
            <p className='text-xs text-red-500 ml-3 mt-1'>
              {formErrors.harga_beli}
            </p>
          </div>
          <div className='flex justify-center items-center py-6 mt-2'>
            <button>
              <a className='btn btn-primary px-3 py-1'>Submit</a>
            </button>
          </div>
        </form>
      </div>
      <div className='overflow-x-auto w-full px-6 py-6 max-w-xl md:max-w-5xl mx-auto mt-12'>
        <h1 className='text-center text-xl font-medium my-6'>Data Banner</h1>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kode Produk</th>
              <th>Kategori Produk</th>
              <th>Nama Produk</th>
              <th>Banner</th>
              <th>Link Banner</th>
              <th>Qty</th>
              <th>Harga Jual</th>
              <th>Harga Beli</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newData?.map((Data, index) => (
              <tr key={Data?.id}>
                <td>{Data?.id}</td>
                <td>{Data?.kode_produk}</td>
                <td>{Data?.kategori_produk}</td>
                <td>{Data?.nama_produk}</td>
                <td>{Data?.banner}</td>
                <td>{Data?.link_banner}</td>
                <td>{Data?.qty}</td>
                <td>{Data?.harga_jual}</td>
                <td>{Data?.harga_beli}</td>
                <td>
                  <div className='flex gap-4'>
                    <Link to={`/banner/${Data.id}`} state={{ data: Data }}>
                      <Tooltip title='Edit' arrow>
                        <div className='cursor-pointer hover:text-sky-400'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                            <path
                              fillRule='evenodd'
                              d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                      </Tooltip>
                    </Link>
                    <Tooltip title='Delete' arrow>
                      <div className='cursor-pointer hover:text-red-400'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kategori;
