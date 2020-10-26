import React, { useEffect } from 'react'
import UserCardNumbers from './UserCardNumbers'
import LatestActivity from "./UserCardLatestActivity"
import {Card, Button, ListGroup} from 'react-bootstrap';
import StudyLog from "./UserCardStudyLog"

function UserCard({
  studentName,
  activityCount,
  yourFollowers,
  youFollow,
  userActivities
}) {
  return (
    <div id="left">
      <Card className="text-center" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          className="user-img"
          src="https://graph.facebook.com/10204916064288050/picture?height=256&width=256"
        />
        <Card.Title>{studentName}</Card.Title>
        <ListGroup variant="flush" >
          <ListGroup.Item className="user-card-numbers-box">
            <UserCardNumbers
              title="Following"
              number={youFollow.length}
              modalDisplay={youFollow}
            />
            <div className="user-card-half-border" />
            <UserCardNumbers
              title="Followers"
              number={yourFollowers.length}
              modalDisplay={yourFollowers}
            />
            <div className="user-card-half-border" />
            <UserCardNumbers
              title="Activities"
              number={activityCount}
              modalDisplay={userActivities}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <LatestActivity userActivities={userActivities} />
          </ListGroup.Item>
          <ListGroup.Item>
            <StudyLog />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default UserCard