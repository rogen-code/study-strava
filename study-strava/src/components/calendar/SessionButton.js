import React from 'react'
import {Button} from 'react-bootstrap';

function SessionButton({ day }) {
  return (
    <>
        <Button variant="success" className="btn-calendar" key={day.session_id}>
          {day.session_name}
        </Button>
  </>
  )
}


export default SessionButton