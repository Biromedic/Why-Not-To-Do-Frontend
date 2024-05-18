import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/logo.png';
import "../NavbarFolder/navbar.css";

function NavbarTop() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setTimeout(() => {
            navigate('/login');
          }, 400);
    };

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/" className='logo-section'>
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
                        <Nav.Link href="/about">About Me</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarTop;
