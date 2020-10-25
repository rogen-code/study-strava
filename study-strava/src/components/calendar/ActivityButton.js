import React from 'react'
import {Button, Badge} from 'react-bootstrap';
import useWindowSize from "../../helpers/screenSize"

function ActivityButton({ day }) {

  let size = useWindowSize()

  return (
    <>
        <Button variant="danger" className="btn-calendar">
          {day.activity_name}
        </Button>

  </>
  )
}


export default ActivityButton