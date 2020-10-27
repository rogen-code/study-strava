import React from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap';
import format from "date-fns/format"



function ActivityChart({ upcomingStudySession, setActiveTab }) {
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
        <a
          href={upcomingStudySession[i].session_url}
          target="_blank"
          rel="noopener noreferrer"
          className="upcoming-sessions-items"
        >
          <ListGroup.Item>
            {upcomingStudySession[i].session_name}
            <br />
            {formatDay}
            <br />
            {upcomingStudySession[i].teacher_name}
          </ListGroup.Item>
        </a>
      )
    }
  }

  return (
    <Card style={{ width: '18rem' }} className="activity-card">
      <Card.Header>Upcoming Study Sessions</Card.Header>
      <ListGroup variant="flush">
        {sessions}
      </ListGroup>
      <Button onClick={() => setActiveTab('Study Sessions')}>
        Register
      </Button>
    </Card>
  )

}

export default ActivityChart