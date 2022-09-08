import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Meta from './Pages/Meta';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Register from './Pages/Register';
import BannerInput from './Pages/BannerInput';
import Kategori from './Pages/Kategori';
import BannerUpdate from './Pages/BannerUpdate';
import User from './Pages/User';
import MetaUpdate from './Pages/MetaUpdate';
import KategoriChild from './Pages/KategoriChild';

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/meta' element={<Meta />} />
        <Route path='/meta/:metaId' element={<MetaUpdate />} />
        <Route path='/banner' element={<BannerInput />} />
        <Route path='/banner/:bannerId' element={<BannerUpdate />} />
        <Route path='/kategori' element={<Kategori />} />
        <Route path='/kategori/child' element={<KategoriChild />} />
        <Route path='/users' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}
