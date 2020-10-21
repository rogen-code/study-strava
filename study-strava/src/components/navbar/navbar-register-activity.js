import React, { useState } from 'react'
import RegisterModal from "./navbar-register-modal.js"

function NavbarRegister({ classes, studentName, school, update, setUpdate }) {
  const [visible, setVisible] = useState(false)

  const handeClick = () => {
    setVisible((prevVisible) => (prevVisible = !prevVisible));
  }

  return (
    <>
      <div className="navbar-item" onClick={handeClick}>
        +
      </div>
      <RegisterModal
        visible={visible}
        setVisible={setVisible}
        classes={classes}
        student={studentName}
        school={school}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  )
}

export default NavbarRegister