import React, { useState, useEffect } from "react";
import ClassRegistrationModal from "./ClassRegistrationModal"

import axios from 'axios'

function SchoolButton({
  schoolName,
  studentName,
  setUpdate,
  update,
  classes
}) {
  const [clicked, setClicked] = useState(false)
  const [possibleClasses, setPossibleClasses] = useState([])

  const handleClick = () => {
    setClicked(!clicked)
  }

  useEffect(() => {
    if (schoolName) {
      axios
        .get(`http://localhost:4000/getAllClassesAtSchool/${schoolName}`)
        .then((res) => {
          const cache = {};
          classes.forEach((c) => {
            cache[c.class_name] = true
          })
          const notEnrolled = res.data.filter((c) => {
            return cache[c.class_name] === undefined
          })
          setPossibleClasses(notEnrolled)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [schoolName, classes])

  return (
    <>
      <button
        type="button"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
        schoolName="schoolName"
      >
        Add Classes
      </button>
      {clicked && (
        <ClassRegistrationModal
          possibleClasses={possibleClasses}
          studentName={studentName}
          schoolName={schoolName}
          setUpdate={setUpdate}
          update={update}
        />
      )}
    </>
  )
}

export default SchoolButton