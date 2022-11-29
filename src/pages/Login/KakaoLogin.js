import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const navigate = useNavigate();

  // 백과 통신
  fetch('http://10.58.52.182:3000/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ KAKAO_CODE: `${KAKAO_CODE}` }),
  })
    .then(response => response.json())
    .then(data => {
      if (data) {
        if (data.flag) {
          localStorage.setItem('token', data.jwtToken);
          localStorage.setItem('kakaoId', data.info.social_id);
          localStorage.setItem('kakaoEmail', data.info.email);
          navigate('/userinfo');
        } else {
          alert('반갑습니다!');
          navigate('/');
        }
      } else {
        alert('로그인 실패');
      }
    });

  return <p>hi</p>;
};

export default KakaoLogin;
