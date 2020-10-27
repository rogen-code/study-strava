import React from 'react'
import { Card, Button } from 'react-bootstrap';


function ActivityChart() {
  return (
    <Card style={{ width: '18rem' }} className="activity-card">
      <Card.Header>Upcoming Study Sessions</Card.Header>
      <Card.Body>
        This is some text within the body of the card.
      </Card.Body>
      <Button>
        Register
      </Button>
    </Card>
  )

}

export default ActivityChart