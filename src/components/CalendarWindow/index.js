import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class CalendarWindow extends Component {
  render() {
    const day = this.props.index + 1;
    return (
      <Link to={`/calendar/${day}`} className={`item item-${day}`}>{day}</Link>
    )
  }
}

export default CalendarWindow
