import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Autoplay]);

function Main() {
  const [movieList, setmMovieList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch('/data/data.json', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setmMovieList(data));
  }, []);

  useEffect(() => {
    fetch(`http/movie/${searchParams.toString()}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }, [searchParams]);

  return (
    <MainWrap>
      <Swiper
        autoplay={{
          delay: 3500,
        }}
        loop={true}
        slidesOffsetAfter={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
      >
        <SwiperSlide width={1200} height={450}>
          <MainSlide img="url(images/main1.jpg)" />
        </SwiperSlide>
        <SwiperSlide width={1200} height={450}>
          <MainSlide img="url(images/main2.jpg)" />
        </SwiperSlide>
        <SwiperSlide width={1200} height={450}>
          <MainSlide img="url(images/main3.jpg)" />
        </SwiperSlide>
      </Swiper>
      <MovieInner>
        <MainTitle>현재상영작</MainTitle>
        <MovieList>
          {movieList.map(movie => {
            return (
              <Movie key={movie.id}>
                <MovieLink to={`/order/${movie.id}`}>
                  <MovieContent>
                    <MovieId>{movie.id}</MovieId>
                    <MovieThumbnail src={movie.thumbnail} alt="poster" />
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieInfo>
                      <MovieRate>예매율: {movie.rate}</MovieRate>
                      <MovieScore>평점: {movie.score}</MovieScore>
                    </MovieInfo>
                  </MovieContent>
                </MovieLink>
              </Movie>
            );
          })}
        </MovieList>
      </MovieInner>
    </MainWrap>
  );
}
const MainWrap = styled.div`
  // padding: 5px 0;
  .swiper-button-next {
    height: 27px;
    background-image: url(images/next.png);
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
  }

  .swiper-button-prev {
    height: 27px;
    background-image: url(images/prev.png);
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;

const MainSlide = styled.div`
  width: 100%;
  height: 450px;
  background-image: ${props => props.img};
  background-size: cover;
  background-position-y: 30%;
  background-repeat: no-repeat;
`;

const MovieInner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const MainTitle = styled.h2`
  margin-top: 100px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 1200px;
  margin-top: 70px;
`;

const Movie = styled.div`
  width: 230px;
  height: 380px;
  margin: 0 auto;
  margin-bottom: 30px;
  cursor: pointer;
`;

const MovieContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: scale(1.03);
    transition: all 0.3s;
  }
`;
const MovieLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    color: #fb4357;
  }
`;
const MovieId = styled.p`
  position: absolute;
  padding: 5px 12px;
  color: #fff;
  font-size: 60px;
  text-shadow: 3px 3px #000;
`;
const MovieTitle = styled.h3`
  margin: 15px 0;
  font-size: 20px;
  font-weight: 700;
`;
const MovieThumbnail = styled.img`
  width: 230px;
  height: 300px;
  border-radius: 5px;
`;
const MovieInfo = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const MovieRate = styled.li`
  margin-right: 15px;
  font-size: 16px;
`;
const MovieScore = styled.li`
  margin-right: 15px;
  font-size: 16px;
`;

export default Main;
