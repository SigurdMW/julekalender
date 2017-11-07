import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/layout/App'
import Home from './components/Home'
import Calendar from './components/Calendar'


class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <App>
          {/* <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr/> */}

          <Route exact path="/" component={Home} />
          <Route path="/calendar" component={Calendar} />
          {/* <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/> */}
        </App>
      </Router>
    )
  }
}

export default AppRoutes
