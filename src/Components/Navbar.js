import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Components/navbar.css"
import logo from '../Assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function NavbarTop() {
  return (
      <Navbar expand="lg">
      <Container>
          <Navbar.Brand href="#" className='logo-section'>
            <img
              src={logo}
              alt="Logo"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll">
            <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto nav-links-section">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">About Me</Nav.Link>
              <Nav.Link href="#action3">Services</Nav.Link>
              <Nav.Link href="#action4">Contact</Nav.Link>
              <Nav.Link href="#action5">Portfolio</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;