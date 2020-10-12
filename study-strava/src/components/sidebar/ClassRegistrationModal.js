import React from "react";

function ClassRegistrationModal({ possibleClasses }) {
  return (
  <>
    {possibleClasses.map((classInfo) =>
      <div>{classInfo.class_name} and {classInfo.teacher_name}</div>
    )}
  </>
  )
}

export default ClassRegistrationModal