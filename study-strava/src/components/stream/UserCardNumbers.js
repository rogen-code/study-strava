import React from 'react'

function UserCardNumbers({title, number}) {
  return (
    <div className="user-card-numbers-text">
      <div>{title}</div>
      <div>{number}</div>
    </div>
  )
}

export default UserCardNumbers
