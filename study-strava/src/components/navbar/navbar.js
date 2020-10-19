import React, {useState} from 'react';
import NavbarItem from "./navbar-item";
import NavbarRegister from "./navbar-register-activity"
import "../styles/navbar.css";

function Navbar({ classes, studentName, school }) {

  return (
    <div className="navbar">
      <div id="left">
        <NavbarItem
          txt="Dashboard"
          dropdown={["Activity Feed", "Upcoming Tests"]}
        />
        <NavbarItem
          txt="Studying"
          dropdown={["Study Calendar", "Study Log"]}
        />
        <NavbarItem
          txt="Explore"
          dropdown={["Study Calendar", "Study Log"]}
        />
      </div>
      <div id="right">
        <NavbarItem
          txt="Dashboard"
          dropdown={["Activity Feed", "Upcoming Tests"]}
        />
        <NavbarRegister
          classes={classes}
          studentName={studentName}
          school={school}
        />
      </div>

    </div>
  )
}

export default Navbar