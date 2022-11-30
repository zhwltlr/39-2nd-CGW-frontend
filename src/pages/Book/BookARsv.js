import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const BookARsv = () => {
  const [value, setValue] = useState(new Date());

  const changeDate = e => {
    setValue(e);
  };

  return (
    <>
      <ReservationContainer>
        <PlaceSelect>
          <StepTitle>STEP1</StepTitle>
          <Place>지역/영화관 선택</Place>
          <PlacePick>
            <PlacePickTextSeoul>
              <PlaceTextBox>
                <PlacePickP>서울</PlacePickP>
              </PlaceTextBox>
              <PlacePickButtonContainer>
                <PlaceButtonGn>강남점</PlaceButtonGn>
                <PlaceButtonSr>선릉점</PlaceButtonSr>
              </PlacePickButtonContainer>
            </PlacePickTextSeoul>
          </PlacePick>
        </PlaceSelect>
        <CalendarContainer>
          <PlaceText>
            <StepTitle>STEP2</StepTitle>
            <SelectDate>날짜 선택</SelectDate>
          </PlaceText>
          <Calendar className="calendar" onChange={changeDate} value={value} />
        </CalendarContainer>
        <SelectTime>
          <StepTitle>STEP3</StepTitle>
          <Time>시간 선택</Time>
          <TimePickContainer>
            <TimePick>
              <TimeButton>🌞 10:10 AM</TimeButton>
              <TimeButton>🌕 19:45 PM</TimeButton>
            </TimePick>
          </TimePickContainer>
        </SelectTime>
      </ReservationContainer>
      <ButtonBox>
        <SeatButton>좌석 선택</SeatButton>
      </ButtonBox>
    </>
  );
};

const ReservationContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  height: 350px;
  margin-top: 60px;
  border: 1px solid #ecedf2;
  border-radius: 10px;
  -webkit-box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  overflow: hidden;
`;

const PlaceSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: inherit;
  border-right: 1px solid #ecedf2;
  padding: 30px 50px;
  overflow: scroll;
`;

const StepTitle = styled.div`
  font-size: 20px;
  color: #fb4357;
`;

const Place = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 35px;
`;

const PlacePick = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
`;

const PlacePickTextSeoul = styled.div`
  display: inline-flex;
  margin-top: 30px;
  padding-top: 30px;
  width: 260px;
  border-top: 1px solid #ecedf2;
`;

const PlaceTextBox = styled.div`
  width: 100px;
`;

const PlacePickP = styled.p`
  padding-top: 5px;
  font-size: 20px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
    cursor: default;
  }
`;

const PlacePickButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
`;

const PlaceButtonSr = styled.button`
  appearance: unset;
  border: none;
  margin-bottom: 6px;
  padding: 5px;
  height: 50px;
  width: 200px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #ecedf2;
  color: black;

  &:hover {
    background-color: #fb4357;
    color: white;
  }
`;

const PlaceButtonGn = styled.button`
  appearance: unset;
  border: none;
  margin-bottom: 6px;
  padding: 5px;
  height: 50px;
  width: 200px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #ecedf2;
  color: black;

  &:hover {
    background-color: #fb4357;
    color: white;
  }
`;

const PlaceText = styled.div`
  padding: 30px 30px;
  width: 150px;
  height: 250px;
`;

const SelectDate = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 35px;
`;
const CalendarContainer = styled.div`
  display: inline-flex;
  width: auto;

  .calendar {
    border: none;
    margin-right: 30px;
    margin-top: 25px;

    .react-calendar__tile--active {
      background: #fb4357;
      color: black;
      border-radius: 30px;
    }

    .react-calendar__tile--now {
      background: #f8f9fa;
      border: 1px solid #757575;
      border-radius: 30px;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      border-radius: 30px;
    }
  }
`;

const SelectTime = styled.div`
  padding: 30px 30px;
  width: 350px;
  height: 350px;
  background-color: #f8f9fa;
  border-left: 1px solid #ecedf2;
`;

const Time = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 35px;
`;

const TimePickContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 30px;
  width: auto;
  border-top: 1px solid #ecedf2;
`;

const TimePick = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100px;
`;

const TimeButton = styled.button`
  appearance: unset;
  margin-bottom: 6px;
  border: none;
  padding: 5px;
  height: 50px;
  width: 200px;
  border-radius: 8px;
  background-color: #ecedf2;
  font-weight: 600;
  color: black;

  &:hover {
    background-color: #fb4357;
    color: white;
  }
`;

const ButtonBox = styled.div`
  width: 1200px;
  text-align: right;
`;

const SeatButton = styled.button`
  appearance: unset;
  border: none;
  padding: 5px;
  margin-top: 30px;
  height: 60px;
  width: 150px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #fb4357;
  color: white;
`;

export default BookARsv;
