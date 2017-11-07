import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Item from '../Item'

class Calendar extends Component {
  render() {
    return (
      <div className="calenader">
        <Route path={`${this.props.match.url}/:day`} component={Item}/>
      </div>
    )
  }
}

export default Calendar
