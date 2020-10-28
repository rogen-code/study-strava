import React from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap';
import format from "date-fns/format"



function UpcomingTestChart({ upcomingStudySession, setActiveTab, toPage }) {
  const sessions = []

  for (let i = 0; i < 5; i++) {
    if (upcomingStudySession[i] === undefined) break;

    const dt = upcomingStudySession[i].test_date
    const year = dt.substring(0, 4)
    const month = Number(dt.substring(5, 7)) - 1
    const day = dt.substring(8, 10)
    const dateString = "MMMM i yyyy "

    const formatDay = format(new Date(year, month, day), dateString)

    if (i === 4) {
      sessions.push(<ListGroup.Item onClick={() => setActiveTab("Calendar")}>...</ListGroup.Item>)
    } else {
      sessions.push(
          <ListGroup.Item>
            {upcomingStudySession[i].test_name}
            <br />
            {formatDay}
          </ListGroup.Item>
      )
    }
  }

  return (
    <Card style={{ width: '18rem' }} className="activity-card">
      <Card.Header>Upcoming Tests</Card.Header>
      <ListGroup variant="flush">
        {sessions}
      </ListGroup>
    </Card>
  )

}

export default UpcomingTestChart