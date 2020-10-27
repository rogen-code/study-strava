import React, { useEffect, useReducer, useState, useRef, useCallback } from 'react'
import ActivityCardCol from "./UserCard/ActivityCard"
import axios from 'axios'
import "../styles/streams.css"
import {Container, Row, Col} from 'react-bootstrap';
import useWindowSize from "../../helpers/screenSize"
import UserCard from "./UserCard/UserCard"
import ActivitiesChart from "./ActivitiesChart/ActivitiesChart"


function Stream({
  activeTab,
  studentID,
  studentName,
  activityCount,
  yourFollowers,
  youFollow,
  userActivities,
}) {
  let size = useWindowSize()
  let width = size.width

  const [activityData, setActivityData] = useState([])
  let bottomBoundaryRef = useRef(null)

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const [ pager, pagerDispatch ] = useReducer(pageReducer, { page: 0 })

  useEffect(() => {
    axios.get(`http://localhost:4000/getActivityData${studentID}/${pager.page * 5}`)
      .then((data) => {
        setActivityData(activityData.concat(data.data))
      })
      .catch((e) => {
        console.log(e)
      })
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
    <>
      <Container className="tweet" fluid>
        <Row noGutters={true}>
          {width > 768 && (
            <Col>
              <UserCard
                studentName={studentName}
                activityCount={activityCount}
                yourFollowers={yourFollowers}
                youFollow={youFollow}
                userActivities={userActivities}
              />
              <ActivitiesChart />

            </Col>
          )}
          <Col md={7} lg={6}>
            <ActivityCardCol otherActivities={activityData} />
          </Col>
          {width > 1200 && (
            <Col>
              <div className="vertical-placeholder"></div>
            </Col>
          )}
        </Row>
      </Container>
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </>
  )
}

export default Stream
