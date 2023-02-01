import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BookB = ({ setShowSeat }) => {
  const [numAdult, setNumAdult] = useState(0);
  const [numTeenager, setNumTeenager] = useState(0);
  const [select, setSelect] = useState([]);
  const [reserved, setReserved] = useState();
  const totalPrice = 14000 * numAdult + 11000 * numTeenager;
  const totalNum = numAdult + numTeenager;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/reservedSeat.json')
      .then(res => res.json())
      .then(data => {
        setReserved(data);
      });
  }, []);

  const btnAdultMinus = () => {
    if (numAdult) {
      setNumAdult(prev => prev - 1);
    }
  };

  if (select.length > totalNum) {
    alert('좌석을 다시 선택해주세요.');
    setSelect([]);
  }

  const btnAdultPlus = () => {
    if (numAdult + numTeenager > 7) {
      alert('최대 8명까지 선택 가능합니다.');
    } else {
      setNumAdult(prev => prev + 1);
    }
  };

  const btnTeenagerMinus = () => {
    if (numTeenager) {
      setNumTeenager(prev => prev - 1);
    }
  };

  const btnTeenagerPlus = () => {
    if (numAdult + numTeenager > 7) {
      alert('최대 8명까지 선택 가능합니다.');
    } else {
      setNumTeenager(prev => prev + 1);
    }
  };

  const paymentCheck = () => {
    fetch('http://10.58.52.204:3000/movieOptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: accessToken,
      },
      body: JSON.stringify({
        movieOption_id: reserved.movieOption_id,
        seat_id: select,
        // seatid: select,
        // adult: numAdult,
        // teenager: numTeenager,
      }),
    })
      .then(response => response.json())
      .then(() => {
        if (select.length !== totalNum) {
          alert('인원에 맞게 선택해주세요.');
        } else if (select.length == 0) {
          alert('인원과 좌석을 선택해주세요.');
        } else {
          navigate('/Payment');
        }
      });
  };

  const selectCheck = (e, el) => {
    let { checked } = e.target;
    if (checked) {
      setSelect([...select, el.id]);
      if (totalNum === 0) {
        alert('인원을 선택해주세요.');
        setSelect(select);
        checked = false;
      } else if (select.length >= totalNum) {
        setSelect(select);
        checked = false;
        alert('이미 좌석을 모두 선택하였습니다.');
      }
    } else {
      setSelect(select.filter(sel => sel != el.id));
    }
  };

  console.log(select);

  return (
    <ModalWrap>
      <ModalContents>
        <ModalTit>인원/좌석 선택</ModalTit>
        <ModalInfo>
          <PersonInfo>
            일반
            <PersonBox>
              <PersonBtnMinus onClick={btnAdultMinus} />
              <PersonNumber>{numAdult}</PersonNumber>
              <PersonBtnPlus onClick={btnAdultPlus} />
            </PersonBox>
          </PersonInfo>
          <PersonInfo>
            청소년
            <PersonBox>
              <PersonBtnMinus onClick={btnTeenagerMinus} />
              <PersonNumber>{numTeenager}</PersonNumber>
              <PersonBtnPlus onClick={btnTeenagerPlus} />
            </PersonBox>
          </PersonInfo>
        </ModalInfo>
        <CinemaArea>
          <CinemaSeat>
            <CinemaScreen>SCREEN</CinemaScreen>
            <CinemaSeatList>
              {reserved &&
                reserved.seat.map(el => {
                  if (reserved.reserved_seat_id.includes(el.id)) {
                    return (
                      <CinemaCheckbox key={el.id}>
                        <CinemaCheckboxInput
                          id={el.name}
                          type="checkbox"
                          onChange={e => {
                            selectCheck(e, el);
                          }}
                          checked={select.includes(el.id) ? true : false}
                          disabled={true}
                        />
                        <CinemaCheckboxLabel htmlFor={el.name}>
                          {el.name}
                        </CinemaCheckboxLabel>
                      </CinemaCheckbox>
                    );
                  } else {
                    return (
                      <CinemaCheckbox key={el.id}>
                        <CinemaCheckboxInput
                          id={el.name}
                          type="checkbox"
                          onChange={e => {
                            selectCheck(e, el);
                          }}
                          checked={select.includes(el.id) ? true : false}
                          disabled={false}
                        />
                        <CinemaCheckboxLabel htmlFor={el.name}>
                          {el.name}
                        </CinemaCheckboxLabel>
                      </CinemaCheckbox>
                    );
                  }
                })}
            </CinemaSeatList>
          </CinemaSeat>
          <CinemaInfoArea>
            <CinemaTop>
              <CinemaImg src="/images/siba.jpg" alt="샘플" />
              <CinemaTit>아기 시바의 기묘한 모험</CinemaTit>
            </CinemaTop>
            <CinemaInfoList>
              <CinemaInfoElement>
                <CinemaPriceTit>일반</CinemaPriceTit>
                <CinemaPrice>14,000</CinemaPrice>x
                <CinemaPriceNum>{numAdult}</CinemaPriceNum>
              </CinemaInfoElement>
              <CinemaInfoElement>
                <CinemaPriceTit>청소년</CinemaPriceTit>
                <CinemaPrice>11,000</CinemaPrice>x
                <CinemaPriceNum>{numTeenager}</CinemaPriceNum>
              </CinemaInfoElement>
              <CinemaInfoElement>
                <CinemaPriceTit>총금액</CinemaPriceTit>
                <CinemaTotalPrice>
                  {totalPrice.toLocaleString()}원
                </CinemaTotalPrice>
              </CinemaInfoElement>
            </CinemaInfoList>
            <CinemaBtn onClick={paymentCheck}>결제</CinemaBtn>
          </CinemaInfoArea>
        </CinemaArea>
        <ModalCloseBtn onClick={() => setShowSeat(false)}>
          팝업 닫기
        </ModalCloseBtn>
      </ModalContents>
      <ModalDim />
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ModalContents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const ModalDim = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 40px;
  height: 40px;
  text-indent: -9999px;
  border: 0;
  background: none;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    top: 6px;
    left: calc(50% - 1px);
    width: 2px;
    height: 70%;
    background: #fff;
    transform: rotate(45deg);
  }
  &:after {
    content: '';
    position: absolute;
    top: 6px;
    left: calc(50% - 1px);
    width: 2px;
    height: 70%;
    background: #fff;
    transform: rotate(-45deg);
  }
`;

const ModalInfo = styled.div`
  display: flex;
  padding: 25px;
`;

const PersonInfo = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  font-size: 14px;
`;

const PersonBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  width: 110px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PersonBtnMinus = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border: 0;
  background: 0;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    left: 50%;
    margin-left: -7px;
    width: 14px;
    height: 2px;
    background: #000;
  }
`;
const PersonBtnPlus = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border: 0;
  background: 0;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    left: 50%;
    margin-left: -7px;
    width: 14px;
    height: 2px;
    background: #000;
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(50% - 1px);
    margin-top: -7px;
    width: 2px;
    height: 14px;
    background: #000;
  }
`;
const PersonNumber = styled.div`
  font-size: 16px;
`;

const ModalTit = styled.h2`
  padding: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background: #fb4357;
`;

const CinemaArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
  height: 400px;
`;

const CinemaSeat = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  padding: 60px 140px 0;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 8px;
  background: #333;
`;

const CinemaScreen = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 90%;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  background: #eee;
  transform: translateX(-50%);
`;
const CinemaSeatList = styled.div``;

const CinemaCheckbox = styled.span`
  position: relative;
  display: inline-block;
  margin: 4px 2px;
`;

const CinemaCheckboxLabel = styled.label`
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #222;
  font-size: 14px;
  text-align: center;
  background: #ddd;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #fb4357;
  }
`;

const CinemaCheckboxInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  white-space: nowrap;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  &:checked + ${CinemaCheckboxLabel} {
    color: #fff;
    background: #fb4357;
  }
  &:disabled + ${CinemaCheckboxLabel} {
    text-indent: -9999px;
    background: #666;
    cursor: not-allowed;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 18px;
      background: #fff;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 18px;
      background: #fff;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const CinemaInfoArea = styled.div`
  position: relative;
  padding: 0 25px;
  width: 220px;
  min-width: 220px;
`;

const CinemaTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CinemaImg = styled.img`
  width: 50px;
  height: 60px;
  object-fit: cover;
`;

const CinemaTit = styled.h4`
  margin-left: 10px;
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
`;

const CinemaInfoList = styled.ul``;

const CinemaInfoElement = styled.li`
  line-height: 40px;
  font-size: 14px;
  text-align: right;
  border-bottom: 1px solid #ddd;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  &:last-child {
    border: none;
  }
`;

const CinemaPriceTit = styled.span`
  float: left;
  color: #999;
`;

const CinemaPrice = styled.span`
  margin-right: 3px;
`;

const CinemaPriceNum = styled.span`
  margin-left: 3px;
`;

const CinemaTotalPrice = styled.strong`
  color: #fb4357;
  font-size: 16px;
`;

const CinemaBtn = styled.button`
  position: absolute;
  left: 25px;
  bottom: 0;
  width: calc(100% - 50px);
  height: 50px;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  background-color: #fb4357;
  cursor: pointer;
`;

export default BookB;
