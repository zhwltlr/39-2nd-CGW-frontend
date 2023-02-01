import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled, { keyframes } from 'styled-components';

function NavMenu() {
  const [movieList, setMovieList] = useState([]);
  const [inputState, setInputState] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetch('/data/movieData.json')
      .then(response => response.json())
      .then(data => setMovieList(data));
  }, []);

  // useEffect(() => {
  //   fetch('http://10.58.52.67:3000/movies', {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(data => setMovieList(data));
  // }, []);

  return (
    <Navbar bg="light" expand="lg">
      {/* onClick={() => setInputState('')} */}
      <Container fluid style={{ width: '90%', height: '80px' }}>
        <StyledLink to="/">
          <Navbar.Brand
            style={{
              color: '#FB4357',
              fontSize: '52px',
              fontWeight: '700',
            }}
          >
            CGW
          </Navbar.Brand>
        </StyledLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">영화</Nav.Link>
            <Nav.Link href="/payment">예매내역</Nav.Link>
            <Nav.Link href="/Login">로그인</Nav.Link>
          </Nav>
          <Form className="d-flex" style={{ alignItems: 'center' }}>
            <Form.Control
              style={{ height: '35px' }}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={e => {
                setInputState(e.target.value);
                if (e.target.value.length > 0) {
                  setShowList(true);
                } else {
                  setShowList(false);
                }
              }}
              value={inputState}
            />
            <Button
              variant="danger"
              style={{
                height: '35px',
                width: '80px',
                padding: '2px 8px',
              }}
            >
              검색
            </Button>
          </Form>
        </Navbar.Collapse>
        {showList && (
          <SearchList
            onMouseOut={() => {
              setShowList(false);
            }}
            onMouseOver={() => {
              setShowList(true);
            }}
          >
            <ListOverContainer>
              {movieList.map((list, index) => {
                if (list.title.toLowerCase().includes(inputState)) {
                  return (
                    <StyledLink key={index} to="/">
                      <MovieFiltered>
                        <MovieInfoBox>
                          <ThumbsImg>
                            <Thumb src={list.thumbnail} alt="thumb nail" />
                          </ThumbsImg>
                          <MatchedTitle>{list.title}</MatchedTitle>
                        </MovieInfoBox>
                        <BookNow>🎫 예매하기</BookNow>
                      </MovieFiltered>
                    </StyledLink>
                  );
                } else {
                  return null;
                }
              })}
            </ListOverContainer>
          </SearchList>
        )}
      </Container>
    </Navbar>
  );
}

const fadeOut = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  appearance: unset;
  color: black;
`;

const SearchList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  position: absolute;
  height: 600px;
  width: 600px;
  top: 100%;
  right: 0;
  border-radius: 10px;
  background-color: rgba(248, 249, 250, 0.97);
  -webkit-box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  box-shadow: 7px 7px 21px -8px rgba(0, 0, 0, 0.42);
  z-index: 400;
`;

const ListOverContainer = styled.div`
  height: 100px;
  height: 400px;
  overflow: scroll;
  animation: ${fadeOut} 0.2s ease-in-out 0s normal forwards;
`;
const MovieFiltered = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  width: 450px;
  border-bottom: 1px solid grey;
  margin-bottom: 20px;
`;

const MovieInfoBox = styled.div`
  display: flex;
  height: 100%;
  width: 250px;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    cursor: pointer;
  }
`;

const ThumbsImg = styled.div`
  width: 130px;
  height: 100%;
  background-color: grey;
  border-radius: 10px;
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MatchedTitle = styled.p`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
  margin-left: 15px;
`;

const BookNow = styled.button`
  border: none;
  width: 100px;
  height: 50px;
  background-color: #fb4357;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 5px;
`;
const NotFoundText = styled.p`
  font-size: 20px;
  display: flex;
`;
export default NavMenu;
