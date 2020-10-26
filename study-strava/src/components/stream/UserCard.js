import React from 'react'
import UserCardNumbers from './UserCardNumbers'
import {Card, Button, ListGroup} from 'react-bootstrap';

function UserCard({studentName}) {
  return (
    <div id="left">
      <Card className="text-center" style={{ width: '18rem' }}>
        <Card.Img variant="top" className="user-img" src="https://graph.facebook.com/10204916064288050/picture?height=256&width=256" />
          <Card.Title>{studentName}</Card.Title>
          <ListGroup variant="flush" >
            <ListGroup.Item className="user-card-numbers-box">
              <UserCardNumbers title="Following" number={70} />
              <div className="user-card-half-border" />
              <UserCardNumbers title="Followers" number={63} />
              <div className="user-card-half-border" />
              <UserCardNumbers title="Activities" number={50} />
            </ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
      </Card>
    </div>
  )
}

export default UserCard