import React from "react"
import { Card, Button } from 'react-bootstrap';


function SessionCards( { activityData }) {
  return (
    <>
      {activityData.map((session) => (
        <Card key={session.session_id}>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>{session.session_name}</Card.Title>
            <Card.Text>
              {session.session_description}
              {session.session_date}
            </Card.Text>
            <Button variant="primary">Register!</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default SessionCards