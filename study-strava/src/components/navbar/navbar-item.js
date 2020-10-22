import React, { useState } from 'react';

function NavbarItem({ txt, dropdown, setActiveTab, height }) {
  const [visible, setVisible] = useState(false)

  const handleHover = () => {
    setVisible((prevVisible) => (prevVisible = !prevVisible));
  }

  function handleClick(name) {
    setActiveTab(name)
    handleHover()
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={visible ? "navbar-item navbar-selected" : "navbar-item"}
      style={{height: visible && `${height}px`}}
    >
      <span
        className={visible ? "navbar-selector navbar-selected-top": "navbar-selected-top"}
        onClick={() => handleClick(txt)}
      >
        {txt}
      </span>
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