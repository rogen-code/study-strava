import React, { useState } from "react"
import axios from 'axios'

import { Modal, Button } from 'react-bootstrap';
import ClassItems from "./ClassItems"


function ClassRegistrationModal({
  possibleClasses,
  studentName,
  schoolName,
  setUpdate,
  update,
  setClicked,
  clicked
}) {
  const [register, setRegister] = useState([])

  const handleClose = () => setClicked(false);

  const handleClick = (val) => {
    let alreadyExists = false
    let remove = null
    for (let i = 0; i < register.length; i += 1) {
      if (
        register[i][0] === val[0] &&
        register[i][1] === val[1] &&
        register[i][2] === val[2] &&
        register[i][3] === val[3]
      ) {
        alreadyExists = true
        remove = i
        break
      }
    }

    if (!alreadyExists) {
      const newRegister = [...register] || []
      newRegister.push(val)
      setRegister(newRegister)
    } else {
      const newRegister = [...register] || []
      newRegister.splice(remove, 1)
      setRegister(newRegister)
    }
  }

  const handleSubmit = () => {
    register.forEach((value) => {

      axios
        .post("http://localhost:4000/registerClass", {
          studentName: value[0],
          schoolName: value[1],
          className: value[2],
          teacherName: value[3],
          periodNumber: value[4],
        })
        .then((res) => {
          setRegister([])
          setUpdate()
          setClicked(false)
        })
        .catch((e) => {
          var x =7;
        })
    })
  }

  return (
    <Modal
      show={clicked}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {possibleClasses.map((classInfo) => (
          <ClassItems
            studentName={studentName}
            schoolName={schoolName}
            className={classInfo.class_name}
            teacherName={classInfo.teacher_name}
            periodNumber={classInfo.period_number}
            handleClick={handleClick}
            register={register}
            update={update}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit}>
          Submit Registration
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ClassRegistrationModal