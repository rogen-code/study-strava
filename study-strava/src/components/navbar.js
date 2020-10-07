import React, {useState} from 'react';
import NavbarItem from "./navbar-item";
import "./styles/navbar.css";

function Navbar() {

  return (
    <div className="navbar">
      <NavbarItem
        txt="Dashboard"
        dropdown={["Activity Feed", "My Study Sessions"]}
      />
      {/* <NavbarItem txt="Calendar"/>
      <NavbarItem txt="Explore"/> */}
    </div>
  )
}

export default Navbar