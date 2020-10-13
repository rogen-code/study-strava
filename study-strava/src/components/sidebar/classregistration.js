import React from "react"

import ClassButton from "./classButton"
import SchoolButton from "./schoolButton"

function ClassRegistration({ school, classes, studentName, setUpdate, update }) {
  return (
    <div id="sidebar">
      {classes.map((className) => (
        <ClassButton className={className.class_name} />
      ))}
      <SchoolButton
        schoolName={school}
        studentName={studentName}
        setUpdate={setUpdate}
        update={update}
      />
    </div>
  )
}

export default ClassRegistration
