import React, { useState } from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './KakaoOauth';
import { NAVER_CALLBACK_URL } from './NaverOauth';

const Login = () => {
  const [inputValue, setInputValue] = useState({ id: '', pw: '' });

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue(prev => ({ ...prev, [name]: value }));
  };

  return (
    <LoginBg>
      <LoginImg>
        <LoginInner>
          <LoginLogo>
            <Logo />
            <LogoTitle>
              CULTUREPLEX
              <TitleRed>CGW</TitleRed>
            </LogoTitle>
          </LoginLogo>
          <LoginForm>
            <LoginInput placeholder="아이디" onChange={handleInput} name="id" />
            <LoginInput
              placeholder="비밀번호"
              onChange={handleInput}
              name="pw"
            />
            <LoginBtn>로그인</LoginBtn>
            <LoginOr>또는</LoginOr>
            <SocialLogin>
              <SocialBtn href={`${KAKAO_AUTH_URL}`}>
                <SocialBtnImg width="100%" src="images/kakao.png" />
              </SocialBtn>
              <SocialBtn href={`${NAVER_CALLBACK_URL}`}>
                <SocialBtnImg width="100%" src="images/naver.png" />
              </SocialBtn>
            </SocialLogin>
          </LoginForm>
        </LoginInner>
      </LoginImg>
    </LoginBg>
  );
};

const LoginBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 1200px;
  height: 100vh;
`;

const LoginImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 100%;
  background: url(images/ticket1280.png) no-repeat center/contain;
`;

const LoginInner = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  width: 1025px;
  height: 433px;
  border: 3px solid #333;
  border-radius: 20px;
  background-color: #fff;
  transform: translate(-2px, 2px);
`;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 100%;
  border-radius: 15px;
`;

const Logo = styled.div`
  width: 200px;
  height: 150px;
  margin: 0 auto;
  background: url(images/popcorn.png) no-repeat center/contain;
`;

const LogoTitle = styled.div`
  margin-top: 15px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

const TitleRed = styled.div`
  margin-top: 5px;
  color: #fb4357;
  font-size: 40px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 330px;
  border-radius: 15px;
`;

const LoginInput = styled.input`
  width: 80%;
  height: 45px;
  margin-bottom: 20px;
  padding-left: 10px;
  outline: none;
  border-radius: 10px;
  border: 1px solid #d4b595;
`;

const LoginBtn = styled.button`
  width: 80%;
  height: 40px;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: #fb4357;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 80%;
  height: 50px;
`;

const SocialBtn = styled.a`
  width: 49%;
  height: 40px;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &: hover {
    opacity: 0.7;
  }
`;

const SocialBtnImg = styled.img`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
`;

const LoginOr = styled.p`
  margin-top: 20px;
  color: #bbb;
  font-size: 14px;
`;

export default Login;
