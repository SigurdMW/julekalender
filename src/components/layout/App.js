import React, { Component } from 'react'
import { makeNightSky } from '../../services/makeNightSky'
import "./style.css";
import { Link } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    makeNightSky();
  }
  render(){
    return (
      <div className="app">
        <h1>
          <Link to="/">Julekalender</Link>
        </h1>
        <canvas id="sky"></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default App
