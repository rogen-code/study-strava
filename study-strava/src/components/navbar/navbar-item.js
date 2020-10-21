import React, { useState } from 'react';

function NavbarItem({ txt, dropdown, setActiveTab, height }) {
  const [visible, setVisible] = useState(false)

  const handleHover = () => {
    setVisible((prevVisible) => (prevVisible = !prevVisible));
  }

  function handleClick(name) {
    setActiveTab(name)
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={visible ? "navbar-item navbar-selected" : "navbar-item"}
      style={{height: visible && `${height}px`}}
    >
      <div>{txt}</div>
      {visible &&
        dropdown.map((item, i) => (
          <div className="navbar-select" key={i} onClick={() => handleClick(item)}>
            {item}
          </div>
        ))}
    </div>
  )
}

export default NavbarItem