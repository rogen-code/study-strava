import React from 'react'
import {Button, Badge} from 'react-bootstrap';
import useWindowSize from "../../helpers/screenSize"

function ActivityButton({ day }) {

  let size = useWindowSize()

  return (
    <>
        <Button className="btn-calendar" variant="info">
          {day.activity_name}
        </Button>

  </>
  )
}


export default ActivityButton