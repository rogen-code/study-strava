import React, { useState } from "react"
import axios from 'axios'

import ClassItems from "./ClassItems"

function ClassRegistrationModal({
  possibleClasses,
  studentName,
  schoolName,
  setUpdate,
  update
}) {
  const [register, setRegister] = useState([])

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
        })
        .then((res) => {
          setRegister([])
          setUpdate()
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

  return (
    <div>
      {possibleClasses.map((classInfo) => (
        <ClassItems
          studentName={studentName}
          schoolName={schoolName}
          className={classInfo.class_name}
          teacherName={classInfo.teacher_name}
          handleClick={handleClick}
          register={register}
          update={update}
        />
      ))}
      <button type="submit" onClick={handleSubmit}>
        Submit Registration
      </button>
    </div>
  )
}

export default ClassRegistrationModal