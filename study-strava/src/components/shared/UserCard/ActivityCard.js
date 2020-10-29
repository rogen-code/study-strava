import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { Col } from 'react-bootstrap';

import { FaBeer } from 'react-icons/fa';

function ActivityCardCol({ otherActivities }) {

  function formatDay(dt) {
    if (!dt) return null
    const year = Number(dt.substring(0, 4))
    const month = Number(dt.substring(5, 7)) - 1
    const day = Number(dt.substring(8, 10))
    const hr = Number(dt.substring(11, 13))
    const min = Number(dt.substring(14, 16))
    const sec = Number(dt.substring(17, 19))
    return formatDistanceToNow(new Date(year, month, day, hr, min, sec))
  }

  return (
    <>
      {otherActivities.map((activity) => (
        <div className="tweet" key={activity.activity_id}>
          <div className="content">
            <span className="author">
              <span className="name">{activity.student_name}</span>
              <span className="handle">@{activity.student_name}</span>
            </span>
            <span className="time">{formatDay(activity.activity_date)} ago</span>
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