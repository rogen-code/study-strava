import React, {useState, useEffect} from 'react';
import NavbarItem from "./navbar-item";
import NavbarRegister from "./navbar-register-activity"
import "../styles/navbar.css";
import RegisterModal from "./navbar-register-modal"
import useWindowSize from "../../helpers/screenSize"


import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';



function NavigationBar({ classes, studentName, school, update, setUpdate, setActiveTab }) {
  const size = useWindowSize();
  const [show, toggleShow] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="md" className="justify-content-between">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item onClick={() => setActiveTab('Calendar')}>
              <Nav.Link eventKey="1">Calendar</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => setActiveTab('Stream')}>
              <Nav.Link eventKey="2">Stream</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
          <Nav.Item className={(size.width > 768) && "ml-auto"} onClick={() => toggleShow(!show)}>
             <Nav.Link eventKey="3">{size.width > 768 ? "+" : "Add Event"}</Nav.Link>
          </Nav.Item>
          </Nav>
          <RegisterModal
            visible={show}
            setVisible={toggleShow}
            classes={classes}
            student={studentName}
            school={school}
            update={update}
            setUpdate={setUpdate}
          />
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}



export default NavigationBar