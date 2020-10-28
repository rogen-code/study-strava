import React, { useRef } from "react"
import { Form, Button } from 'react-bootstrap';


function SearchBar({ search, fetchData, pagerDispatch }) {

  function handleClick(e) {
    fetchData(e)
  }

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Search Study Sessions</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search Study Sessions"
          ref={search}
        />
        <Button onClick={fetchData}>Click Me</Button>
      </Form.Group>
    </Form>
  )
}

export default SearchBar