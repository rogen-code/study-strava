import React from 'react'
import {Card} from 'react-bootstrap';


function Biography() {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>From The Website Maker</Card.Title>
          <Card.Text>
            Thank you for visiting my website. This proof of concept was
            designed in my free time over the course of a few weeks. The problem
            it seeks to correct is that students very infrequently have social
            encouragement to study from their peers. Additionally, many students
            fail to track upcoming tests and their own actions towards them.
            I'm currently on the hunt for a full-time role.
            I'd love to get in touch!
          </Card.Text>
          <Card.Link href="https://github.com/rogen-code/study-strava/tree/master/study-strava">Github</Card.Link>
          <Card.Link href="https://www.linkedin.com/in/josh-rogen/">LinkedIn</Card.Link>
          <Card.Link href="#mailto: rogenjh@gmail.com">Email</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )

}

export default Biography
