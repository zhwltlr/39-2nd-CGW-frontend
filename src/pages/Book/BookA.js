import React from 'react';
import BookARsv from './BookARsv';
import styled from 'styled-components';

const BookA = () => {
  return (
    <BookAWrapper>
      <MovieContainer>
        <ThumbNails src="/images/insideOut.jpg" alt="thumb nail" />
        <MovieInfo>
          <MovieTitle>Inside out</MovieTitle>
          <Age>전체 관람가</Age>
          <MovieScore>평점 4.5점</MovieScore>
        </MovieInfo>
      </MovieContainer>
      <BookARsv />
    </BookAWrapper>
  );
};

const BookAWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const MovieContainer = styled.section`
  display: flex;
  width: 800px;
  margin-top: 100px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  over-flow: hidden;
`;

const ThumbNails = styled.img`
  width: 250px;
  height: auto;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const MovieInfo = styled.section`
  padding: 30px;
  width: 800px;
  height: 200px;
  line-height: 30px;
`;

const MovieTitle = styled.h1`
  font-weight: 800;
  font-size: 30px;
`;

const Age = styled.h3`
  font-size: 15px;
  font-weight: 300px;
`;

const MovieScore = styled.h2`
  font-size: 20px;
`;

export default BookA;
