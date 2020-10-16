import React from "react"
import "../styles/sidebar.css"

import ClassButton from "./classButton"
import SchoolButton from "./SchoolButton"

function ClassRegistration({
  school,
  classes,
  studentName,
  setUpdate,
  update
}) {
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
        classes={classes}
      />
    </div>
  )
}

export default ClassRegistration
