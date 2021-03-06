import React, { useState, useEffect } from 'react';
import "../../styles/sidebar.css"

function ClassItems({
  studentName,
  schoolName,
  className,
  teacherName,
  periodNumber,
  handleClick,
  register,
  update
}) {

  const [clicked, setClicked] = useState(false)

  const clickHandle = () => {
    handleClick([studentName, schoolName, className, teacherName, periodNumber])
    setClicked(!clicked)
  }

  useEffect(() => {
    setClicked(false)
  }, [update])

  return (
    <div>
      <div
        className={`${clicked ? "clicked" : "unclicked"}`}
        role="button"
        tabIndex={0}
        onKeyDown={() => clickHandle()}
        onClick={() => clickHandle()}
      >
        {className} taught by {teacherName}
      </div>
    </div>

  )

}

export default ClassItems


