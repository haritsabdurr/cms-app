import { useState, useEffect } from 'react';
import Logo from '../logoOCIpng.png';
import User from '../user.svg';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavigationBar = () => {
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
    <div className='bg-slate-800 shadow-md'>
      <div className='px-6 mx-auto'>
        <div className='flex items-center justify-between h-14'>
          {/* Logo */}
          <div>
            <a href='/'>
              <img src={Logo} alt='logo ocistok.com' className='h-8' />
            </a>
          </div>

          {/* Nav Menu */}
          <div className='block'>
            <ul className='flex items-center gap-2 text-sm'>
              <li>
                <a
                  className='text-white px-2 pb-[19px] pt-[14px] hover:bg-white hover:text-black cursor-pointer duration-150'
                  onClick={() => navigate('/')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className='text-white px-2 pb-[19px] pt-[14px] hover:bg-white hover:text-black cursor-pointer duration-150'
                  onClick={() => navigate('/meta')}
                >
                  Meta
                </a>
              </li>
              <li>
                <a
                  className='text-white px-2 pb-[19px] pt-[14px] hover:bg-white hover:text-black cursor-pointer duration-150'
                  onClick={() => navigate('/banner')}
                >
                  Banner
                </a>
              </li>
              <li>
                <a
                  className='text-white px-2 pb-[19px] pt-[14px] hover:bg-white hover:text-black cursor-pointer duration-150'
                  onClick={() => navigate('/kategori')}
                >
                  Kategori
                </a>
              </li>
            </ul>
          </div>

          {/* Profile */}
          {token ? (
            <Tooltip
              title={
                <div className='flex'>
                  <Button
                    variant='contained'
                    size='small'
                    color='error'
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </div>
              }
              arrow
            >
              <div>
                <div className='flex justify-center items-center cursor-pointer'>
                  <div>
                    <span className='text-white text-sm'>Admin</span>
                  </div>
                  <div className='ml-3'>
                    <button
                      type='button'
                      className='bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    >
                      <img className='h-7 w-7' src={User} alt='user' />
                    </button>
                  </div>
                </div>
              </div>
            </Tooltip>
          ) : (
            <div>
              <Button
                variant='contained'
                size='small'
                color='secondary'
                onClick={() => {
                  navigate('/login');
                }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
