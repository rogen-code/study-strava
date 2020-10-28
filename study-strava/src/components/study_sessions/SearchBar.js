import React, { useRef } from "react"
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


function SearchBar({ search, fetchData, pagerDispatch }) {

  return (
    <Form className="searchForm">
      <Form.Group controlId="formBasicEmail">
          <div className="search-button">
          <Form.Control
            type="text"
            placeholder="Search Study Sessions"
            ref={search}
            className="searchTerm"
          />
          <Button onClick={fetchData} className="searchButton"><FaSearch /></Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export default SearchBar