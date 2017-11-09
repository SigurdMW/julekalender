import React, { Component } from 'react'
import { makeNightSky } from '../../services/makeNightSky'
import "./style.css";

class App extends Component {
  componentDidMount(){
    makeNightSky();
  }
  render(){
    return (
      <div className="app">
        <h1>Julekalender</h1>
        <canvas id="sky"></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default App
