import React, { useState, useEffect } from "react";
import ClassRegistrationModal from "./ClassRegistrationModal"

import axios from 'axios'

function SchoolButton({ schoolName }) {
  const [clicked, setClicked] = useState(false)
  const [possibleClasses, setPossibleClasses] = useState([])

  const handleClick = () => {
    setClicked(!clicked)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getAllClassesAtSchool/${schoolName}`)
      .then((res) => {
        setPossibleClasses(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [schoolName])

  return (
    <>
      <button
        type="button"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
        schoolName="schoolName"
      >
        {schoolName}
      </button>
      {clicked && <ClassRegistrationModal possibleClasses={possibleClasses} />}
    </>
  )
}

export default SchoolButton