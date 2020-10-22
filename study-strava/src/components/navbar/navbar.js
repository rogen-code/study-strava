import React, {useState} from 'react';
import NavbarItem from "./navbar-item";
import NavbarRegister from "./navbar-register-activity"
import "../styles/navbar.css";


import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';



function NavigationBar({ classes, studentName, school, update, setUpdate, setActiveTab }) {

  const [show, toggleShow] = useState(true);

  return (
    <>
      <Navbar bg="light" expand="md" className="justify-content-between">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="tabs">
            <Nav.Item onClick={() => setActiveTab('Calendar')}>
              <Nav.Link eventKey="1">Calendar</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => setActiveTab('Stream')}>
              <Nav.Link eventKey="2">Stream</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button className="ml-auto" variant="outline-success">Search</Button>

        </Navbar.Collapse>
      </Navbar>
    </>
















  //   <div className="navbar">
  //     <div id="left">
  //       <NavbarItem
  //         txt="Dashboard"
  //         dropdown={["Activity Feed", "Upcoming Tests"]}
  //         setActiveTab={setActiveTab}
  //         height={150}
  //       />
  //       <NavbarItem
  //         txt="Studying"
  //         dropdown={["Calendar", "Study Log"]}
  //         setActiveTab={setActiveTab}
  //         height={150}
  //       />
  //       <NavbarItem
  //         txt="Explore"
  //         dropdown={["Study Calendar", "Study Log"]}
  //         setActiveTab={setActiveTab}
  //         height={150}
  //       />
  //     </div>
  //     <div id="right">
  //       <NavbarItem
  //         txt="Dashboard"
  //         dropdown={["Activity Feed", "Upcoming Tests"]}
  //         setActiveTab={setActiveTab}
  //         height={150}
  //       />
  //       <NavbarRegister
  //         classes={classes}
  //         studentName={studentName}
  //         school={school}
  //         update={update}
  //         setUpdate={setUpdate}
  //       />
  //     </div>
  //   </div>
  )
}

export default NavigationBar