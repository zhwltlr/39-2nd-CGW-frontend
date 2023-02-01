import React, { useEffect, useState } from 'react';
import Modal from './component/Modal';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Payment = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(true);

  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    if (localStorage.getItem('paymentSuccess')) {
      setIsOpenModal(true);
    }
  }, []);

  const payClick = () => {
    fetch('http://10.58.52.234:3000/kakaoPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        item_name: 'seat',
        quantity: 2,
        total_amount: 20000,
        tax_free_amount: 1,
      }),
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error('error');
      })
      .then(data => {
        localStorage.setItem('tid', data.tid);
        window.location.href = data.next_redirect_pc_url;
      });
  };

  //결제 페이지에서 요청할 API
  useEffect(() => {
    fetch('/data/reservationData.json')
      .then(res => res.json())
      .then(data => setMovieInfo(data));
  }, []);

  return (
    <PaymentContainer>
      <ButtonBox>
        <Button>ENGLISH</Button>
        <Button>상영시간표</Button>
        <Link to="/Book">
          <Button type="button">예매 다시하기</Button>
        </Link>
      </ButtonBox>
      <CouponContainerBox>
        <CouponContainer>
          <StepBox>step 1.</StepBox>
          <CouponBox>
            <Text>할인쿠폰</Text>
            <img src="images/check.png" alt="check" />{' '}
          </CouponBox>
        </CouponContainer>
        <CouponContainer>
          <StepBox>step 2.</StepBox>
          <CouponBox>
            <Text>관람권/기프티콘</Text>
            <img src="images/check.png" alt="check" />{' '}
          </CouponBox>
        </CouponContainer>
        <CouponContainer>
          <StepBox>step 3.</StepBox>
          <CouponBox>
            <Text>포인트 및 기타결제 수단</Text>{' '}
            <img src="images/check.png" alt="check" />{' '}
          </CouponBox>
        </CouponContainer>
        <CouponContainerEnd>
          <StepBox>step 4. 최종결제수단</StepBox>
          <InfoBox>
            <PaymentInfo>
              <KaKaoPayImg src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcEaPmw%2FbtrcIUODymI%2FEBvA7nx7wVTcdLIrgiVsJK%2Fimg.jpg" />
              <div>
                <PaymentBox>결제하실 금액 :</PaymentBox>
                <PayWonBox>{movieInfo.price}원</PayWonBox>
              </div>
            </PaymentInfo>
            <PayListFirst>
              <PaylistKakao>카카오페이 결제 순서</PaylistKakao>
              <Paylist>1. 하단에 있는 "결제하기" 버튼을 클릭해주세요.</Paylist>
              <Paylist>
                2. 휴대폰으로 스캔하면 결제 화면으로 이동합니다..
              </Paylist>
              <Paylist>3. 결제해주세요.</Paylist>
            </PayListFirst>
          </InfoBox>
        </CouponContainerEnd>
      </CouponContainerBox>
      <PayBotton onClick={payClick}>결제하기</PayBotton>
      {isOpenModal && <Modal openModal={openModal} />}
    </PaymentContainer>
  );
};

export default Payment;

const PaymentContainer = styled.section`
  padding: 0px 200px;
  margin-top: 30px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const Button = styled.button`
  margin-left: 45px;
  width: 180px;
  height: 45px;
  border: 0;
  outline: 0;
  border-radius: 8px;
  font-size: 16px;
  overflow: hidden;
  background-color: #f8f9fa;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px 5px;
`;

const CouponContainerBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px 5px;

  justify-content: space-evenly;
  background-color: #eaeaea;
  border-radius: 3px;
  padding: 5px;
  width: 100%;
`;

const CouponContainer = styled.div`
  margin-bottom: 10px;
`;

const CouponContainerEnd = styled(CouponContainer)`
  margin-bottom: 0px;
`;

const CouponBox = styled.div`
  background-color: #f8f9fa;
  padding: 20px 5px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;

  img {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
  }
`;

const StepBox = styled.p`
  color: #fff;
  background-color: #333333;
  padding: 10px;
  border-radius: 8px;
`;

const PayListFirst = styled.p`
  font-size: 16px;
  padding: 10px;
`;

const PaylistKakao = styled.p`
  font-size: 16px;
  padding: 5px 0px;
  color: #333333;
  margin-bottom: 5px;
`;
const Paylist = styled.p`
  font-size: 14px;
  color: #333333;
  margin-bottom: 7px;
`;

const InfoBox = styled.div`
  display: flex;
  background-color: #f8f9fa;
  padding: 5px;
  align-items: center;
  justify-content: space-around;
  border-radius: 8px;
`;

const PaymentBox = styled.div`
  width: 180px;
  height: 50px;
  font-size: 16px;
  margin-left: 40px;
  background-color: #333333;
  color: #fff;
  padding: 15px;
  border-radius: 3px;
`;

const PayWonBox = styled.div`
  width: 180px;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  margin-left: 40px;
  background-color: #333333;
  color: #fff;
  padding: 13px;
  border-radius: 3px;
  text-align: end;
`;

const PayBotton = styled.button`
  font-size: 25px;
  font-weight: bold;
  color: white;
  background-color: #fb4357;
  margin-left: 5px;
  width: 500px;
  height: 60px;
  border: 0;
  outline: 0;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Text = styled.p`
  height: 20px;
  border-radius: 8px;
`;

const PaymentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const KaKaoPayImg = styled.img`
  width: 110px;
  height: 60px;
  object-fit: cover;
  border-radius: 30px;
  margin-left: 60px;
  cursor: pointer;
  margin-right: 10px;
`;
