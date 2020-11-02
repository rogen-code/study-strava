import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

import axios from 'axios'
import ClassRegistrationModal from "./ClassRegistrationModal"

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
      <Button
        type="button"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
        schoolname="schoolName"
      >
        Add Classes
      </Button>
      {clicked && (
        <ClassRegistrationModal
          possibleClasses={possibleClasses}
          studentName={studentName}
          schoolName={schoolName}
          setClicked={setClicked}
          setUpdate={setUpdate}
          update={update}
          clicked={clicked}
        />
      )}
    </>
  )
}

export default SchoolButton
