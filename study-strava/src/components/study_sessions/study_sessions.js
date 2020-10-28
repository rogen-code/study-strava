import React, { useEffect, useReducer, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import {Container, Row, Col} from 'react-bootstrap';
import useWindowSize from "../../helpers/screenSize"

import UpcomingTestChart from "../shared/UpcomingTests/UpcomingTests"
import ActivitiesChart from "../shared/ActivitiesChart/ActivitiesChart"
import SearchBar from "./SearchBar"
import SessionCards from "./SessionCards"


function StudySession({ studentID, setActiveTab, futureTests, yourUpcomingStudySessions, update, setUpdate }) {
  let size = useWindowSize()
  let width = size.width

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 }
      case "RESET":
        return { ...state, page: 0 }
      default:
        return state
    }
  }

  const [activityData, setActivityData] = useState([])
  const bottomBoundaryRef = useRef(null)
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const searchRef = useRef()

  const refreshData = () => {
    axios
      .get(`http://localhost:4000/getNotEnrolled${studentID}&${pager.page}&${searchRef.current.value}`)
      .then((data) => {
        console.log('hello from refresh')
        setActivityData(activityData.concat(data.data))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getNewData = (event) => {
    if (event) event.preventDefault();
    axios
      .get(`http://localhost:4000/getNotEnrolled${studentID}&${0}&${searchRef.current.value}`)
      .then((data) => {
        if (data.data.length) setActivityData(data.data)
      })
      .then(() => {
        pagerDispatch({ type: "RESET" })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    refreshData()
  }, [ pagerDispatch, pager.page ])


  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  )

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current)
    }
  }, [scrollObserver, bottomBoundaryRef])

  return (
    <Container fluid>
      <Row noGutters={true}>
        {width >= 768 && (
          <Col className="cards">
            <UpcomingTestChart
              upcomingStudySession={futureTests}
              setActiveTab={setActiveTab}
              toPage="Calendar"
            />
            <ActivitiesChart
              upcomingStudySession={yourUpcomingStudySessions}
              setActiveTab={setActiveTab}
              toPage={"Register Classes"}
            />
          </Col>
        )}
        <Col md={7} xl={6}>
        <SearchBar
            search={searchRef}
            fetchData={getNewData}
            pagerDispatch={pagerDispatch}
          />
          <SessionCards
            activityData={activityData}
            studentID={studentID}
            update={update}
            setUpdate={setUpdate}
            getNewData={getNewData}
            searchRef={searchRef}
          />
        </Col>
        {width > 1200 && (
            <Col>
              <div className="vertical-placeholder"></div>
            </Col>
          )}
      </Row>
      <div
        id='page-bottom-boundary'
        style={{ border: '1px solid red' }}
        ref={bottomBoundaryRef}
      />
    </Container>
    )
}

export default StudySession