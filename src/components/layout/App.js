import React, { Component } from 'react'
import { letItSnow } from '../../services/letItSnow'
import "./style.css";

class App extends Component {
  componentDidMount(){
    letItSnow();
  }
  render(){
    return (
      <div className="app">
        <canvas id="canvas"></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default App
