import React from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap';
import format from "date-fns/format"
import DeleteButton from "./DeleteButton"



function ActivityChart({ upcomingStudySession, setActiveTab, toPage, studentID, getNewData, update, setUpdate }) {
  const sessions = []

  for (let i = 0; i < 5; i++) {
    if (upcomingStudySession[i] === undefined) break;

    const dt = upcomingStudySession[i].session_date
    const year = dt.substring(0, 4)
    const month = Number(dt.substring(5, 7)) - 1
    const day = dt.substring(8, 10)
    const dateString = "MMMM i yyyy "

    const formatDay = format(new Date(year, month, day), dateString)

    if (i === 4) {
      sessions.push(<ListGroup.Item>...</ListGroup.Item>)
    } else {
      sessions.push(
        <ListGroup.Item className="studySessions">
          <div>
            {upcomingStudySession[i].session_name}
            <br />
            {formatDay}
            <br />
            {upcomingStudySession[i].teacher_name}
          </div>
          <div>
            <DeleteButton
              sessionID={upcomingStudySession[i].session_id}
              studentID={studentID}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
        </ListGroup.Item>
      )
    }
  }

  return (
    <Card style={{ width: '18rem' }} className="activity-card">
      <Card.Header>Upcoming Study Sessions</Card.Header>
      <ListGroup variant="flush">
        {sessions}
      </ListGroup>
      <Button onClick={() => setActiveTab(toPage)}>
        Register
      </Button>
    </Card>
  )

}

export default ActivityChart