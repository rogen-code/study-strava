import React from 'react'

import { Col } from 'react-bootstrap';

import { FaBeer } from 'react-icons/fa';

function ActivityCardCol({ otherActivities }) {
  return (
    <>
      {otherActivities.map((activity) => (
        <div className="tweet" key={activity.activity_id}>
          <div className="content">
            <span className="author">
              <span className="name">{activity.student_name}</span>
              <span className="handle">@{activity.student_name}</span>
            </span>
            <span className="time">{activity.activity_id}</span>
            <div className="message">{activity.activity_description}</div>
            <div className="buttons">
              <FaBeer />
              <FaBeer />
              <FaBeer />
              <FaBeer />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ActivityCardCol