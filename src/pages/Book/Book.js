import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import BookARsv from './BookARsv';
import styled from 'styled-components';

const Book = () => {
  const [movieData, setMovieData] = useState({});

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    // fetch('/data/movieData.json')
    fetch(`http://10.58.52.204:3000/times/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovieData(data);
      });
  }, []);

  if (!movieData) return null;

  return (
    <BookAWrapper>
      <MovieContainer>
        <ThumbFrame>
          <ThumbNails src={movieData[0]?.thumbnail} alt="thumb nail" />
        </ThumbFrame>
        <MovieInfo>
          <MovieTitle>{movieData[0]?.title}</MovieTitle>
          <Age>{movieData[0]?.ageLimit}세 이상 관람가</Age>
          <MovieScore>
            <ReactStars
              className="ReactStarts"
              value={movieData[0]?.rate}
              edit={false}
            />
          </MovieScore>
        </MovieInfo>
      </MovieContainer>
      <BookARsv params={id} />
    </BookAWrapper>
  );
};

const BookAWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin-bottom: 130px;
`;

const MovieContainer = styled.section`
  display: flex;
  width: 800px;
  height: 480px;
  margin-top: 60px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  overflow: hidden;
`;

const ThumbFrame = styled.div`
  background-color: #efefef;
  width: 650px;
  height: inherit;
`;

const ThumbNails = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const MovieInfo = styled.section`
  padding: 50px;
  width: 800px;
  height: 200px;
  line-height: 40px;
`;

const MovieTitle = styled.h1`
  font-weight: 800;
  font-size: 40px;
`;

const Age = styled.h3`
  font-size: 20px;
  font-weight: 300px;
`;

const MovieScore = styled.h2`
  font-size: 60px;
`;

export default Book;
