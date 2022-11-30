import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <FooterWrap>
      <FooterInner>
        <CompanyInfo>
          <CompanyTitle>주식회사 CGW</CompanyTitle>
          <CompanyContent>
            <div>
              <CompanyList>고객센터: 0404-1010235</CompanyList>
              <CompanyList>주말, 공휴일 연중무휴</CompanyList>
            </div>
            <LinkArea>
              <LinkAreaList>
                <Link to="/login">로그인</Link>
              </LinkAreaList>
              <LinkAreaList>
                <Link to="/order">예매내역</Link>
              </LinkAreaList>
              <LinkAreaList>
                <Link to="/">영화</Link>
              </LinkAreaList>
            </LinkArea>
          </CompanyContent>
        </CompanyInfo>
        <InfoArea>
          <ul>
            <InfoAreaList>주소 : 서울특별시 내 마음 속</InfoAreaList>
            <InfoAreaList>정보보호 : wecode</InfoAreaList>
            <InfoAreaList>대표 전화 : 1052-1350</InfoAreaList>
            <InfoAreaList>이메일 : info@cgwkorea.com</InfoAreaList>
          </ul>
          <ul>
            <InfoAreaListT>Developer</InfoAreaListT>
            <InfoAreaList>FE : 곽종범 박지영 이다빈 이혜원</InfoAreaList>
            <InfoAreaList>BE : 김한솔 임창현 조상원</InfoAreaList>
          </ul>
        </InfoArea>
        <SubText>
          CGW에서는 언제든지 고객님의 편의를 최우선으로 생각합니다
        </SubText>
        <SubText>
          고객님의 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한
          NICE구매안전 (에스크로) 서비스를 이용하실 수 있습니다.
        </SubText>
      </FooterInner>
      <BtnTop onClick={scrollTop}>
        <BtnTopText>TOP</BtnTopText>
      </BtnTop>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  padding: 50px 0 80px;
  border-top: 1px solid #ccc;
  background: #eee;
`;

const FooterInner = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

const CompanyInfo = styled.div`
  width: 650px;
`;

const CompanyTitle = styled.div`
  color: #fb4357;
  font-size: 36px;
  font-weight: bold;
`;

const CompanyContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CompanyList = styled.p`
  font-size: 16px;
  margin-top: 8px;

  & ~ li {
    margin-top: 5px;
  }
`;

const LinkArea = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const LinkAreaList = styled.li`
  width: 85px;
  height: 30px;
  margin-left: 15px;
  background-color: #fb4357;
  border-radius: 12px;
  line-height: 31px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #fff;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const InfoArea = styled.div`
  margin: 24px 0;
`;

const InfoAreaList = styled.li`
  display: inline-block;
  font-size: 14px;
  line-height: 24px;

  & + li {
    margin-left: 15px;
  }
`;

const InfoAreaListT = styled(InfoAreaList)`
  font-weight: 500;
`;

const SubText = styled.p`
  margin-top: 7px;
  color: #999;
  font-size: 12px;
`;

const BtnTop = styled.button`
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 60px;
  height: 60px;
  font-size: 0;
  border-radius: 50%;
  background: #fb4357;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  z-index: 300;
`;

const BtnTopText = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  animation: updown 0.8s infinite ease-in;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 18px;
    background: #fff;
    transform: translate(-50%, -50%);
  }
  &:after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    width: 10px;
    height: 10px;
    border-top: 3px solid #fff;
    border-right: 3px solid #fff;
    transform: rotate(-45deg) translateX(calc(-50% - 2px));
  }
`;
export default Footer;
