import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavMenu() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid style={{ width: '90%', height: '80px' }}>
        <Navbar.Brand
          href="#"
          style={{
            color: '#FB4357',
            fontSize: '52px',
            fontWeight: '700',
          }}
        >
          CGW
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">영화</Nav.Link>
            <Nav.Link href="order">예매내역</Nav.Link>
            <Nav.Link href="login">로그인</Nav.Link>
          </Nav>
          <Form className="d-flex" style={{ alignItems: 'center' }}>
            <Form.Control
              style={{ height: '35px' }}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              variant="danger"
              style={{ height: '35px', width: '80px', padding: '2px 8px' }}
            >
              검색
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
