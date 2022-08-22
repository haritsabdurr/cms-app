import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navigation() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const logoutHandler = () => {
    Cookies.remove('token');
    Cookies.remove('refToken');
    navigate('/');
  };

  useEffect(() => {
    setToken(Cookies.get('token'));
    setToken(Cookies.get('refToken'));
  }, [logoutHandler]);

  return (
    <div className='px-6 md:px-24'>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex='0' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </label>
            <ul
              tabIndex='0'
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li
                onClick={() => {
                  navigate('/');
                }}
              >
                <a>Home</a>
              </li>
              <li
                onClick={() => {
                  navigate('/meta');
                }}
              >
                <a>Meta</a>
              </li>
              <li
                onClick={() => {
                  navigate('/banner');
                }}
              >
                <a>Banner</a>
              </li>
              <li
                onClick={() => {
                  navigate('/kategori');
                }}
              >
                <a>Kategori</a>
              </li>
              <li
                onClick={() => {
                  navigate('/users');
                }}
              >
                <a>User</a>
              </li>
            </ul>
          </div>
          <a className='btn btn-ghost normal-case text-xl'>CMS</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal p-0'>
            <li
              onClick={() => {
                navigate('/');
              }}
            >
              <a>Home</a>
            </li>
            <li
              onClick={() => {
                navigate('/meta');
              }}
            >
              <a>Meta</a>
            </li>
            <li
              onClick={() => {
                navigate('/banner');
              }}
            >
              <a>Banner</a>
            </li>
            <li
              onClick={() => {
                navigate('/kategori');
              }}
            >
              <a>Kategori</a>
            </li>
            <li
              onClick={() => {
                navigate('/users');
              }}
            >
              <a>User</a>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          {token ? (
            <a className='btn btn-warning' onClick={logoutHandler}>
              Logout
            </a>
          ) : (
            <a
              className='btn btn-primary'
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
