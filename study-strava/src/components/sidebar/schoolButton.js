import React, { useState, useEffect } from "react";
import ClassRegistrationModal from "./ClassRegistrationModal"

import axios from 'axios'

function SchoolButton({ schoolName, studentName, setUpdate }) {
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
          setPossibleClasses(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [schoolName])

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
        />
      )}
    </>
  )
}

export default SchoolButton