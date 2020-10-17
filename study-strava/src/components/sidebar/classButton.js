import React, { useState } from 'react';
import axios from 'axios';

function ClassButton({
  className,
  school,
  studentName,
  setUpdate,
  update,
  teacherName
}) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  const handleDelete = (student, schoolName, classN, teacher, periodNumber) => {
    axios
      .put("http://localhost:4000/deleteClass", {
        studentName: student,
        schoolName,
        className: classN,
        teacherName: teacher,
        periodNumber,
      })
      .then(() => {
        setUpdate()
      })
      .catch((e) => {
        console.log(e)
      })
  }



  return (
    <div
      onClick={() => handleClick()}
      onKeyDown={() => handleClick()}
      className="classButton"
      role="button"
      tabIndex={0}
    >
      {className}
      <div
        onClick={() => handleDelete(studentName, school, className, teacherName)}
        role="button"
        tabIndex={0}
        onKeyDown={() => handleDelete(studentName, school, className, teacherName)}
      >
        X
      </div>
    </div>
  )
}

export default ClassButton