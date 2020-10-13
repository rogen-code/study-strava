import React, { useState } from 'react';
import "../styles/sidebar.css"

function ClassItems({
  studentName,
  schoolName,
  className,
  teacherName,
  handleClick
}) {

  const [clicked, setClicked] = useState(false)

  const clickHandle = () => {
    handleClick([studentName, schoolName, className, teacherName])
    setClicked(!clicked)
  }

  return (
    <div
      className={`${clicked ? "clicked" : "unclicked"}`}
      role="button"
      tabIndex={0}
      onKeyDown={() => clickHandle()}
      onClick={() => clickHandle()}
    >
    {className} taught by {teacherName}
    </div>

  )

}

export default ClassItems


