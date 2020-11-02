import React from "react"
import "../../styles/sidebar.css"

import { Card, ListGroup } from 'react-bootstrap';


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
    <Card style={{ width: '18rem' }} className="classes-register">
      <Card.Header>Your Classes</Card.Header>
      <ClassButton
        classes={classes}
        student={studentName}
        school={school}
        setUpdate={setUpdate}
        update={update}
      />

      <SchoolButton
        schoolName={school}
        studentName={studentName}
        setUpdate={setUpdate}
        update={update}
        classes={classes}
      />
    </Card>
  )
}

export default ClassRegistration
