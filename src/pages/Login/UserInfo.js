import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserInfo = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: '',
    birth: '',
    phone: 0,
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue(prev => ({ ...prev, [name]: value }));
  };
  const access_token = localStorage.getItem('token');
  const kakaoId = localStorage.getItem('kakaoId');
  const kakaoEmail = localStorage.getItem('kakaoEmail');

  const clickBtn = () => {
    fetch('http://10.58.52.182:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        accessToken: access_token,
      },
      body: JSON.stringify({
        name: inputValue.name,
        date: inputValue.birth,
        phone: inputValue.phone,
        kakaoId: kakaoId,
      }),
    })
      .then(response => response.json())
      .then(() => {
        const { name, birth, phone } = inputValue;
        if (name && birth && phone) {
          navigate('/');
        } else {
          alert('정보를 입력해주세요');
        }
      });
  };

  return (
    <UserWrap>
      <UserInput>
        <InfoInner>
          <UserTitle margin="10px">{kakaoEmail}님</UserTitle>
          <UserTitle margin="30px">정보를 입력해주세요</UserTitle>
          <UserValue
            type="text"
            name="name"
            placeholder="이름"
            onChange={handleInput}
          />
          <UserValue type="date" name="birth" onChange={handleInput} />
          <UserValue
            type="number"
            name="phone"
            placeholder="전화번호"
            onChange={handleInput}
          />
          <UserBtn onClick={clickBtn}>완료</UserBtn>
        </InfoInner>
      </UserInput>
      <UserImgWrap>
        <UserImg src="images/popcornbig.png" />
      </UserImgWrap>
    </UserWrap>
  );
};

const UserWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
`;

const UserTitle = styled.div`
  margin-bottom: ${props => props.margin};
  font-size: 20px;
  font-weight: 500;
  background-color: #fff;
  text-align: center;
`;

const UserInput = styled.div`
  width: 450px;
  margin-top: -50px;
  background-color: #fff;
  transform: translateX(10%);
  z-index: 5;
`;

const InfoInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  border: 3px solid #d4b595;
  border-radius: 10px;
`;

const UserValue = styled.input`
  width: 75%;
  height: 45px;
  margin: 0 auto;
  margin-bottom: 25px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #d4b595;
  border-radius: 10px;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const UserBtn = styled.button`
  width: 100px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: #fb4357;

  &: hover {
    opacity: 0.7;
  }
`;

const UserImg = styled.img`
  width: 500px;
  height: auto;
`;

const UserImgWrap = styled.div`
  position: relative;
  transform: translateX(-10%);
`;

export default UserInfo;
