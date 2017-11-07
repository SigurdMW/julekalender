import React, { Component } from 'react'
import { data } from '../../data/'
import CalendarWindow from '../CalendarWindow'
import './style.css'

class Home extends Component {
  render() {

    return (
      <div className="item-container">
        {
          data.map((item, key) => <CalendarWindow heading={item.heading} text={item.text} key={key}  index={key} />)
        }
      </div>
    )
  }
}

export default Home
