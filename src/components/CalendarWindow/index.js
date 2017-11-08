import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class CalendarWindow extends Component {
  render() {
    const day = this.props.index;
    return (
      <Link to={`/calendar/${day}`} className={`item item-${day}`} style={{/*{ backgroundColor: `hsla(359, ${71 + (Math.random() * day)}%, ${39 + (Math.random() * day)}%, 1)`} */}}>{day}</Link>
    )
  }
}

export default CalendarWindow
