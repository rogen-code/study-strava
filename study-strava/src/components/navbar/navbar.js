import React, {useState} from 'react';
import NavbarItem from "./navbar-item";
import NavbarRegister from "./navbar-register-activity"
import "../styles/navbar.css";

function Navbar({ classes, studentName, school, update, setUpdate, setActiveTab }) {

  return (
    <div className="navbar">
      <div id="left">
        <NavbarItem
          txt="Dashboard"
          dropdown={["Activity Feed", "Upcoming Tests"]}
          setActiveTab={setActiveTab}
          height={150}
        />
        <NavbarItem
          txt="Studying"
          dropdown={["Calendar", "Study Log"]}
          setActiveTab={setActiveTab}
        />
        <NavbarItem
          txt="Explore"
          dropdown={["Study Calendar", "Study Log"]}
          setActiveTab={setActiveTab}
        />
      </div>
      <div id="right">
        <NavbarItem
          txt="Dashboard"
          dropdown={["Activity Feed", "Upcoming Tests"]}
          setActiveTab={setActiveTab}
        />
        <NavbarRegister
          classes={classes}
          studentName={studentName}
          school={school}
          update={update}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  )
}

export default Navbar