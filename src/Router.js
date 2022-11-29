import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavMenu from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Payment from './pages/Payment/Payment';
import Book from './pages/Book/Book';
import BookA from './pages/Book//BookA';
import KakaoLogin from './pages/Login/KakaoLogin';
import NaverLogin from './pages/Login/NaverLogin';
import UserInfo from './pages/Login/UserInfo';

const Router = () => {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoLogin />} />
        <Route path="/login/naver" element={<NaverLogin />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/BookA" element={<BookA />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
