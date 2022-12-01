import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookB from './BookB';
import Calendar from 'react-calendar';
import styled, { keyframes } from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const BookARsv = ({ params }) => {
  const [movieData, setMovieData] = useState([]);
  const [getMovieTime, setGetMovieTime] = useState([]);
  const [value, setValue] = useState(new Date());
  const [showSeat, setShowSeat] = useState(false);
  const [userSelect, setUserSelect] = useState('');
  const [filterData, setFilterData] = useState([]);

  const IP = 'http://10.58.52.204:3000/times';

  const [selectList, setSelectList] = useState({
    place: '',
    day: '',
    time: '',
  });

  const { place, time, day } = selectList;

  const onChangeData = e => {
    const { name, value, id } = e.target;
    setSelectList(prev => ({ ...prev, [name]: id }));
    if (name === 'place') {
      fetch(`${IP}/${params}/${id}`)
        .then(res => res.json())
        .then(data => setGetMovieTime(data));
    }
  };

  const timeFilter = getMovieTime.filter(el => el.name === userSelect);

  const deleteObj = () => {
    setSelectList({ place: '', day: '', time: '' });
  };

  const changeDate = e => {
    let date = new Date(e);
    let year = date.getFullYear();
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    const test = year + '.' + month + '.' + day;
    setUserSelect(test);
    setSelectList(prev => ({ ...prev, day: test }));
  };

  //영화장소 fetch
  useEffect(() => {
    fetch('http://10.58.52.204:3000/locations/lists')
      // fetch('/data/moviePlaceData.json')
      .then(res => res.json())
      .then(data => {
        setMovieData(data);
      });
  }, []);

  // useEffect(() => {
  //   fetch('http://10.58.52.204:3000/locations/lists')
  //     // fetch('/data/movieTimeData.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       setGetMovieTime(data);
  //     });
  // }, [userSelect]);

  const a = () => {
    const selDayId = getMovieTime.map((el, i) => {
      if (el.name === selectList.day) {
        return el.id;
      }
    });
    const selectDayId = selDayId.filter(el => el !== undefined);
    const a = getMovieTime.map((el, i) => {
      if (el.name === selectList.day) {
        return i;
      }
    });
    const selectIdx = a.filter(el => el !== undefined);
    const arr = getMovieTime[Number(selectIdx.join(''))];
    const selectTimeId = arr.time.map(el => {
      if (el.time === selectList.time) {
        return el.time_id;
      }
    });

    fetch(
      `${IP}/${params}/${selectList.place}/${Number(
        selectDayId.join('')
      )}/${Number(selectTimeId.join(''))}`
    )
      .then(res => res.json())
      .then(data => console.log(data));
  };

  if (!movieData) return null;
  if (!getMovieTime) return null;

  return (
    <>
      <ReservationContainer>
        <PlaceSelect>
          <StepTitle>STEP1</StepTitle>
          <SubTitle>지역/영화관 선택</SubTitle>
          <PlacePick>
            {movieData?.map((movie, index) => (
              <PlacePickTextSeoul key={index}>
                <PlaceTextBox key={movie.region_id}>
                  <PlacePickP>📍{movie.name}</PlacePickP>
                </PlaceTextBox>
                <PlacePickButtonContainer>
                  <Pick>
                    {movie.location.map((lo, index) => {
                      return (
                        <>
                          <Input
                            key={index}
                            type="radio"
                            name="place"
                            id={lo.branch_id}
                            defaultValue={lo.branch_name}
                            onChange={onChangeData}
                          />
                          <Label htmlFor={lo.branch_id}>{lo.branch_name}</Label>
                        </>
                      );
                    })}
                  </Pick>
                </PlacePickButtonContainer>
              </PlacePickTextSeoul>
            ))}
          </PlacePick>
        </PlaceSelect>
        <CalendarContainer>
          <PlaceText>
            <StepTitle>STEP2</StepTitle>
            <SubTitle>날짜 선택</SubTitle>
          </PlaceText>
          <CalenderBox>
            {place ? (
              <Calendar
                className="calendar"
                value={value}
                onChange={changeDate}
                minDate={new Date()}
                maxDate={new Date(2022, 11, 16)}
                minDetail="year"
              />
            ) : (
              <CalenderReadyBox>
                <CalendarReadyText>
                  🍿 영화관을 먼저 선택해주세요!
                </CalendarReadyText>
              </CalenderReadyBox>
            )}
          </CalenderBox>
        </CalendarContainer>
        <SelectTime>
          <StepTitle>STEP3</StepTitle>
          <SubTitle>시간 선택</SubTitle>
          <TimePickContainer>
            {day ? (
              <TimePick>
                {timeFilter.length !== 0 ? (
                  timeFilter.map((movieTime, i) => {
                    return (
                      <React.Fragment key={i}>
                        {timeFilter[i].time.map((detailTime, index) => {
                          return (
                            <React.Fragment key={index}>
                              <TimeRadio
                                type="radio"
                                name="time"
                                id={detailTime.time}
                                defaultValue={detailTime.time}
                                onChange={onChangeData}
                              />
                              <TimeLabel htmlFor={detailTime.time}>
                                {detailTime.time}
                              </TimeLabel>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TimePickReadyBox>
                    <TimePickReady>🥲 매진 되었어요!</TimePickReady>
                  </TimePickReadyBox>
                )}
              </TimePick>
            ) : (
              <TimePickReadyBox>
                <TimePickReady>📆 날짜를 먼저 정해주세요!</TimePickReady>
              </TimePickReadyBox>
            )}
          </TimePickContainer>
        </SelectTime>
      </ReservationContainer>
      <ButtonBox>
        {place || day || time ? (
          <EmptyDataBtn onClick={deleteObj}>다시 담기</EmptyDataBtn>
        ) : (
          <EmptyDataBtn onClick={() => alert('지울 내용이 없어요!')}>
            다시 고르기
          </EmptyDataBtn>
        )}
        {time ? (
          <SeatButton
            onClick={() => {
              setShowSeat(true);
              a();
            }}
          >
            좌석 선택
          </SeatButton>
        ) : (
          <SeatButtonGrey
            onClick={() => {
              alert('예매 정보를 모두 선택해주세요!');
            }}
          >
            좌석 선택
          </SeatButtonGrey>
        )}
      </ButtonBox>
      {showSeat && <BookB setShowSeat={setShowSeat} />}
    </>
  );
};

const fadeOut = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

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
  width: 390px;
  height: inherit;
  border-right: 1px solid #ecedf2;
  padding: 30px 50px;
  overflow: scroll;
`;

const StepTitle = styled.div`
  font-size: 20px;
  color: #fb4357;
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 35px;
`;

const PlacePick = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  overflow: scroll;
  animation: ${fadeOut} 0.2s ease-in-out 0s normal forwards;
`;

const PlacePickTextSeoul = styled.div`
  margin-top: 5px;
  padding-top: 15px;
  width: 260px;
  height: 130px;
  border-top: 1px solid #ecedf2;
`;

const PlaceTextBox = styled.div`
  width: 100px;
`;

const PlacePickP = styled.p`
  padding-top: 5px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const PlacePickButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
`;

const Pick = styled.div`
  display: flex;
  gap: 2px;
`;

const Label = styled.label`
  display: flex;
  border: none;
  margin-bottom: 6px;
  padding: 5px;
  height: 50px;
  width: 130px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #ecedf2;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  appearance: unset;
  &:checked + ${Label} {
    background-color: #fb4357;
    color: white;
  }
`;

const PlaceText = styled.div`
  padding: 30px 30px;
  width: 150px;
  height: 250px;
`;

const CalenderBox = styled.div`
  width: 350px;
  height: 400px;
`;

const CalenderReadyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: inherit;
  height: inherit;
`;

const CalendarReadyText = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const CalendarContainer = styled.div`
  display: inline-flex;
  width: auto;
  margin-right: 30px;

  .calendar {
    animation: ${fadeOut} 0.2s ease-in-out 0s normal forwards;
    border: none;
    margin-right: 30px;
    margin-top: 25px;

    .react-calendar__tile--active {
      background: #fb4357;
      color: white;
      border-radius: 50px;

      &:active {
        color: white;
      }
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      border-radius: 30px;
    }

    .react-calendar__tile--now {
      background: #e7e7e7;
      border: 1px solid #e7e7e7;
      border-radius: 30px;
      color: black;
    }

    .react-calendar__tile:disabled {
      background-color: white;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
      background: #fb4357;
      color: white;
    }
    .react-calendar__navigation button:disabled {
      background-color: white;
    }
    .react-calendar__tile:disabled {
      background-color: #f0f0f0;
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
  animation: ${fadeOut} 0.2s ease-in-out 0s normal forwards;
`;

const TimeLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 6px;
  border: none;
  border-radius: 8px;
  padding: 5px;
  width: 200px;
  font-weight: 600;
  background-color: #ecedf2;
`;

const TimeRadio = styled.input`
  appearance: unset;
  &:checked + ${TimeLabel} {
    background-color: #fb4357;
    color: white;
  }
`;

const TimePickReadyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const TimePickReady = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const ButtonBox = styled.div`
  width: 1200px;
  text-align: right;
`;

const EmptyDataBtn = styled.button`
  appearance: unset;
  border: none;
  padding: 5px;
  margin-top: 30px;
  height: 60px;
  width: 150px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #ecedf2;
  color: black;
  margin-right: 10px;
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

const SeatButtonGrey = styled.button`
  appearance: unset;
  border: none;
  padding: 5px;
  margin-top: 30px;
  height: 60px;
  width: 150px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #ecedf2;
  color: black;
`;

export default BookARsv;
