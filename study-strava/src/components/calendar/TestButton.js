import React from 'react'
import {Button, Badge} from 'react-bootstrap';
import useWindowSize from "../../helpers/screenSize"


function TestButton({ day }) {
  let size = useWindowSize()

  return (
    <>

          <Button variant="danger" className="btn-calendar">
            {day.test_name}
          </Button>
    </>
  )
}

export default TestButton

