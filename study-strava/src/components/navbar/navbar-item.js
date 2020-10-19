import React, { useState } from 'react';

function NavbarItem({ txt, dropdown }) {
  const [visible, setVisible] = useState(false)

  const handleHover = () => {
    setVisible((prevVisible) => (prevVisible = !prevVisible));
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="navbar-item"
    >
      <div>{txt}</div>
      {visible &&
        dropdown.map((item, i) => (
          <div className="navbar-select" key={i}>
            {item}
          </div>
        ))}
    </div>
  )
}

export default NavbarItem