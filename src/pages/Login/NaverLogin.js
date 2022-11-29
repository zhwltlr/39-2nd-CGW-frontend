import React, { useEffect } from 'react';

const NaverLogin = () => {
  const { naver } = window;

  const Naver = () => {
    const naver_id_login = new naver_id_login(
      'F_MF6xBwSlY5ZeozWRfJ',
      'http://localhost:3000/login/naver'
    );
    const state = naver_id_login.getUniqState();
    naver_id_login.setButton('white', 2, 40);
    naver_id_login.setState(state);
    naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
  };

  const UserProfile = () => {
    window.location.href.includes('access_token') && GetUser();
    function GetUser() {
      const location = window.location.href.split('=')[1];
      const token = location.split('&')[0];
      fetch(`http/account/sign-in`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('token', data.token);
        });
    }
  };

  // useEffect(() => {
  Naver();
  UserProfile();
  // }, []);

  return <p>hi</p>;
};

export default NaverLogin;
