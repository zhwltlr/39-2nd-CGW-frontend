import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BookB = ({ setShowSeat }) => {
  const [seatList, setSeatList] = useState([]);

  useEffect(() => {
    fetch('/data/seat.json')
      .then(res => res.json())
      .then(data => {
        setSeatList(data);
      });
  }, []);

  return (
    <ModalWrap>
      <ModalContents>
        <ModalTit>인원/좌석 선택</ModalTit>
        <ModalInfo>
          <PersonInfo>
            일반
            <PersonBox>
              <PersonBtnMinus />
              <PersonNumber>0</PersonNumber>
              <PersonBtnPlus />
            </PersonBox>
          </PersonInfo>
          <PersonInfo>
            청소년
            <PersonBox>
              <PersonBtnMinus />
              <PersonNumber>0</PersonNumber>
              <PersonBtnPlus />
            </PersonBox>
          </PersonInfo>
        </ModalInfo>
        <CinemaArea>
          <CinemaSeat>
            <CinemaScreen>SCREEN</CinemaScreen>
            <CinemaSeatList>
              {seatList.map(el => {
                return (
                  <CinemaCheckbox key={el.id}>
                    <CinemaCheckboxInput id={el.number} type="checkbox" />
                    <CinemaCheckboxLabel htmlFor={el.number}>
                      {el.number}
                    </CinemaCheckboxLabel>
                  </CinemaCheckbox>
                );
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
                <CinemaPriceNum>0</CinemaPriceNum>
              </CinemaInfoElement>
              <CinemaInfoElement>
                <CinemaPriceTit>청소년</CinemaPriceTit>
                <CinemaPrice>11,000</CinemaPrice>x
                <CinemaPriceNum>0</CinemaPriceNum>
              </CinemaInfoElement>
              <CinemaInfoElement>
                <CinemaPriceTit>총금액</CinemaPriceTit>
                <CinemaTotalPrice>0</CinemaTotalPrice>
              </CinemaInfoElement>
            </CinemaInfoList>
            <CinemaBtn>결제</CinemaBtn>
          </CinemaInfoArea>
        </CinemaArea>
        <ModalCloseBtn onClick={() => setShowSeat(false)} />
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
  min-width: 800px;
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
