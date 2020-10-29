import React, { useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';


function ClassButton({
  classes,
  student,
  school,
  setUpdate,
  update,
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
    <ListGroup>
      {classes.map((c) => (
        <ListGroup.Item key={c.class_id} className="class-rows">
          <div
            onClick={() => handleClick()}
            onKeyDown={() => handleClick()}
            className="classButton"
            role="button"
            tabIndex={0}
          >
            {c.class_name}
          </div>
          <div
            onClick={() => handleDelete(student, school, c.class_name, c.teacher_name, c.period_number)}
            role="button"
            tabIndex={0}
            onKeyDown={() => handleDelete(student, school, c.class_name, c.teacher_name, c.period_number)}
          >
            X
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ClassButton
