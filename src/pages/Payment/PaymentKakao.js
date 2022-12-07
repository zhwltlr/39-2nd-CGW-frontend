git import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentKakao = () => {
  // approval url
  const location = useLocation();
  const CODE = location.search.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!CODE) return;

    fetch('http://10.58.52.234:3000/kakaoPayment/approval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        pgToken: CODE,
        userId: 1,
        totalPrice: 20000,
        tid: localStorage.getItem('tid'),
        movieOptionsSeatId: [1, 2, 3],
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'PAYMENT_SUCCESS') {
          localStorage.setItem('paymentSuccess', 'true');
          localStorage.removeItem('tid');
          navigate('/Payment');
        }
      });
  }, [CODE]);

console.log('hello')

  // const paySuccess = () => {
  //   fetch('http://10.58.52.234:3000/kakaoPayment/approval', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({
  //       pgToken: CODE,
  //       userId: 1,
  //       totalPrice: 20000,
  //       tid: localStorage.getItem('tid'),
  //       movieOptionsSeatId: [1, 2, 3],
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.message === 'PAYMENT_SUCCESS') {
  //         localStorage.setItem('paymentSuccess', 'true');
  //         localStorage.removeItem('tid');
  //         navigate('/Payment');
  //       }
  //     });
  // };

  return <button>결제완료하기</button>;
};

export default PaymentKakao;