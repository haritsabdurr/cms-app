import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';

const User = () => {
  const urlGet = `http://192.168.17.144:8888/users`;

  const [newData, setNewData] = useState([]);

  const fetchUsers = () => {
    const kueBaru = Cookies.get('token');
    axios
      .get(urlGet, {
        headers: {
          Token: `${kueBaru}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNewData(res.data.user_items);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='px-6 md:px-24 justify-center bg-base-200 pt-12 pb-12'>
      <div className='overflow-x-auto w-full px-6 py-6 max-w-xl md:max-w-5xl mx-auto mt-12'>
        <h1 className='text-center text-xl font-medium my-6'>Data Users</h1>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newData?.map((data, index) => (
              <tr key={data?.user_id}>
                <td>{data?.user_id}</td>
                <td>{data?.first_name}</td>
                <td>{data?.last_name}</td>
                <td>{data?.email}</td>
                <td>{data?.phone}</td>
                <td>{data?.user_type}</td>
                <td>
                  <div className='flex gap-4'>
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

export default User;
