import React from "react"

import ClassButton from "./classButton"
import SchoolButton from "./schoolButton"

function ClassRegistration({ school, classes }) {
  return (
    <div id="sidebar">
      {classes.map((className) => (
        <ClassButton className={className.class_name} />
      ))}
      <SchoolButton schoolName={school} />
    </div>
  )
}

export default ClassRegistration
